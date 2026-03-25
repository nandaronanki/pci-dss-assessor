import { useState, useCallback, useEffect, useMemo } from 'react';
import { requirements, REQUIREMENT_SECTIONS, STATUS } from '../data/requirements';

const STORAGE_KEY = 'pci-dss-v2-roc-assessment';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return null;
}

function buildInitialState() {
  const state = {};
  requirements.filter(r => !r.isParent).forEach(req => {
    state[req.id] = { status: STATUS.NOT_ASSESSED, notes: '', evidence: '' };
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

  // Get items for a given subsection (e.g., '1.1', '1.2', '1.3', '1.4')
  const getSubsectionItems = useCallback((subsectionNumber) => {
    return requirements.filter(r => !r.isParent && r.parentSection === subsectionNumber);
  }, []);

  // Get progress for a subsection
  const getSubsectionProgress = useCallback((subsectionNumber) => {
    const items = requirements.filter(r => !r.isParent && r.parentSection === subsectionNumber);
    const total = items.length;
    const assessed = items.filter(i => assessments[i.id]?.status !== STATUS.NOT_ASSESSED).length;
    const inPlace = items.filter(i =>
      [STATUS.IN_PLACE, STATUS.NOT_APPLICABLE].includes(assessments[i.id]?.status)
    ).length;
    const notInPlace = items.filter(i => assessments[i.id]?.status === STATUS.NOT_IN_PLACE).length;
    return { total, assessed, inPlace, notInPlace, pct: total ? Math.round((assessed / total) * 100) : 0 };
  }, [assessments]);

  const getOverallProgress = useCallback(() => {
    const items = requirements.filter(r => !r.isParent);
    const total = items.length;
    const assessed = items.filter(i => assessments[i.id]?.status !== STATUS.NOT_ASSESSED).length;
    const inPlace = items.filter(i =>
      [STATUS.IN_PLACE, STATUS.NOT_APPLICABLE].includes(assessments[i.id]?.status)
    ).length;
    const notInPlace = items.filter(i => assessments[i.id]?.status === STATUS.NOT_IN_PLACE).length;
    return { total, assessed, inPlace, notInPlace, pct: total ? Math.round((assessed / total) * 100) : 0 };
  }, [assessments]);

  const resetAssessment = useCallback(() => {
    if (window.confirm('Reset all assessment progress? This cannot be undone.')) {
      setAssessments(buildInitialState());
      setEntityName('');
      setAssessorName('');
    }
  }, []);

  const exportAssessment = useCallback(() => {
    const data = {
      version: 'pci-dss-v2.0-roc',
      entityName,
      assessorName,
      exportDate: new Date().toISOString(),
      assessments,
      summary: {
        overall: getOverallProgress(),
        bySubsection: REQUIREMENT_SECTIONS[0].subsections.map(s => ({
          id: s.id,
          number: s.number,
          title: s.title,
          ...getSubsectionProgress(s.number),
        })),
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pci-dss-v2-roc-assessment-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [assessments, entityName, assessorName, getOverallProgress, getSubsectionProgress]);

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

  // Search function
  const searchRequirements = useCallback((query) => {
    if (!query || query.trim().length < 2) return [];
    const terms = query.toLowerCase().trim().split(/\\s+/);
    return requirements.filter(r => !r.isParent).filter(req => {
      const searchableText = [
        req.section,
        req.requirement,
        req.testingProcedure,
        ...(req.rocDetails || []),
        ...(req.tags || [])
      ].join(' ').toLowerCase();
      return terms.every(term => searchableText.includes(term));
    });
  }, []);

  return {
    assessments,
    entityName, setEntityName,
    assessorName, setAssessorName,
    setItemStatus, setItemNotes, setItemEvidence,
    getSubsectionItems, getSubsectionProgress, getOverallProgress,
    resetAssessment, exportAssessment, importAssessment,
    searchRequirements,
  };
}
