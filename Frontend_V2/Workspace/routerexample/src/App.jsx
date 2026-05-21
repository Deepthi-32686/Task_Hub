import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Registration from './Components/Registration'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/dashboard/:name" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
