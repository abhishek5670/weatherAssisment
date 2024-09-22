import "./App.css";
import Home from "./Screen/Home";
import Error from "./Screen/Error";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router >
      <Routes >
        <Route 
          path="/" 
          element={
            <Home/>
          } 
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
