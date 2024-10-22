import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
/* import { useState } from 'react'; */

function App() {
  const { user } = useAuthContext();  // Get user login status
  /* const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);  // New loading state */


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            {user && <Route path="/admin" element={user.role === 'admin' ? <Admin role={user.role} /> : <Navigate to="/" />} />}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
