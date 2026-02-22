import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      type="Filter"
      color="#34d399"
      icon="🔍"
      inputs={[{ id: 'data', label: 'data' }]}
      outputs={[
        { id: 'pass', label: 'pass' },
        { id: 'fail', label: 'fail' },
      ]}
    >
      <NodeField label="Field">
        <NodeInput value={field} onChange={setField} placeholder="field_name" />
      </NodeField>
      <NodeField label="Operator">
        <NodeSelect
          value={operator}
          onChange={setOperator}
          options={['equals', 'not equals', 'contains', 'greater than', 'less than']}
        />
      </NodeField>
      <NodeField label="Value">
        <NodeInput value={value} onChange={setValue} placeholder="compare value" />
      </NodeField>
    </BaseNode>
  );
};
