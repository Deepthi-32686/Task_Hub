import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
 const { title, price } = product;

return (
    <div className="product-card">
      <h3>{title}</h3>
      <p className="price">${price}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;