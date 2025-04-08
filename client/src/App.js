import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Add from "./pages/Add"
import Update from "./pages/Update"
import Recipes from "./pages/Recipes"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Recipes/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
