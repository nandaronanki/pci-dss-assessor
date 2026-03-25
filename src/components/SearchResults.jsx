import { Search, X, ArrowLeft } from 'lucide-react';
import { STATUS, STATUS_LABELS, STATUS_COLORS } from '../data/requirements';
import AssessmentItem from './AssessmentItem';

export default function SearchResults({ query, results, assessments, setItemStatus, setItemNotes, setItemEvidence, onClearSearch }) {
  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onClearSearch}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {results.length} result{results.length !== 1 ? 's' : ''} for "<span className="font-medium text-gray-900">{query}</span>"
            </span>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Try searching for keywords like "firewall", "DMZ", "wireless", "router", "traffic", or section numbers like "1.1.1" or "1.3.5".
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map(item => {
            const a = assessments[item.id] || { status: STATUS.NOT_ASSESSED, notes: '', evidence: '' };
            return (
              <div key={item.id} className="relative">
                <div className="absolute -left-2 top-4 w-1 h-8 bg-teal-400 rounded-full" />
                <AssessmentItem
                  item={item}
                  assessment={a}
                  onStatusChange={(status) => setItemStatus(item.id, status)}
                  onNotesChange={(notes) => setItemNotes(item.id, notes)}
                  onEvidenceChange={(evidence) => setItemEvidence(item.id, evidence)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
