import './App.css';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app">
      <PipelineToolbar />
      <div className="main">
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
