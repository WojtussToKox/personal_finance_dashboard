import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'

import IncomesPage from './pages/IncomesPage'
import IncomeAddForm from './pages/IncomeAddForm'
import IncomeEditPage from './pages/IncomeEditPage'

import ExpensesPage from './pages/ExpensesPage'
import ExpenseAddForm from './pages/ExpenseAddForm'
import ExpenseEditForm from './pages/ExpenseEditForm'

import ExpenseCategoryPage from './pages/ExpenseCategoryPage'
import IncomeCategoryPage from './pages/IncomeCategoryPage'

import { Container } from 'react-bootstrap';
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Container>
        <Routes>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />


          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/incomes" element={
            <ProtectedRoute>
              <IncomesPage />
            </ProtectedRoute>
          } />
          <Route path='/incomes/add' element={
            <ProtectedRoute>
              <IncomeAddForm />
            </ProtectedRoute>
          } />
          <Route path="/incomes/edit/:id" element={
            <ProtectedRoute>
              <IncomeEditPage />
            </ProtectedRoute>
          } />

          <Route path="/expenses" element={
            <ProtectedRoute>  
              <ExpensesPage />
            </ProtectedRoute>
          } />
          <Route path="/expenses/add" element={
            <ProtectedRoute>
              <ExpenseAddForm />
            </ProtectedRoute>
          } />
          <Route path="/expenses/edit/:id" element={
            <ProtectedRoute>
              <ExpenseEditForm />
            </ProtectedRoute>
          } />

          <Route path="/categories/expenses" element={
            <ProtectedRoute>
              <ExpenseCategoryPage />
            </ProtectedRoute>
          } />
          <Route path="/categories/incomes" element={
            <ProtectedRoute>
              <IncomeCategoryPage />
            </ProtectedRoute>
          } />


        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App