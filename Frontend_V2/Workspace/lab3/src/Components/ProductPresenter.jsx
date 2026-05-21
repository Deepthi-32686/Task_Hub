import React from 'react';

const ProductPresenter = ({ product }) => {
  const {
    id,
    title,
    price,
    description,
    category,
    brand,
    thumbnail,
    rating,
    stock
  } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={thumbnail} alt={title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-category">{category}</p>
        <p className="product-brand">Brand: {brand}</p>
        <p className="product-description">{description.substring(0, 100)}...</p>
        
        <div className="product-details">
          <div className="price">${price}</div>
          <div className="rating">
            ⭐ {rating} ({stock} in stock)
          </div>
        </div>
      </div>
      
      <div className="product-actions">
        <button className="btn-primary">Add to Cart</button>
        <button className="btn-secondary">Details</button>
      </div>
    </div>
  );
};

export default ProductPresenter;