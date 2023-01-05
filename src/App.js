import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/home/Home';
import About from './pages/about/About';
import Create from './pages/create/Create';
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
          <SearchAppBar user={user}/>
          <div className="pages">
            <Routes>
              <Route exact path='/' element={<Home uid={user?.uid}/>} />
              <Route path='/login' element={user ? <Navigate to="/"/> : <Login/>} />
              <Route path='/signup'element={user ? <Navigate to="/"/> : <SignUp/>} />
              <Route path='/create' element={user ? <Create uid={user.uid}/> : <Navigate to="/login"/>} /> 
              <Route path='/about' element={<About/>} />
              <Route path='/search' element={user ? <Search /> : <Navigate to="/login"/>} />
              <Route path='/excuses/:id' element={<Excuse uid={user?.uid}/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
