import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore(s => s.nodes);
  const edges = useStore(s => s.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      const { num_nodes, num_edges, is_dag } = data;

      const dagMsg = is_dag
        ? '✅ Valid DAG — no cycles detected.'
        : '⚠️ Not a DAG — cycles were found!';

      alert(
        `📊 Pipeline Analysis\n\n` +
        `  Nodes   : ${num_nodes}\n` +
        `  Edges   : ${num_edges}\n\n` +
        `  ${dagMsg}`
      );
    } catch (err) {
      alert(`❌ Failed to reach backend.\n\nMake sure the FastAPI server is running on port 8000.\n\nError: ${err.message}`);
    }
  };

  return (
    <div className="submit-bar">
      <button className="submit-btn" onClick={handleSubmit}>
        <span className="submit-icon">▶</span>
        Analyze Pipeline
      </button>
      <span className="submit-meta">
        {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
      </span>
    </div>
  );
};
