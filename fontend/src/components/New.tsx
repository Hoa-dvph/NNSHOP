import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../new.css';

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

const New: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="news">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">New</h2>
          </div>
          <div className="section-body">
            <div className="product-list">
              {loading ? (
                <p>Loading...</p>
              ) : products.length > 0 ? (
                products.map((product: Product) => (
                  <div key={product._id} className="product-item">
                    <Link to={`/products/${product._id}`}>
                      <img src={product.image} alt={product.name} />
                      <h3>{product.name}</h3>
                    </Link>
                    <p>{product.description}</p>
                    <div className="product-info">
                      <span className="product-price">
                        {product.sale && <span className="product-sale">{product.sale}</span>}
                        {product.sale ? product.priceNew : product.price}
                      </span>
                      {product.sale && <span className="product-price-old">{product.priceOld}</span>}
                      <span className="product-stock">{product.countInStock} in stock</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
              <div className="product-info"></div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <hr />
      </div>
    </div>
  );
};

export default New;
