import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    description: '',
    countInStock: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/products/${id}`, formData);
      alert('Cập nhật sản phẩm thành công');
      // Redirect to product list after successful edit
      navigate('/admin');
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <div className="container">
      <h1>Chỉnh sửa sản phẩm</h1>
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
        <button type="submit" className="btn btn-primary mr-2">Cập nhật</button>
      </form>
    </div>
  );
};

export default ProductEdit;
