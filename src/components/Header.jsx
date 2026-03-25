import { Shield, Download, Upload, RotateCcw, Search, X } from 'lucide-react';

export default function Header({ onExport, onImport, onReset, overallProgress, searchQuery, onSearch, onClearSearch }) {
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
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-teal-600 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 leading-tight">PCI DSS v2.0</h1>
              <p className="text-xs text-gray-500">ROC Reporting Tool</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search requirements, procedures, ROC details..."
                className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none transition-all bg-gray-50 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
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
              onClick={onReset}
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
