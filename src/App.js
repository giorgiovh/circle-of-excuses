import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import About from './pages/about/About';
import Create from './pages/create/Create';
import Wheel from './pages/wheel/Wheel';
import Search from './pages/search/Search';
import Excuse from './pages/excuse/Excuse';

import SearchAppBar from './components/SearchAppBar';
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchAppBar />
        <div className="pages">
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/login'element={<Login/>} />
            <Route path='/create' element={<div><Create/></div>} /> 
            <Route path='/wheel' element={<div><Wheel/></div>} />
            <Route path='/about' element={<div><About/></div>} />
            <Route path='/search' element={<div><Search /></div>} />
            <Route path='/excuses/:id' element={<div><Excuse /></div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
