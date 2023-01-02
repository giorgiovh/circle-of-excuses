import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/home/Home';
import About from './pages/about/About';
import Create from './pages/create/Create';
import Wheel from './pages/wheel/Wheel';
import Search from './pages/search/Search';
import Excuse from './pages/excuse/Excuse';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import SearchAppBar from './components/SearchAppBar';

import './App.css';

function App() {
  const { authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <SearchAppBar />
          <div className="pages">
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route path='/login'element={<Login/>} />
              <Route path='/signup'element={<SignUp/>} />
              <Route path='/create' element={<div><Create/></div>} /> 
              <Route path='/wheel' element={<div><Wheel/></div>} />
              <Route path='/about' element={<div><About/></div>} />
              <Route path='/search' element={<div><Search /></div>} />
              <Route path='/excuses/:id' element={<div><Excuse /></div>} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
