# VectorShift Frontend Technical Assessment

A complete pipeline builder application built with React + FastAPI.

## Project Structure

```
vectorshift/
├── frontend/         ← React app (Create React App + ReactFlow + Zustand)
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.js     ← Node abstraction (Part 1)
│       │   ├── inputNode.js
│       │   ├── outputNode.js
│       │   ├── llmNode.js
│       │   ├── textNode.js     ← Auto-resize + variable handles (Part 3)
│       │   ├── filterNode.js   ← New node
│       │   ├── apiNode.js      ← New node
│       │   ├── mathNode.js     ← New node
│       │   ├── mergeNode.js    ← New node
│       │   └── noteNode.js     ← New node
│       ├── App.js
│       ├── App.css             ← Full styling (Part 2)
│       ├── store.js            ← Zustand state management
│       ├── toolbar.js          ← Draggable node palette
│       ├── ui.js               ← ReactFlow canvas
│       └── submit.js           ← Backend integration (Part 4)
└── backend/
    ├── main.py                 ← FastAPI with DAG detection (Part 4)
    └── requirements.txt
```

## Parts Completed

### Part 1 — Node Abstraction
`BaseNode.js` provides a reusable component that accepts:
- `type` — display name
- `color` — accent color
- `icon` — emoji/character
- `inputs` / `outputs` — handle arrays `[{ id, label }]`
- `children` — card body content

Five new nodes built using the abstraction: **Filter**, **API Request**, **Math**, **Merge**, **Note**.

### Part 2 — Styling
Dark tech aesthetic with:
- Custom fonts: Syne (display) + DM Mono (code)
- Color-coded nodes with glowing accent handles
- Animated pulse dots, hover effects, smooth transitions
- Dot-grid canvas background, styled MiniMap and Controls

### Part 3 — Text Node Logic
- **Auto-resize**: Width expands based on longest line; height grows with content
- **Variable handles**: `{{variable_name}}` creates a new input Handle dynamically
- Variable chips shown below the textarea for visual feedback

### Part 4 — Backend Integration
- `submit.js` POSTs `{ nodes, edges }` to `http://localhost:8000/pipelines/parse`
- `backend/main.py` returns `{ num_nodes, num_edges, is_dag }` using Kahn's algorithm
- Alert displays results in a user-friendly format

## Running the App

### Frontend
```bash
cd frontend
npm install
npm start
# Opens at http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# Runs at http://localhost:8000
```

Both must be running for the **Analyze Pipeline** button to work.

## How to Use
1. Drag nodes from the left panel onto the canvas
2. Connect nodes by dragging from output (right) to input (left) handles
3. For Text nodes, type `{{var_name}}` to create dynamic input handles
4. Click **Analyze Pipeline** to submit to the backend and see node/edge counts + DAG status
