
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signin', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div className="container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                </div>
                <Link to = "/">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </Link>
            </form>
        </div>
    );
};

export default SignIn;
