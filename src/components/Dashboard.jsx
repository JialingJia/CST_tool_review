import React, { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { mockData } from '../data/data';

ModuleRegistry.registerModules([AllCommunityModule]);

const TAG_FIELDS = [
  { field: 'tool_types', label: 'Tool Types' },
  { field: 'research_stages', label: 'Research Stages' },
  { field: 'creative_thinking_types', label: 'Guilford’s Thinking Types' },
  { field: 'wallas_stages', label: 'Wallas’s Stages' },
  { field: 'bodens_types', label: "Boden's Types" }
];

const TagCellRenderer = (props) => {
  if (!props.value) return null;
  const tags = typeof props.value === 'string' ? props.value.split(', ').filter(Boolean) : props.value;
  if (!tags || tags.length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', padding: '4px 0', alignItems: 'center', height: '100%' }}>
      {tags.map(tag => (
        <span
          key={tag}
          onClick={(e) => {
            e.stopPropagation();
            if (props.onTagClick) props.onTagClick(props.colDef.field, tag);
          }}
          style={{
            background: '#eff6ff',
            color: '#2563eb',
            padding: '1px 6px',
            borderRadius: '10px',
            fontSize: '0.7rem',
            fontWeight: 500,
            cursor: 'pointer',
            border: '1px solid #bfdbfe',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.target.style.background = '#dbeafe'; e.target.style.borderColor = '#93c5fd'; }}
          onMouseLeave={(e) => { e.target.style.background = '#eff6ff'; e.target.style.borderColor = '#bfdbfe'; }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [activeFilters, setActiveFilters] = useState({
    tool_types: [],
    research_stages: [],
    creative_thinking_types: [],
    wallas_stages: [],
    bodens_types: []
  });

  const availableTags = useMemo(() => {
    const result = {};
    TAG_FIELDS.forEach(({ field }) => {
      const all = mockData.flatMap(item => item[field] || []);
      result[field] = [...new Set(all)].filter(Boolean).sort();
    });
    return result;
  }, []);

  const handleTagClick = useCallback((field, tag) => {
    setActiveFilters(prev => {
      const currentTags = prev[field] || [];
      if (currentTags.includes(tag)) {
        return { ...prev, [field]: currentTags.filter(t => t !== tag) };
      } else {
        return { ...prev, [field]: [...currentTags, tag] };
      }
    });
  }, []);

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      for (const { field } of TAG_FIELDS) {
        if (activeFilters[field] && activeFilters[field].length > 0) {
          const itemTags = item[field] || [];
          const match = activeFilters[field].some(tag => itemTags.includes(tag));
          if (!match) return false;
        }
      }
      return true;
    });
  }, [activeFilters]);

  // Column Definitions
  const colDefs = useMemo(() => [
    { field: 'title', headerName: 'Title', flex: 2, filter: true },
    {
      field: 'authors',
      headerName: 'Authors',
      flex: 1,
      filter: true,
      valueGetter: params => params.data.authors.join(', '),
      cellRenderer: params => {
        const authors = params.data.authors || [];
        const fullText = authors.join(', ');
        let displayText = fullText;
        if (authors.length > 2) {
          displayText = `${authors[0]}, ${authors[1]} et al.`;
        }
        return (
          <span title={fullText} style={{ cursor: 'help', borderBottom: '1px dotted #94a3b8' }}>
            {displayText}
          </span>
        );
      }
    },
    { field: 'year', headerName: 'Year', width: 100, filter: 'agNumberColumnFilter' },
    {
      field: 'tool_types',
      headerName: 'Tool Type',
      flex: 1,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => params.data.tool_types.join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick }
    },
    {
      field: 'core_contributions',
      headerName: 'Core Contributions',
      flex: 3,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      wrapText: true,
      autoHeight: true
    },
    {
      field: 'research_stages',
      headerName: 'Research Stages',
      flex: 1,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => params.data.research_stages.join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick }
    },
    {
      field: 'creative_thinking_types',
      headerName: 'Thinking Type',
      flex: 1,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => params.data.creative_thinking_types.join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick }
    },
    {
      field: 'wallas_stages',
      headerName: 'Wallas Stages',
      flex: 1,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => params.data.wallas_stages.join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick }
    },
    {
      field: 'bodens_types',
      headerName: "Boden's Types",
      flex: 1,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => params.data.bodens_types.join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick }
    },
    {
      field: 'url',
      headerName: 'Link',
      width: 60,
      filter: false,
      cellRenderer: params => {
        return <a href={params.value} onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 500 }}>View</a>;
      }
    }
  ], [handleTagClick]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      floatingFilter: false, // Remove inline floating filters
      suppressHeaderMenuButton: true, // Hide complex header menu
      filterParams: {
        maxNumConditions: 1, // Simplify: no 'AND/OR' complex logic
      },
      wrapText: true,
      autoHeight: true,
      cellStyle: { lineHeight: '1.4', padding: '6px 10px' }
    };
  }, []);



  return (
    <div className="dashboard" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', margin: '0 0 0.5rem 0' }}>
          CST Research Library
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.125rem', fontWeight: 400, margin: '0 0 1.25rem 0' }}>
          Interactive tool review for Creativity Support Tools.
        </p>
        <div style={{ background: '#f0fdf4', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #22c55e', color: '#166534', fontSize: '0.95rem', lineHeight: '1.6' }}>
          <strong>Welcome to the CST Research Library.</strong> This interactive dashboard provides a comprehensive overview of various Creativity Support Tools, categorized by their core contributions, research stages, and underlying cognitive frameworks (including Guilford's, Wallas's, and Boden's theories of creativity). Use the interactive filter tags below to seamlessly explore the literature and discover connections across different creative domains.<br /><br />
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            <em>Dashboard UI and interactive filtering experience co-designed and developed by <strong>Antigravity (Google DeepMind AI)</strong>.</em>
            <br />
            <em>Note that the categorization of tools and certain author information have not yet been verified; this will be addressed later.</em>
          </span>
        </div>
      </header>

      {/* Global Tags Filter UI */}
      <div style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#334155' }}>Filter by Tags</h3>
          <button
            onClick={() => setActiveFilters({ tool_types: [], research_stages: [], creative_thinking_types: [], wallas_stages: [], bodens_types: [] })}
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.875rem' }}
          >
            Clear All Filters
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto', gap: '2rem', justifyContent: 'space-between' }}>
          {TAG_FIELDS.map(({ field, label }) => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {availableTags[field].map(tag => {
                  const isActive = activeFilters[field].includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(field, tag)}
                      style={{
                        background: isActive ? '#2563eb' : '#ffffff',
                        color: isActive ? '#ffffff' : '#334155',
                        border: isActive ? '1px solid #1d4ed8' : '1px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.target.style.background = '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.target.style.background = '#ffffff';
                      }}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ag-theme-quartz" style={{ height: '1200px', width: '100%', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <AgGridReact
          rowData={filteredData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={{ type: 'fitGridWidth' }}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>
  );
};

export default Dashboard;
