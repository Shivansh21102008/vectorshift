import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, NodeField } from './BaseNode';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = new Set();
  let match;
  const re = new RegExp(VARIABLE_REGEX.source, 'g');
  while ((match = re.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
}

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const [size, setSize] = useState({ width: 220, height: 'auto' });

  useEffect(() => {
    setVariables(extractVariables(text));
  }, [text]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';

    // Compute width based on longest line
    const lines = text.split('\n');
    const longest = Math.max(...lines.map(l => l.length));
    const newWidth = Math.min(Math.max(220, longest * 8 + 48), 600);
    setSize({ width: newWidth });
  }, [text]);

  const color = '#facc15';

  return (
    <div
      className="base-node"
      style={{
        minWidth: size.width,
        '--node-accent': color,
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div className="node-header" style={{ borderBottomColor: color }}>
        <span className="node-icon">📝</span>
        <span className="node-type">Text</span>
        <span className="node-dot" style={{ background: color }} />
      </div>

      {/* Body */}
      <div className="node-body">
        <NodeField label="Content">
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type text or use {{variable}}"
            rows={2}
            style={{ resize: 'none', overflow: 'hidden' }}
          />
        </NodeField>
        {variables.length > 0 && (
          <div className="variable-chips">
            {variables.map(v => (
              <span key={v} className="variable-chip" style={{ borderColor: color }}>
                {'{{'}{v}{'}}'}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic variable input handles */}
      {variables.map((v, i) => {
        const top = variables.length === 1 ? '50%' : `${((i + 1) / (variables.length + 1)) * 100}%`;
        return (
          <div key={v}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${v}`}
              style={{
                top,
                background: color,
                border: '2px solid #1a1a2e',
                width: 10,
                height: 10,
              }}
            />
            <span
              className="handle-label handle-label-left"
              style={{ top, transform: 'translateY(-50%)' }}
            >
              {v}
            </span>
          </div>
        );
      })}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: color,
          border: '2px solid #1a1a2e',
          width: 10,
          height: 10,
        }}
      />
      <span
        className="handle-label handle-label-right"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        output
      </span>
    </div>
  );
};
