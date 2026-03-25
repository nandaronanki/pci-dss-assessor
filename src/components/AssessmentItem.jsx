import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Eye, FileText, Users, Activity, Target } from 'lucide-react';
import { STATUS, STATUS_LABELS, STATUS_COLORS, METHODOLOGY } from '../data/requirements';

const statusOptions = [
  STATUS.NOT_ASSESSED,
  STATUS.IN_PLACE,
  STATUS.IN_PROGRESS,
  STATUS.NOT_APPLICABLE,
  STATUS.NOT_IN_PLACE,
];

const METHODOLOGY_ICONS = {
  OBSERVE: Eye,
  DOCUMENT: FileText,
  INTERVIEW: Users,
  PROCESS: Activity,
  SAMPLE: Target,
};

const METHODOLOGY_LABELS = {
  OBSERVE: 'Observe',
  DOCUMENT: 'Document Review',
  INTERVIEW: 'Interview',
  PROCESS: 'Observe Process',
  SAMPLE: 'Identify Sample',
};

export default function AssessmentItem({ item, assessment, onStatusChange, onNotesChange, onEvidenceChange }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showRocDetails, setShowRocDetails] = useState(false);

  return (
    <div className="slide-in bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                {item.section}
              </span>
              {/* Methodology tags */}
              <div className="flex gap-1">
                {item.methodology.map(m => {
                  const Icon = METHODOLOGY_ICONS[m] || Eye;
                  return (
                    <span key={m} className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded" title={METHODOLOGY[m]}>
                      <Icon className="w-2.5 h-2.5" />
                      {METHODOLOGY_LABELS[m]}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* PCI DSS Requirement */}
            <h3 className="text-base font-medium text-gray-900 mt-2 leading-snug">
              {item.requirement}
            </h3>
          </div>
        </div>

        {/* Testing Procedure */}
        <div className="mt-4 bg-teal-50/50 border border-teal-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Testing Procedure</span>
              <p className="text-sm text-teal-800 leading-relaxed mt-1">{item.testingProcedure}</p>
            </div>
          </div>
        </div>

        {/* ROC Reporting Details (expandable) */}
        {item.rocDetails && item.rocDetails.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowRocDetails(!showRocDetails)}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {showRocDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              ROC Reporting Details ({item.rocDetails.length} items)
            </button>
            {showRocDetails && (
              <div className="mt-2 bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 space-y-2 fade-in">
                {item.rocDetails.map((detail, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-xs font-mono text-indigo-400 flex-shrink-0 mt-0.5">{idx + 1}.</span>
                    <p className="text-xs text-indigo-800 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            {item.tags.map(tag => (
              <span key={tag} className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">
                {tag}
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
                    ? `${colors} ring-2 ring-offset-1 ring-current`
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {STATUS_LABELS[status]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable notes */}
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
