import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

  getNodeID: (type) => {
    const counts = {};
    get().nodes.forEach(n => {
      const t = n.type;
      counts[t] = (counts[t] || 0) + 1;
    });
    return `${type}-${(counts[type] || 0) + 1}`;
  },

  addNode: (node) => set(state => ({ nodes: [...state.nodes, node] })),

  onNodesChange: (changes) =>
    set(state => ({ nodes: applyNodeChanges(changes, state.nodes) })),

  onEdgesChange: (changes) =>
    set(state => ({ edges: applyEdgeChanges(changes, state.edges) })),

  onConnect: (connection) =>
    set(state => ({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed, color: '#7B61FF' },
          style: { stroke: '#7B61FF', strokeWidth: 2 },
        },
        state.edges
      ),
    })),
}));
