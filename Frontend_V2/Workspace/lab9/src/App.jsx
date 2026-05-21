import React from 'react';
import ProductCard from './components/ProductCard.jsx';

const App = () => {
 const products = [
    { id: 1, title: 'Product 1', price: 99 },
    { id: 2, title: 'Product 2', price: 149 }
  ];

const handleAddToCart = (id) => {
  console.log('Added to cart:', id);
  };

return (
    <div className="app">
      <h1>Testing Demo</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default App;