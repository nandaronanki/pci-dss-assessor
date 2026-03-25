import { useState, useCallback, useEffect } from 'react';
import { requirements, STATUS } from '../data/requirements';

const STORAGE_KEY = 'pci-dss-assessment';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return null;
}

function buildInitialState() {
  const state = {};
  requirements.forEach(req => {
    req.items.forEach(item => {
      state[item.id] = { status: STATUS.NOT_STARTED, notes: '', evidence: '' };
    });
  });
  return state;
}

export function useAssessment() {
  const [assessments, setAssessments] = useState(() => {
    return loadState() || buildInitialState();
  });

  const [entityName, setEntityName] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY + '-entity') || ''; } catch { return ''; }
  });

  const [assessorName, setAssessorName] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY + '-assessor') || ''; } catch { return ''; }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
    } catch { /* ignore */ }
  }, [assessments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '-entity', entityName);
      localStorage.setItem(STORAGE_KEY + '-assessor', assessorName);
    } catch { /* ignore */ }
  }, [entityName, assessorName]);

  const setItemStatus = useCallback((itemId, status) => {
    setAssessments(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], status }
    }));
  }, []);

  const setItemNotes = useCallback((itemId, notes) => {
    setAssessments(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], notes }
    }));
  }, []);

  const setItemEvidence = useCallback((itemId, evidence) => {
    setAssessments(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], evidence }
    }));
  }, []);

  const getRequirementProgress = useCallback((reqId) => {
    const req = requirements.find(r => r.id === reqId);
    if (!req) return { total: 0, assessed: 0, inPlace: 0, notInPlace: 0, pct: 0 };
    const total = req.items.length;
    const assessed = req.items.filter(i => assessments[i.id]?.status !== STATUS.NOT_STARTED).length;
    const inPlace = req.items.filter(i =>
      [STATUS.IN_PLACE, STATUS.IN_PLACE_WITH_CCW, STATUS.NOT_APPLICABLE].includes(assessments[i.id]?.status)
    ).length;
    const notInPlace = req.items.filter(i => assessments[i.id]?.status === STATUS.NOT_IN_PLACE).length;
    return { total, assessed, inPlace, notInPlace, pct: total ? Math.round((assessed / total) * 100) : 0 };
  }, [assessments]);

  const getOverallProgress = useCallback(() => {
    let total = 0, assessed = 0, inPlace = 0, notInPlace = 0;
    requirements.forEach(req => {
      const p = getRequirementProgress(req.id);
      total += p.total;
      assessed += p.assessed;
      inPlace += p.inPlace;
      notInPlace += p.notInPlace;
    });
    return { total, assessed, inPlace, notInPlace, pct: total ? Math.round((assessed / total) * 100) : 0 };
  }, [getRequirementProgress]);

  const resetAssessment = useCallback(() => {
    setAssessments(buildInitialState());
    setEntityName('');
    setAssessorName('');
  }, []);

  const exportAssessment = useCallback(() => {
    const data = {
      entityName,
      assessorName,
      exportDate: new Date().toISOString(),
      assessments,
      summary: {
        overall: getOverallProgress(),
        byRequirement: requirements.map(r => ({
          id: r.id,
          title: r.title,
          ...getRequirementProgress(r.id),
        })),
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pci-dss-assessment-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [assessments, entityName, assessorName, getOverallProgress, getRequirementProgress]);

  const importAssessment = useCallback((jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (data.assessments) setAssessments(data.assessments);
      if (data.entityName) setEntityName(data.entityName);
      if (data.assessorName) setAssessorName(data.assessorName);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    assessments,
    entityName, setEntityName,
    assessorName, setAssessorName,
    setItemStatus, setItemNotes, setItemEvidence,
    getRequirementProgress, getOverallProgress,
    resetAssessment, exportAssessment, importAssessment,
  };
}
