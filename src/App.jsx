import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SubsectionView from './components/SubsectionView';
import SearchResults from './components/SearchResults';
import { useAssessment } from './hooks/useAssessment';

export default function App() {
  const assessment = useAssessment();
  const {
    assessments,
    setItemStatus, setItemNotes, setItemEvidence,
    getSubsectionProgress, getOverallProgress,
    searchRequirements,
    exportAssessment, importAssessment, resetAssessment,
  } = assessment;

  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const overallProgress = getOverallProgress();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      const results = searchRequirements(query);
      setSearchResults(results);
      setSelectedSubsection(null);
    } else {
      setSearchResults(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onExport={exportAssessment}
        onImport={importAssessment}
        onReset={resetAssessment}
        overallProgress={overallProgress}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onClearSearch={clearSearch}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {searchResults !== null ? (
          <SearchResults
            query={searchQuery}
            results={searchResults}
            assessments={assessments}
            setItemStatus={setItemStatus}
            setItemNotes={setItemNotes}
            setItemEvidence={setItemEvidence}
            onClearSearch={clearSearch}
          />
        ) : selectedSubsection === null ? (
          <Dashboard
            getSubsectionProgress={getSubsectionProgress}
            getOverallProgress={getOverallProgress}
            onSelectSubsection={setSelectedSubsection}
          />
        ) : (
          <SubsectionView
            subsectionNumber={selectedSubsection}
            assessments={assessments}
            setItemStatus={setItemStatus}
            setItemNotes={setItemNotes}
            setItemEvidence={setItemEvidence}
            getSubsectionProgress={getSubsectionProgress}
            onBack={() => setSelectedSubsection(null)}
          />
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-100 mt-8">
        PCI DSS v2.0 ROC Reporting Tool &middot; Based on PCI SSC ROC Reporting Instructions &middot; Not an official PCI SSC product
      </footer>
    </div>
  );
}
