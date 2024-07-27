import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './detail.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  sale?: string;
  priceOld?: string;
  priceNew?: string;
  description: string;
  countInStock: number;
}

const ProductDetail = () => {
  const addToCartHandler = (product: Product) => {
    window.location.href = `/cart?name=${product.name}&price=${product.price}&image=${product.image}`;
  }

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <div className="container">
      <div className="detail-product">
        <div className="box-left">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>
        <div className="box-center">
          <img src="../../../images/Group 95.png" alt="" />
        </div>
        <div className="box-right">
          <div className="product_name">
            <h2>{product.name}</h2>
          </div>
          <div className="price">
            <p>Price: {product.price}</p>
          </div>
          <div className="desciption">
            <p>{product.description}</p>
          </div>
          <div className="addToCart">
            <div className="selectQuantity">
              <div className="minus"><i className="fa-solid fa-minus" /></div>
              <div className="quantity">1</div>
              <div className="plus"><i className="fa-solid fa-plus" /></div>
            </div>
            <div className="add">
              <p onClick={() => addToCartHandler(product)}>Add To Cart</p>
            </div>
            <div className="compare">
              <p>Compare</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
