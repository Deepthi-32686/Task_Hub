import React, { useState, useEffect } from 'react';
import ProductContainer from '../Components/ProductContainer';
import ProductPresenter from '../Components/ProductPresenter';

// Closure to track API fetch attempts
const createFetchTracker = () => {
  let fetchAttempts = 0;
  let lastFetchTime = null;
  
  return {
    incrementAttempt: () => {
      fetchAttempts++;
      lastFetchTime = new Date();
      return fetchAttempts;
    },
    getAttempts: () => fetchAttempts,
    getLastFetchTime: () => lastFetchTime,
    reset: () => {
      fetchAttempts = 0;
      lastFetchTime = null;
    }
  };
};

const fetchTracker = createFetchTracker();

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Async/await and promise chains for API fetching
  const fetchProducts = async () => {
    try {
      const attempt = fetchTracker.incrementAttempt();
      console.log(`Fetch attempt #${attempt} at ${fetchTracker.getLastFetchTime()}`);
      
      setLoading(true);
      setError(null);
      
      // Fetch from dummyjson API
      const response = await fetch('https://dummyjson.com/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Wait a bit to simulate loading for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(data.products.slice(0, 12)); // Get first 12 products
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    
    // Cleanup function
    return () => {
      fetchTracker.reset();
    };
  }, []);

  // Handler to refresh products
  const handleRefresh = () => {
    fetchProducts();
  };

  return (
    <div className="product-listing-page">
      <div className="page-header">
        <h2>Product Catalog</h2>
        <button className="refresh-btn" onClick={handleRefresh}>
          Refresh Products
        </button>
      </div>
      
      <ProductContainer 
        products={products} 
        loading={loading} 
        error={error}
        fetchAttempts={fetchTracker.getAttempts()}
      />
      
      {products.length > 0 && (
        <div className="page-footer">
          <p>Showing {products.length} products</p>
          <p>Fetch attempts: {fetchTracker.getAttempts()}</p>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;