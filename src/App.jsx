import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AssessmentWizard from './components/AssessmentWizard';
import { useAssessment } from './hooks/useAssessment';

export default function App() {
  const {
    assessments,
    entityName, setEntityName,
    assessorName, setAssessorName,
    setItemStatus, setItemNotes, setItemEvidence,
    getRequirementProgress, getOverallProgress,
    resetAssessment, exportAssessment, importAssessment,
  } = useAssessment();

  const [selectedReq, setSelectedReq] = useState(null);
  const overallProgress = getOverallProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onExport={exportAssessment}
        onImport={importAssessment}
        onReset={resetAssessment}
        overallProgress={overallProgress}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {selectedReq === null ? (
          <Dashboard
            getRequirementProgress={getRequirementProgress}
            getOverallProgress={getOverallProgress}
            onSelectRequirement={setSelectedReq}
          />
        ) : (
          <AssessmentWizard
            reqId={selectedReq}
            assessments={assessments}
            setItemStatus={setItemStatus}
            setItemNotes={setItemNotes}
            setItemEvidence={setItemEvidence}
            getRequirementProgress={getRequirementProgress}
            onBack={() => setSelectedReq(null)}
          />
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-100 mt-8">
        PCI DSS v4.0.1 Self-Assessment Tool &middot; Based on PCI SSC published standards &middot; Not an official PCI SSC product
      </footer>
    </div>
  );
}
