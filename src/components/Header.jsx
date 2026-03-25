import { Shield, Download, Upload, RotateCcw } from 'lucide-react';

export default function Header({ onExport, onImport, onReset, overallProgress }) {
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => onImport(ev.target.result);
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 leading-tight">PCI DSS v4.0.1</h1>
              <p className="text-xs text-gray-500">Self-Assessment Tool</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="text-right mr-4">
              <div className="text-sm font-medium text-gray-700">
                {overallProgress.pct}% Complete
              </div>
              <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-teal-500 rounded-full progress-fill"
                  style={{ width: `${overallProgress.pct}%` }}
                />
              </div>
            </div>

            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export assessment"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            <button
              onClick={handleImport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Import assessment"
            >
              <Upload className="w-4 h-4" /> Import
            </button>
            <button
              onClick={() => { if (window.confirm('Reset all assessment progress? This cannot be undone.')) onReset(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              title="Reset assessment"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
