import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      type="Math"
      color="#60a5fa"
      icon="➗"
      inputs={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
      ]}
      outputs={[{ id: 'result', label: 'result' }]}
    >
      <NodeField label="Operation">
        <NodeSelect
          value={operation}
          onChange={setOperation}
          options={[
            { value: 'add', label: 'Add (A + B)' },
            { value: 'subtract', label: 'Subtract (A − B)' },
            { value: 'multiply', label: 'Multiply (A × B)' },
            { value: 'divide', label: 'Divide (A ÷ B)' },
            { value: 'modulo', label: 'Modulo (A % B)' },
            { value: 'power', label: 'Power (A ^ B)' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
