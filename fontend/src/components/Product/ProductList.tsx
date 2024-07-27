import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
            try {
                await axios.delete(`http://localhost:8080/api/products/${productId}`);
                alert('Xóa sản phẩm thành công');
                fetchData();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="container my-4">
            <h2 className="mb-3">Danh sách sản phẩm</h2>
            <Link to="/admin/add" className="btn btn-success mb-3">Thêm sản phẩm</Link>
            <div className="row">
                {products.map(product => (
                    <div key={product._id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <Link to={`/admin/edit/${product._id}`} className="btn btn-primary mr-2">Chỉnh sửa</Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
