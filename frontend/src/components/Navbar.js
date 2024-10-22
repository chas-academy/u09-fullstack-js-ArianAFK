import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    
    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <div className="container">
                {/* Left section - Brand/Logo */}
                <div className="navbar-left">
                    <Link to="/">
                        <h1>Boss-media</h1>
                    </Link>
                </div>

                {/* Middle section - Links to Products, Contact, About Us */}
                <div className="navbar-center">
                    <Link to="/products">Products</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                {/* Right section - User actions */}
                <nav className="navbar-right">
                    {user && user.role === 'admin' && (
                        <div>
                            <Link to="/admin">
                                <button className='admin-button'>Admin Dashboard</button>
                            </Link>
                        </div>
                    )}

                    {user ? (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
