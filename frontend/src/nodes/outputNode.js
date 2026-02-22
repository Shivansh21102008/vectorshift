import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || 'output_1');
  const [type, setType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      type="Output"
      color="#f472b6"
      icon="⬆"
      inputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeField label="Name">
        <NodeInput value={name} onChange={setName} placeholder="output_name" />
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
