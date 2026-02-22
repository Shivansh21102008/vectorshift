import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note...');

  return (
    <BaseNode
      id={id}
      type="Note"
      color="#fbbf24"
      icon="📌"
      inputs={[]}
      outputs={[]}
      minWidth={200}
    >
      <NodeField>
        <textarea
          className="node-textarea"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={4}
          style={{ resize: 'vertical', fontStyle: 'italic', fontSize: '12px' }}
        />
      </NodeField>
    </BaseNode>
  );
};
