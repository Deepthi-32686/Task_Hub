import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="product-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line medium"></div>
      </div>
      <div className="skeleton-actions">
        <div className="skeleton-button primary"></div>
        <div className="skeleton-button secondary"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;