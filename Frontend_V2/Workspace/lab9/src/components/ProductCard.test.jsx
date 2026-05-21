import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
 test('renders product information', () => {
  const product = { id: 1, title: 'Test Product', price: 99 };
  render(<ProductCard product={product} onAddToCart={() => {}} />);
    
   expect(screen.getByText('Test Product')).toBeInTheDocument();
   expect(screen.getByText('$99')).toBeInTheDocument();
 });

test('handles add to cart click', () => {
  const onAddToCart = jest.fn();
  const product = { id: 1, title: 'Test' };
    
  render(<ProductCard product={product} onAddToCart={onAddToCart} />);
    
   fireEvent.click(screen.getByText('Add to Cart'));
   expect(onAddToCart).toHaveBeenCalledWith(1);
 });
});