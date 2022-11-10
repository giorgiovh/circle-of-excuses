import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>Circle of Excuses</h1>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<div><About/></div>} />
          <Route path='/contact' element={<div><Contact/></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
