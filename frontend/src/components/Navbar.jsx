import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function Navigation() {

  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    navigate('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">FinanceApp</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="Przychody" id="incomes-dropdown">
              <NavDropdown.Item as={Link} to="/incomes">Lista przychodów</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/incomes/add">Dodaj przychód</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Wydatki" id="expenses-dropdown">
              <NavDropdown.Item as={Link} to="/expenses">Lista wydatków</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/expenses/add">Dodaj wydatek</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Kategorie" id="categories-dropdown">
              <NavDropdown.Item as={Link} to="/categories/expenses">Zarządzanie Kategoriami Wydatków</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categories/incomes">Zarządzanie Kategoriami Przychodów</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <Button variant="outline-light" onClick={handleLogout}>Wyloguj</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;