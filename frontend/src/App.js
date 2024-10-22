import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetailPage from './components/ProductDetailsPage';
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
            <Route path="/products" element={<Products/>} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            {user && <Route path="/admin" element={user.role === 'admin' ? <Admin role={user.role} /> : <Navigate to="/" />} />}
          </Routes>
          <Footer /> 
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
