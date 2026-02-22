import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');

  return (
    <BaseNode
      id={id}
      type="LLM"
      color="#a78bfa"
      icon="🧠"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <NodeField label="Model">
        <NodeSelect
          value={model}
          onChange={setModel}
          options={[
            { value: 'gpt-4o', label: 'GPT-4o' },
            { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
            { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
            { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
            { value: 'claude-3-opus', label: 'Claude 3 Opus' },
            { value: 'gemini-pro', label: 'Gemini Pro' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
