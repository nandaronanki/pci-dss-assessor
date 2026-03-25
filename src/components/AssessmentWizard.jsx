import { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, Link2, AlertTriangle, FileCheck, X } from 'lucide-react';
import { requirements, STATUS, STATUS_LABELS, STATUS_COLORS } from '../data/requirements';
import AssessmentItem from './AssessmentItem';

export default function AssessmentWizard({
  reqId,
  assessments,
  setItemStatus,
  setItemNotes,
  setItemEvidence,
  getRequirementProgress,
  onBack,
}) {
  const req = requirements.find(r => r.id === reqId);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showOverview, setShowOverview] = useState(true);

  if (!req) return null;
  const items = req.items;
  const prog = getRequirementProgress(reqId);
  const currentItem = items[currentIdx];

  if (showOverview) {
    return (
      <div className="fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                Requirement {reqId}
              </span>
              <h2 className="text-xl font-semibold text-gray-900 mt-2">{req.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{req.description}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{prog.assessed} of {prog.total} assessed</span>
                <span className="font-medium">{prog.pct}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full progress-fill"
                  style={{ width: `${prog.pct}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setShowOverview(false)}
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {prog.assessed === 0 ? 'Start Assessment' : 'Continue Assessment'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Items list */}
        <div className="space-y-2">
          {items.map((item, idx) => {
            const a = assessments[item.id] || { status: STATUS.NOT_STARTED };
            const sc = STATUS_COLORS[a.status];
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentIdx(idx); setShowOverview(false); }}
                className={`w-full bg-white border rounded-lg p-3 text-left hover:border-teal-300 transition-all flex items-center gap-3 ${sc.border}`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${sc.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-gray-500">{item.id}</span>
                    {item.newlyMandatory && (
                      <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 mt-0.5 truncate">{item.title}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                  {STATUS_LABELS[a.status]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Wizard mode
  return (
    <div className="fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowOverview(true)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Req {reqId} Overview
        </button>
        <span className="text-sm text-gray-500">
          {currentIdx + 1} of {items.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-6">
        {items.map((item, idx) => {
          const a = assessments[item.id] || { status: STATUS.NOT_STARTED };
          const sc = STATUS_COLORS[a.status];
          return (
            <button
              key={item.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIdx ? 'flex-[3]' : 'flex-1'
              } ${idx === currentIdx ? 'bg-teal-500' : sc.dot === 'bg-gray-400' ? 'bg-gray-200' : sc.dot}`}
              title={`${item.id}: ${STATUS_LABELS[a.status]}`}
            />
          );
        })}
      </div>

      {/* Current item */}
      <AssessmentItem
        key={currentItem.id}
        item={currentItem}
        assessment={assessments[currentItem.id] || { status: STATUS.NOT_STARTED, notes: '', evidence: '' }}
        onStatusChange={(status) => setItemStatus(currentItem.id, status)}
        onNotesChange={(notes) => setItemNotes(currentItem.id, notes)}
        onEvidenceChange={(evidence) => setItemEvidence(currentItem.id, evidence)}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
          disabled={currentIdx === 0}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <span className="text-xs text-gray-400">
          {currentItem.id}
        </span>

        <button
          onClick={() => {
            if (currentIdx < items.length - 1) {
              setCurrentIdx(currentIdx + 1);
            } else {
              setShowOverview(true);
            }
          }}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
        >
          {currentIdx < items.length - 1 ? (
            <>Next <ChevronRight className="w-4 h-4" /></>
          ) : (
            <>Finish <FileCheck className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
