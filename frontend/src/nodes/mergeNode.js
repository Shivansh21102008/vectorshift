import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  return (
    <BaseNode
      id={id}
      type="Merge"
      color="#e879f9"
      icon="🔀"
      inputs={[
        { id: 'stream_a', label: 'stream A' },
        { id: 'stream_b', label: 'stream B' },
        { id: 'stream_c', label: 'stream C' },
      ]}
      outputs={[{ id: 'merged', label: 'merged' }]}
    >
      <NodeField label="Strategy">
        <NodeSelect
          value={strategy}
          onChange={setStrategy}
          options={[
            { value: 'concat', label: 'Concatenate' },
            { value: 'zip', label: 'Zip together' },
            { value: 'first', label: 'First wins' },
            { value: 'last', label: 'Last wins' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
