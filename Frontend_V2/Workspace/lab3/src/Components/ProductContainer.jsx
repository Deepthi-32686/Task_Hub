import React from 'react';
import ProductPresenter from './ProductPresenter';
import ProductSkeleton from './ProductSkeleton';

const ProductContainer = ({ products, loading, error, fetchAttempts }) => {
  // Render loading state with skeleton UI
  if (loading) {
    return (
      <div className="product-container">
        <div className="loading-header">
          <h3>Loading Products...</h3>
          <p>Attempt #{fetchAttempts}</p>
        </div>
        <div className="skeleton-grid">
          {[...Array(6)].map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="product-container error-container">
        <div className="error-content">
          <h3>Error Loading Products</h3>
          <p>{error}</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  // Render actual products using presentational component
  return (
    <div className="product-container">
      <div className="products-grid">
        {products.map(product => (
          <ProductPresenter 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;