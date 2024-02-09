
import './App.css';
import EventForm from './Admin/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  // Using async/await with Axios

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<EventForm />}>
          
        </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
