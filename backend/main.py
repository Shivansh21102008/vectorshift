from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, List, Dict, Optional
from collections import defaultdict, deque

app = FastAPI(title="VectorShift Pipeline API")

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---- Models ----

class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict[str, Any]] = {}
    position: Optional[Dict[str, float]] = {}

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# ---- Helpers ----

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """Return True if the graph is a Directed Acyclic Graph (no cycles)."""
    # Build adjacency list
    node_ids = {n.id for n in nodes}
    adj: Dict[str, List[str]] = defaultdict(list)
    for e in edges:
        if e.source in node_ids and e.target in node_ids:
            adj[e.source].append(e.target)

    # Kahn's algorithm (topological sort)
    in_degree: Dict[str, int] = defaultdict(int)
    for u in adj:
        for v in adj[u]:
            in_degree[v] += 1

    queue = deque(n for n in node_ids if in_degree[n] == 0)
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


# ---- Routes ----

@app.get("/")
def root():
    return {"status": "ok", "service": "VectorShift Pipeline API"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag,
    }
