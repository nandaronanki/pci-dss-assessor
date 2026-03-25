import { Shield, Lock, Bug, Key, Eye, FileText, ChevronRight, AlertTriangle, CheckCircle2, Circle } from 'lucide-react';
import { requirements, GOAL_AREAS } from '../data/requirements';

const ICONS = { Shield, Lock, Bug, Key, Eye, FileText };

export default function Dashboard({ getRequirementProgress, getOverallProgress, onSelectRequirement }) {
  const overall = getOverallProgress();

  return (
    <div className="fade-in">
      {/* Overall Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Assessment Overview</h2>
            <p className="text-sm text-gray-500 mt-1">
              {overall.assessed} of {overall.total} controls assessed
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Stat
              label="In Place"
              value={overall.inPlace}
              color="text-emerald-600"
              icon={<CheckCircle2 className="w-4 h-4" />}
            />
            <Stat
              label="Not In Place"
              value={overall.notInPlace}
              color="text-red-500"
              icon={<AlertTriangle className="w-4 h-4" />}
            />
            <Stat
              label="Remaining"
              value={overall.total - overall.assessed}
              color="text-gray-400"
              icon={<Circle className="w-4 h-4" />}
            />
          </div>
        </div>
        <div className="mt-4 w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
          {overall.inPlace > 0 && (
            <div
              className="h-full bg-emerald-400 progress-fill"
              style={{ width: `${(overall.inPlace / overall.total) * 100}%` }}
            />
          )}
          {overall.notInPlace > 0 && (
            <div
              className="h-full bg-red-400 progress-fill"
              style={{ width: `${(overall.notInPlace / overall.total) * 100}%` }}
            />
          )}
          {(overall.assessed - overall.inPlace - overall.notInPlace) > 0 && (
            <div
              className="h-full bg-blue-300 progress-fill"
              style={{ width: `${((overall.assessed - overall.inPlace - overall.notInPlace) / overall.total) * 100}%` }}
            />
          )}
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> In Place / N/A</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Not In Place</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-300 inline-block" /> In Place (CCW)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-200 inline-block" /> Not Assessed</span>
        </div>
      </div>

      {/* Goal Areas with Requirement Cards */}
      <div className="space-y-6">
        {GOAL_AREAS.map(goal => {
          const Icon = ICONS[goal.icon] || Shield;
          return (
            <div key={goal.id}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{goal.name}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {goal.reqs.map(reqId => {
                  const req = requirements.find(r => r.id === reqId);
                  const prog = getRequirementProgress(reqId);
                  const newlyMandatory = req.items.filter(i => i.newlyMandatory).length;
                  return (
                    <button
                      key={reqId}
                      onClick={() => onSelectRequirement(reqId)}
                      className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-teal-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                              Req {reqId}
                            </span>
                            {newlyMandatory > 0 && (
                              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                {newlyMandatory} new
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-medium text-gray-900 mt-2 leading-snug">
                            {req.shortTitle}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{req.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 mt-1 flex-shrink-0 transition-colors" />
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{prog.assessed}/{prog.total} assessed</span>
                          <span>{prog.pct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full progress-fill"
                            style={{
                              width: `${prog.pct}%`,
                              backgroundColor: prog.notInPlace > 0 ? '#f87171' : prog.pct === 100 ? '#34d399' : '#14b8a6'
                            }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, color, icon }) {
  return (
    <div className="flex items-center gap-2">
      <span className={color}>{icon}</span>
      <div>
        <div className={`font-semibold ${color}`}>{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}
