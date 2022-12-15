import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Search from './pages/search/Search';

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
            <Route path='/search' element={<div><Search /></div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
