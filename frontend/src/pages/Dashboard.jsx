import { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function Dashboard() {

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem('access');

      // Pobieranie przychodów
      fetch(`${import.meta.env.VITE_API_URL}/api/incomes/Incomes/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      })
          .then(res => res.json())
          .then(data => setIncomes(data))
          .catch(err => console.error(err));

      // Pobieranie wydatków
      fetch(`${import.meta.env.VITE_API_URL}/api/expenses/expenses/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      })
          .then(res => res.json())
          .then(data => setExpenses(data))
          .catch(err => console.error(err));
  }, []);

  const totalIncome = incomes.reduce((sum, item) => sum + Number(item.value), 0);
    
  const totalExpense = expenses.reduce((sum, item) => sum + (Number(item.price) * Number(item.count)), 0);
  
  const balance = totalIncome - totalExpense;

  return (
    <div className="mt-4">
            <h2 className="mb-4">📊 Podsumowanie Twojego Portfela</h2>
            
            <Row>
                <Col md={4} className="mb-3">
                    <Card bg="success" text="white" className="shadow-sm text-center">
                        <Card.Body>
                            <Card.Title>Całkowite Przychody</Card.Title>
                            <h3>+ {totalIncome.toFixed(2)} PLN</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-3">
                    <Card bg="danger" text="white" className="shadow-sm text-center">
                        <Card.Body>
                            <Card.Title>Całkowite Wydatki</Card.Title>
                            <h3>- {totalExpense.toFixed(2)} PLN</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-3">
                    <Card bg={balance >= 0 ? "primary" : "warning"} text={balance >= 0 ? "white" : "dark"} className="shadow-sm text-center">
                        <Card.Body>
                            <Card.Title>Aktualne Saldo</Card.Title>
                            <h3>{balance.toFixed(2)} PLN</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
  )
}

export default Dashboard