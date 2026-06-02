import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import IncomesPage from './pages/IncomesPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incomes" element={<IncomesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App