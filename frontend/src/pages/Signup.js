import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await signup(email, password);
        if (success) {
            navigate('/'); // riderect to home if login ok
        }
    }

    return (
        <div className="signup-container">
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

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

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
         <p className="login-prompt">
         Already registered? <Link to="/login">Log in</Link>
     </p>
     </div>
    )
}

export default Signup;
