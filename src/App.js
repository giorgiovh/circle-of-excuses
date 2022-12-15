import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import SearchAppBar from './components/SearchAppBar';
import Search from './pages/search/Search';

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
