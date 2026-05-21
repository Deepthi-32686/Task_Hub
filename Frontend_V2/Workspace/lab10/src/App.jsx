import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => <h1>Welcome to Deployment Lab</h1>;
const About = () => <h1>About Page</h1>;

const App = () => {
 const [count, setCount] = useState(0);

return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <div className="counter">
        <button onClick={() => setCount(count +1)}>
          Count: {count}
        </button>
      </div>
    </BrowserRouter>
  );
};

export default App;