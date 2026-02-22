import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || 'input_1');
  const [type, setType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      type="Input"
      color="#22d3ee"
      icon="⬇"
      outputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeField label="Name">
        <NodeInput value={name} onChange={setName} placeholder="input_name" />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect
          value={type}
          onChange={setType}
          options={['Text', 'File', 'Image', 'Number']}
        />
      </NodeField>
    </BaseNode>
  );
};
