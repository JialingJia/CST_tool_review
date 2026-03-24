import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LiteratureReview from './components/LiteratureReview';

const EMPTY_FILTERS = {
  tool_types: [],
  research_stages: [],
  creative_thinking_types: [],
  wallas_stages: [],
  bodens_types: [],
};

const TABS = [
  { id: 'grid',   label: '📊 Paper Grid' },
  { id: 'review', label: '📖 Literature Review' },
];

function App() {
  const [activeTab, setActiveTab] = useState('grid');
  const [activeFilters, setActiveFilters] = useState(EMPTY_FILTERS);

  // Called from LiteratureReview "View in Grid →" buttons
  function filterAndSwitch(preset) {
    setActiveFilters({ ...EMPTY_FILTERS, ...preset });
    setActiveTab('grid');
  }

  return (
    <div className="app-container">
      {/* Tab bar */}
      <nav style={{
        display: 'flex', gap: '4px', marginBottom: '1.75rem',
        borderBottom: '2px solid #e2e8f0', paddingBottom: '0',
      }}>
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none', border: 'none',
                padding: '0.55rem 1.2rem',
                fontSize: '0.92rem',
                fontWeight: active ? 700 : 500,
                color: active ? '#0f172a' : '#64748b',
                cursor: 'pointer',
                borderBottom: `2px solid ${active ? '#2563eb' : 'transparent'}`,
                marginBottom: '-2px',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {activeTab === 'grid' ? (
        <Dashboard
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      ) : (
        <LiteratureReview onFilterAndSwitch={filterAndSwitch} />
      )}
    </div>
  );
}

export default App;
