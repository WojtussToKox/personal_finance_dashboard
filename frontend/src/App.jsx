import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import IncomesPage from './pages/IncomesPage'
import IncomeAddForm from './pages/IncomeAddForm'
import ExpensesPage from './pages/ExpensesPage'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incomes" element={<IncomesPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path='/incomes/add' element={<IncomeAddForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App