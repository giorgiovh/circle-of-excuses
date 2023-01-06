import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/home/Home';
import About from './pages/about/About';
import Create from './pages/create/Create';
import Edit from './pages/edit/Edit';
import Search from './pages/search/Search';
import ExcuseDetails from './pages/excuse-details/ExcuseDetails';
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
              <Route path='/about' element={<About/>} />
              <Route path='/create' element={user ? <Create uid={user.uid}/> : <Navigate to="/login"/>} /> 
              <Route path='/search' element={<Search />} />
              <Route path='/excuses/:id' element={<ExcuseDetails uid={user?.uid}/>}/>
              <Route path='/excuses/:id/edit' element={user ? <Edit uid={user.uid}/> : <Navigate to="/login"/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
