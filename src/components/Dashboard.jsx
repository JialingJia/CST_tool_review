import React, { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { filteredData as allData } from '../data/data_filtered';

ModuleRegistry.registerModules([AllCommunityModule]);

// ── Color palettes per field ────────────────────────────────────────────────
const FIELD_COLORS = {
  tool_types: {
    'Type 1': { bg: '#ecfdf5', text: '#065f46', border: '#6ee7b7' },
    'Type 2': { bg: '#eff6ff', text: '#1e40af', border: '#93c5fd' },
    'Survey / Theory': { bg: '#faf5ff', text: '#6b21a8', border: '#d8b4fe' },
    'Empirical Study': { bg: '#fff7ed', text: '#9a3412', border: '#fdba74' },
    'Benchmark': { bg: '#fdf2f8', text: '#86198f', border: '#f0abfc' },
    _default: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
  },
  research_stages: {
    'Information Foraging': { bg: '#fefce8', text: '#713f12', border: '#fde047' },
    'Problem Framing': { bg: '#f0fdf4', text: '#14532d', border: '#86efac' },
    'Ideation': { bg: '#eff6ff', text: '#1e40af', border: '#93c5fd' },
    'Experiment Design': { bg: '#fff1f2', text: '#9f1239', border: '#fca5a5' },
    'Analysis & Sensemaking': { bg: '#f5f3ff', text: '#4c1d95', border: '#c4b5fd' },
    _default: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
  },
  creative_thinking_types: {
    'Divergent': { bg: '#fff7ed', text: '#9a3412', border: '#fdba74' },
    'Convergent': { bg: '#f0fdf4', text: '#14532d', border: '#86efac' },
    _default: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
  },
  wallas_stages: {
    'Preparation': { bg: '#fefce8', text: '#713f12', border: '#fde047' },
    'Incubation': { bg: '#f5f3ff', text: '#4c1d95', border: '#c4b5fd' },
    'Illumination': { bg: '#eff6ff', text: '#1e40af', border: '#93c5fd' },
    'Verification': { bg: '#f0fdf4', text: '#14532d', border: '#86efac' },
    _default: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
  },
  bodens_types: {
    'Combinational': { bg: '#fff1f2', text: '#9f1239', border: '#fca5a5' },
    'Exploratory': { bg: '#fff7ed', text: '#9a3412', border: '#fdba74' },
    'Transformational': { bg: '#faf5ff', text: '#6b21a8', border: '#d8b4fe' },
    _default: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
  },
};

function getTagStyle(field, tag) {
  const palette = FIELD_COLORS[field] || {};
  return palette[tag] || palette._default || { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
}

// ── Tag fields config ───────────────────────────────────────────────────────
const TAG_FIELDS = [
  { field: 'tool_types', label: 'Tool Types' },
  { field: 'research_stages', label: 'Research Stages' },
  { field: 'creative_thinking_types', label: "Guilford's Thinking Types" },
  { field: 'wallas_stages', label: "Wallas's Stages" },
  { field: 'bodens_types', label: "Boden's Types" },
];

// ── In-cell tag renderer ────────────────────────────────────────────────────
const TagCellRenderer = (props) => {
  if (!props.value) return null;
  const tags = typeof props.value === 'string'
    ? props.value.split(', ').filter(Boolean)
    : props.value;
  if (!tags || tags.length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', padding: '4px 0', alignItems: 'center', height: '100%' }}>
      {tags.map(tag => {
        const { bg, text, border } = getTagStyle(props.colDef.field, tag);
        return (
          <span
            key={tag}
            onClick={(e) => {
              e.stopPropagation();
              if (props.onTagClick) props.onTagClick(props.colDef.field, tag);
            }}
            style={{
              background: bg,
              color: text,
              padding: '1px 7px',
              borderRadius: '10px',
              fontSize: '0.68rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: `1px solid ${border}`,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.75'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};

// ── Main Dashboard ──────────────────────────────────────────────────────────
const Dashboard = ({ activeFilters, setActiveFilters }) => {

  const [filterOpen, setFilterOpen] = useState(true);

  // All unique tags per field, across the full dataset
  const availableTags = useMemo(() => {
    const result = {};
    TAG_FIELDS.forEach(({ field }) => {
      const all = allData.flatMap(item => item[field] || []);
      result[field] = [...new Set(all)].filter(Boolean).sort();
    });
    return result;
  }, []);

  const handleTagClick = useCallback((field, tag) => {
    setActiveFilters(prev => {
      const current = prev[field] || [];
      return current.includes(tag)
        ? { ...prev, [field]: current.filter(t => t !== tag) }
        : { ...prev, [field]: [...current, tag] };
    });
  }, []);

  const filteredRows = useMemo(() => {
    return allData.filter(item => {
      for (const { field } of TAG_FIELDS) {
        if (activeFilters[field] && activeFilters[field].length > 0) {
          const itemTags = item[field] || [];
          if (!activeFilters[field].some(tag => itemTags.includes(tag))) return false;
        }
      }
      return true;
    });
  }, [activeFilters]);

  // Count how many papers in the *currently filtered set* would still pass
  // if we toggled a particular tag ON (for display). We show counts from the
  // full dataset for unselected tags, and from filtered dataset for selected ones.
  const tagCounts = useMemo(() => {
    const result = {};
    TAG_FIELDS.forEach(({ field }) => {
      result[field] = {};
      availableTags[field].forEach(tag => {
        // Count: among filteredRows, how many have this tag?
        const count = filteredRows.filter(item =>
          (item[field] || []).includes(tag)
        ).length;
        result[field][tag] = count;
      });
    });
    return result;
  }, [filteredRows, availableTags]);

  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);
  const activeFilterCount = Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0);

  // ── Column Definitions ────────────────────────────────────────────────────
  const colDefs = useMemo(() => [
    {
      field: 'title',
      headerName: 'Title',
      flex: 2.5,
      minWidth: 150,
      filter: true,
      cellRenderer: params => (
        <span style={{ fontWeight: 500, color: '#0f172a', lineHeight: '1.4' }}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'authors',
      headerName: 'Authors',
      flex: 1,
      minWidth: 100,
      filter: true,
      valueGetter: params => params.data.authors.join(', '),
      cellRenderer: params => {
        const authors = params.data.authors || [];
        const fullText = authors.join(', ');
        const displayText = authors.length > 2 ? `${authors[0]}, ${authors[1]} et al.` : fullText;
        return (
          <span title={fullText} style={{ cursor: 'help', borderBottom: '1px dotted #94a3b8', color: '#475569', fontSize: '0.85rem' }}>
            {displayText}
          </span>
        );
      },
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 80,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'venue',
      headerName: 'Venue',
      flex: 1.5,
      minWidth: 140,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      cellRenderer: params => (
        <span title={params.value} style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.35' }}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'tool_types',
      headerName: 'Tool Type',
      flex: 1,
      minWidth: 110,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => (params.data.tool_types || []).join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick },
    },
    {
      field: 'core_contributions',
      headerName: 'Core Contributions',
      flex: 3,
      minWidth: 200,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      wrapText: true,
      autoHeight: true,
    },
    {
      field: 'research_stages',
      headerName: 'Research Stages',
      flex: 1,
      minWidth: 120,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => (params.data.research_stages || []).join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick },
    },
    {
      field: 'creative_thinking_types',
      headerName: 'Thinking Type',
      flex: 0.8,
      minWidth: 110,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => (params.data.creative_thinking_types || []).join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick },
    },
    {
      field: 'wallas_stages',
      headerName: 'Wallas Stages',
      flex: 1,
      minWidth: 110,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => (params.data.wallas_stages || []).join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick },
    },
    {
      field: 'bodens_types',
      headerName: "Boden's Types",
      flex: 0.8,
      minWidth: 100,
      filter: 'agTextColumnFilter',
      filterParams: { filterOptions: ['contains'], maxNumConditions: 1 },
      valueGetter: params => (params.data.bodens_types || []).join(', '),
      cellRenderer: TagCellRenderer,
      cellRendererParams: { onTagClick: handleTagClick },
    },
    {
      field: 'url',
      headerName: 'Link',
      width: 60,
      filter: false,
      cellRenderer: params => (
        <a
          href={params.value}
          onClick={e => e.stopPropagation()}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.8rem' }}
        >
          View
        </a>
      ),
    },
  ], [handleTagClick]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    floatingFilter: false,
    suppressHeaderMenuButton: true,
    filterParams: { maxNumConditions: 1 },
    wrapText: true,
    autoHeight: true,
    cellStyle: { lineHeight: '1.4', padding: '6px 10px' },
  }), []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 1.25rem' }}>

      {/* Header */}
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', margin: '0 0 0.4rem 0' }}>
          Research Ideation Tools/Systems Literature Review
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', margin: '0 0 1rem 0' }}>
          Interactive literature review for Research Ideation Tools/Systems.
        </p>
        <div style={{ background: '#f0fdf4', padding: '0.85rem 1.25rem', borderRadius: '8px', borderLeft: '4px solid #22c55e', color: '#166534', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <strong>Welcome to the Research Ideation Tools/Systems Literature Review.</strong> This interactive literature review provides a comprehensive
          overview of Research Ideation Tools/Systems, categorized by their core contributions, research stages, and
          underlying cognitive frameworks (<a target='_blank' href="https://en.wikipedia.org/wiki/JP_Guilford">Guilford's</a>, <a target='_blank' href="https://en.wikipedia.org/wiki/Graham_Wallas">Wallas's</a>, and <a target='_blank' href="https://en.wikipedia.org/wiki/Margaret_Boden">Boden's</a> theories of computational creativity). Use the filter tags
          below to explore the literature and discover connections across creative domains.
          <br />
          <br />
          <span style={{ fontWeight: 600, fontSize: '0.82rem', display: 'block', marginBottom: '0.4rem' }}>Tool Type Legend:</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            {[
              { label: 'Type 1', desc: 'Scaffolding Human Cognitive Processes', bg: '#ecfdf5', text: '#065f46', border: '#6ee7b7' },
              { label: 'Type 2', desc: 'Computational Creativity with Human as Evaluator', bg: '#eff6ff', text: '#1e40af', border: '#93c5fd' },
              { label: 'Survey / Theory', desc: 'Survey, taxonomy, or conceptual/theoretical paper (no tool artifact)', bg: '#faf5ff', text: '#6b21a8', border: '#d8b4fe' },
              { label: 'Empirical Study', desc: 'User study, experiment, or field study (no tool artifact)', bg: '#fff7ed', text: '#9a3412', border: '#fdba74' },
            ].map(({ label, desc, bg, text, border }) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem' }}>
                <span style={{ background: bg, color: text, border: `1px solid ${border}`, padding: '1px 8px', borderRadius: '10px', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
                <span style={{ color: '#4b7a5a' }}>{desc}</span>
              </span>
            ))}
          </span>
          <br />
          <span style={{ fontSize: '0.8rem', opacity: 0.75 }}>
            <em>Dashboard UI co-designed with <strong>Antigravity (Google DeepMind AI)</strong>. Categorization not yet fully verified.</em>
          </span>
        </div>
      </header>

      {/* Filter panel */}
      <div style={{ marginBottom: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>

        {/* Filter panel header — collapsible */}
        <div
          onClick={() => setFilterOpen(v => !v)}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.85rem 1.25rem', cursor: 'pointer',
            background: filterOpen ? '#f8fafc' : '#f1f5f9',
            borderBottom: filterOpen ? '1px solid #e2e8f0' : 'none',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#334155' }}>
              🔍 Filter by Tags
            </h3>
            {hasActiveFilters && (
              <span style={{
                background: '#2563eb', color: '#fff', borderRadius: '12px',
                padding: '1px 9px', fontSize: '0.72rem', fontWeight: 700,
              }}>
                {activeFilterCount} active
              </span>
            )}
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
              — showing <strong style={{ color: '#0f172a' }}>{filteredRows.length}</strong> of <strong style={{ color: '#0f172a' }}>{allData.length}</strong> papers
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {hasActiveFilters && (
              <button
                onClick={(e) => { e.stopPropagation(); setActiveFilters({ tool_types: [], research_stages: [], creative_thinking_types: [], wallas_stages: [], bodens_types: [] }); }}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              >
                ✕ Clear All
              </button>
            )}
            <span style={{ color: '#94a3b8', fontSize: '1.1rem', transform: filterOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
          </div>
        </div>

        {/* Filter tags grid */}
        {filterOpen && (
          <div style={{ padding: '1.1rem 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            {TAG_FIELDS.map(({ field, label }) => (
              <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {label}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {availableTags[field].map(tag => {
                    const isActive = activeFilters[field].includes(tag);
                    const count = tagCounts[field][tag];
                    const { bg, text, border } = getTagStyle(field, tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(field, tag)}
                        style={{
                          background: isActive ? text : bg,
                          color: isActive ? '#fff' : text,
                          border: `1px solid ${isActive ? text : border}`,
                          padding: '3px 9px',
                          borderRadius: '14px',
                          fontSize: '0.73rem',
                          fontWeight: 600,
                          cursor: count === 0 && !isActive ? 'default' : 'pointer',
                          transition: 'all 0.15s',
                          whiteSpace: 'nowrap',
                          opacity: count === 0 && !isActive ? 0.4 : 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        onMouseEnter={(e) => { if (!isActive && count > 0) e.currentTarget.style.opacity = '0.7'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = count === 0 && !isActive ? '0.4' : '1'; }}
                      >
                        {tag}
                        <span style={{
                          background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.1)',
                          borderRadius: '8px',
                          padding: '0 5px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          minWidth: '16px',
                          textAlign: 'center',
                        }}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AG Grid */}
      <div
        className="ag-theme-quartz"
        style={{ height: '1100px', width: '100%', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08)', borderRadius: '8px', overflow: 'hidden' }}
      >
        <AgGridReact
          rowData={filteredRows}
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
