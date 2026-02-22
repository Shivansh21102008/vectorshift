import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      type="API Request"
      color="#fb923c"
      icon="🌐"
      inputs={[
        { id: 'headers', label: 'headers' },
        { id: 'body', label: 'body' },
      ]}
      outputs={[
        { id: 'response', label: 'response' },
        { id: 'status', label: 'status' },
      ]}
      minWidth={260}
    >
      <NodeField label="URL">
        <NodeInput value={url} onChange={setUrl} placeholder="https://api.example.com" />
      </NodeField>
      <NodeField label="Method">
        <NodeSelect
          value={method}
          onChange={setMethod}
          options={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
        />
      </NodeField>
    </BaseNode>
  );
};
