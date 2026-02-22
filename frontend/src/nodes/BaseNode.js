import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - Abstraction for all pipeline nodes
 *
 * @param {string}   id          - Node id from ReactFlow
 * @param {string}   type        - Display label / badge
 * @param {string}   color       - Accent color (hex / CSS color)
 * @param {string}   icon        - Emoji or character shown in header
 * @param {Array}    inputs      - Array of handle descriptors  { id, label, position? }
 * @param {Array}    outputs     - Array of handle descriptors  { id, label, position? }
 * @param {ReactNode} children   - Body content rendered inside the card
 * @param {number}   minWidth    - Minimum card width in px (default 220)
 * @param {number}   minHeight   - Minimum card height in px (default auto)
 */
export function BaseNode({
  id,
  type = 'Node',
  color = '#7B61FF',
  icon = '⬡',
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  style = {},
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="base-node"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth,
        '--node-accent': color,
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.35), 0 0 0 2px ${color}`
          : '0 4px 16px rgba(0,0,0,0.25)',
        ...style,
      }}
    >
      {/* Header */}
      <div className="node-header" style={{ borderBottomColor: color }}>
        <span className="node-icon">{icon}</span>
        <span className="node-type">{type}</span>
        <span className="node-dot" style={{ background: color }} />
      </div>

      {/* Body */}
      <div className="node-body">{children}</div>

      {/* Input Handles */}
      {inputs.map((inp, i) => {
        const top = inputs.length === 1 ? '50%' : `${((i + 1) / (inputs.length + 1)) * 100}%`;
        return (
          <div key={inp.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${inp.id}`}
              style={{ top, background: color, border: '2px solid #1a1a2e', width: 10, height: 10 }}
            />
            <span
              className="handle-label handle-label-left"
              style={{ top, transform: 'translateY(-50%)' }}
            >
              {inp.label}
            </span>
          </div>
        );
      })}

      {/* Output Handles */}
      {outputs.map((out, i) => {
        const top = outputs.length === 1 ? '50%' : `${((i + 1) / (outputs.length + 1)) * 100}%`;
        return (
          <div key={out.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${out.id}`}
              style={{ top, background: color, border: '2px solid #1a1a2e', width: 10, height: 10 }}
            />
            <span
              className="handle-label handle-label-right"
              style={{ top, transform: 'translateY(-50%)' }}
            >
              {out.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Reusable labeled field wrapper */
export function NodeField({ label, children }) {
  return (
    <div className="node-field">
      {label && <label className="node-label">{label}</label>}
      {children}
    </div>
  );
}

/** Reusable select input */
export function NodeSelect({ value, onChange, options }) {
  return (
    <select className="node-select" value={value} onChange={e => onChange(e.target.value)}>
      {options.map(o => (
        <option key={o.value ?? o} value={o.value ?? o}>
          {o.label ?? o}
        </option>
      ))}
    </select>
  );
}

/** Reusable text input */
export function NodeInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      className="node-input"
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
