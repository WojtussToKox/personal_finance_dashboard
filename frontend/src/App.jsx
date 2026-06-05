import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

import IncomesPage from './pages/IncomesPage'
import IncomeAddForm from './pages/IncomeAddForm'
import IncomeEditPage from './pages/IncomeEditPage'

import ExpensesPage from './pages/ExpensesPage'
import ExpenseAddForm from './pages/ExpenseAddForm'
import ExpenseEditForm from './pages/ExpenseEditForm'

import ExpenseCategoryPage from './pages/ExpenseCategoryPage'
import IncomeCategoryPage from './pages/IncomeCategoryPage'

import { Container } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/incomes" element={<IncomesPage />} />
          <Route path='/incomes/add' element={<IncomeAddForm />} />
          <Route path="/incomes/edit/:id" element={<IncomeEditPage />} />

          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/expenses/add" element={<ExpenseAddForm />} />
          <Route path="/expenses/edit/:id" element={<ExpenseEditForm />} />

          <Route path="/categories/expenses" element={<ExpenseCategoryPage />} />
          <Route path="/categories/incomes" element={<IncomeCategoryPage />} />


        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App