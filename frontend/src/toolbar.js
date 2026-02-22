import { useState } from 'react';

const NODE_TYPES = [
  { type: 'inputNode',  label: 'Input',       icon: '⬇', color: '#22d3ee' },
  { type: 'outputNode', label: 'Output',      icon: '⬆', color: '#f472b6' },
  { type: 'llmNode',   label: 'LLM',          icon: '🧠', color: '#a78bfa' },
  { type: 'textNode',  label: 'Text',          icon: '📝', color: '#facc15' },
  { type: 'filterNode',label: 'Filter',        icon: '🔍', color: '#34d399' },
  { type: 'apiNode',   label: 'API Request',   icon: '🌐', color: '#fb923c' },
  { type: 'mathNode',  label: 'Math',          icon: '➗', color: '#60a5fa' },
  { type: 'mergeNode', label: 'Merge',         icon: '🔀', color: '#e879f9' },
  { type: 'noteNode',  label: 'Note',          icon: '📌', color: '#fbbf24' },
];

export const PipelineToolbar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="toolbar">
      <div className="toolbar-title">
        <span className="toolbar-logo">⬡</span>
        <div>
          <div className="toolbar-brand">VectorShift</div>
          <div className="toolbar-sub">Pipeline Builder</div>
        </div>
      </div>

      <div className="toolbar-section-label">Nodes</div>

      <div className="toolbar-nodes">
        {NODE_TYPES.map(n => (
          <div
            key={n.type}
            className="toolbar-node"
            draggable
            onDragStart={e => onDragStart(e, n.type)}
            style={{ '--accent': n.color }}
          >
            <span className="toolbar-node-icon">{n.icon}</span>
            <span className="toolbar-node-label">{n.label}</span>
            <span className="toolbar-node-drag">⠿</span>
          </div>
        ))}
      </div>

      <div className="toolbar-footer">
        <span>Drag nodes onto canvas →</span>
      </div>
    </aside>
  );
};
