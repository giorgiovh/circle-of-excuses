import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// hooks
import { useAuthContext } from './hooks/useAuthContext';

// pages
import Home from './pages/home/Home';
import About from './pages/about/About';
import Create from './pages/create/Create';
import CreatePresetExcuse from './pages/create-preset-excuse/CreatePresetExcuse';
import Edit from './pages/edit/Edit';
import EditPresetExcuse from './pages/edit-preset-excuse/EditPresetExcuse';
import Search from './pages/search/Search';
import ExcuseDetails from './pages/excuse-details/ExcuseDetails';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';

// components
import PrimarySearchAppBar from './components/PrimarySearchAppBar';

// functions
import { checkIfUserIsAdmin } from './utils/utils';

// styles
import './App.css';

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <PrimarySearchAppBar user={user}/>
          <Routes>
            <Route exact path='/' element={<Home uid={user?.uid} />} />
            <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
            <Route path='/signup'element={user ? <Navigate to="/" /> : <SignUp />} />
            <Route path='/about' element={<About />} />
            <Route path='/create' element={user ? <Create uid={user.uid}/> : <Navigate to="/login" />} /> 
            <Route path='/create-preset-excuse' element={user && checkIfUserIsAdmin(user) ? <CreatePresetExcuse /> : <Navigate to="/login" />} /> 
            <Route path='/search' element={<Search uid={user?.uid}/>} />
            <Route path='/excuses/:id' element={<ExcuseDetails uid={user?.uid} />} />
            <Route path='/excuses/:id/edit' element={user ? <Edit uid={user.uid} /> : <Navigate to="/login" />} />
            <Route path='/preset-excuses/:id/edit' element={user && checkIfUserIsAdmin(user) ? <EditPresetExcuse uid={user.uid} /> : <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
