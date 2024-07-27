import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductAdd = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        image: '',
        description: '',
        countInStock: 0
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/api/products`, formData);
            setMessage('Thêm sản phẩm thành công');
            // Redirect to product list after successful addition
            navigate('/products');
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="container">
            <h1>Thêm sản phẩm</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Giá</label>
                    <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Link ảnh</label>
                    <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="countInStock">Số lượng tồn kho</label>
                    <input type="number" className="form-control" id="countInStock" name="countInStock" value={formData.countInStock} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary mr-2">Thêm sản phẩm</button>
            </form>
        </div>
    );
};

export default ProductAdd;
