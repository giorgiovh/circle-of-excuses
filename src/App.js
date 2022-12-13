import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchAppBar from './components/SearchAppBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchAppBar />
        <div className="pages">
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/about' element={<div><About/></div>} />
            <Route path='/contact' element={<div><Contact/></div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
