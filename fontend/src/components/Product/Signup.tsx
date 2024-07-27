import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signup', formData);
            console.log(response.data);

            window.location.href = '/signin';
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                </div>

                <Link to = "/signin">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </Link>
            </form>
        </div>
    );
};

export default SignUp;
