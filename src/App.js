import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <SearchAppBar />
          <div className="pages">
            <Routes>
              <Route exact path='/' element={user ? <Home/> : <Navigate to="/login"/>} />
              <Route path='/login' element={user ? <Navigate to="/"/> : <Login/>} />
              <Route path='/signup'element={user ? <Navigate to="/"/> : <SignUp/>} />
              <Route path='/create' element={user ? <Create/> : <Navigate to="/login"/>} /> 
              <Route path='/wheel' element={user ? <Wheel/> : <Navigate to="/login"/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/search' element={user ? <Search /> : <Navigate to="/login"/>} />
              <Route path='/excuses/:id' element={user ? <Excuse /> : <Navigate to="/login"/>} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
