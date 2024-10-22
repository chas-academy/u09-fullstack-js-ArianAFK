import { useState } from "react";
import { useLogin } from '../hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login(email, password);
        if (success) {
            navigate('/'); // redirect to home if login ok
        }
    }

    return (
        <div className="login-container">
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
        <p className="signup-prompt">
        Don't have an account? <Link to="/signup">Sign up</Link>
    </p>
    </div>
    )
}

export default Login;
