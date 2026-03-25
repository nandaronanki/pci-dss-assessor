import { useState } from 'react';
import { Lightbulb, Link2, AlertTriangle, ChevronDown, ChevronUp, FileText, MessageSquare } from 'lucide-react';
import { STATUS, STATUS_LABELS, STATUS_COLORS } from '../data/requirements';

const statusOptions = [
  STATUS.NOT_STARTED,
  STATUS.IN_PLACE,
  STATUS.IN_PLACE_WITH_CCW,
  STATUS.NOT_APPLICABLE,
  STATUS.NOT_IN_PLACE,
];

export default function AssessmentItem({ item, assessment, onStatusChange, onNotesChange, onEvidenceChange }) {
  const [showDetails, setShowDetails] = useState(false);
  const sc = STATUS_COLORS[assessment.status];

  return (
    <div className="slide-in bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                {item.id}
              </span>
              {item.newlyMandatory && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  <AlertTriangle className="w-3 h-3" /> NOW MANDATORY
                </span>
              )}
              <div className="flex gap-1">
                {item.testingMethods.map(m => (
                  <span key={m} className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-base font-medium text-gray-900 mt-2 leading-snug">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Hint */}
        <div className="mt-4 bg-teal-50/50 border border-teal-100 rounded-lg p-3 flex gap-2">
          <Lightbulb className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-teal-800 leading-relaxed">{item.hint}</p>
        </div>

        {/* Dependencies */}
        {item.dependencies.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <Link2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">Dependencies:</span>
            {item.dependencies.map(dep => (
              <span key={dep} className="text-xs font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                {dep}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Status Selection */}
      <div className="px-5 pb-4">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
          Compliance Status
        </label>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(status => {
            const colors = STATUS_COLORS[status];
            const isActive = assessment.status === status;
            return (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  isActive
                    ? `${colors.bg} ${colors.text} ${colors.border} ring-2 ring-offset-1 ring-current`
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? colors.dot : 'bg-gray-300'}`} />
                {STATUS_LABELS[status]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full px-5 py-2.5 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          Notes & Evidence
          {(assessment.notes || assessment.evidence) && (
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          )}
        </span>
        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showDetails && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3 fade-in">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Assessor Notes</label>
            <textarea
              value={assessment.notes || ''}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Document your findings, observations, and interview results..."
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none resize-none transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Evidence Reference</label>
            <textarea
              value={assessment.evidence || ''}
              onChange={(e) => onEvidenceChange(e.target.value)}
              placeholder="Reference screenshots, document names, ticket IDs..."
              rows={2}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none resize-none transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}
