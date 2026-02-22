import { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { ApiNode } from './nodes/apiNode';
import { MathNode } from './nodes/mathNode';
import { MergeNode } from './nodes/mergeNode';
import { NoteNode } from './nodes/noteNode';

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
  textNode: TextNode,
  filterNode: FilterNode,
  apiNode: ApiNode,
  mathNode: MathNode,
  mergeNode: MergeNode,
  noteNode: NoteNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, getNodeID } = useStore();

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left - 110,
        y: event.clientY - bounds.top - 40,
      };

      const newNode = {
        id: getNodeID(type),
        type,
        position,
        data: {},
      };
      addNode(newNode);
    },
    [getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="pipeline-canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#2a2a3e"
        />
        <Controls
          style={{
            background: '#1a1a2e',
            border: '1px solid #2a2a3e',
            borderRadius: '8px',
          }}
        />
        <MiniMap
          style={{
            background: '#0f0f1a',
            border: '1px solid #2a2a3e',
          }}
          nodeColor={(n) => {
            const colorMap = {
              inputNode: '#22d3ee',
              outputNode: '#f472b6',
              llmNode: '#a78bfa',
              textNode: '#facc15',
              filterNode: '#34d399',
              apiNode: '#fb923c',
              mathNode: '#60a5fa',
              mergeNode: '#e879f9',
              noteNode: '#fbbf24',
            };
            return colorMap[n.type] || '#7B61FF';
          }}
          maskColor="rgba(0,0,0,0.4)"
        />
      </ReactFlow>
    </div>
  );
};
