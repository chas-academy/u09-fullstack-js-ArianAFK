import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
// pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();  // get user login status

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />} // Redirect to home
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />} // Redirect to home
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
