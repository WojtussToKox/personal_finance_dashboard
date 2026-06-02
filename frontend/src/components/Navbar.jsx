import { Link } from 'react-router-dom'
import './Navbar.css' 

function Navbar() {
  return (
    <nav className="navbar">
      <h3 className="navbar-brand">FinanceApp</h3>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Pulpit</Link>
        <Link to="/incomes" className="navbar-link">Przychody</Link>
        <Link to="/expenses" className="navbar-link">Wydatki</Link>
      </div>
    </nav>
  )
}

export default Navbar