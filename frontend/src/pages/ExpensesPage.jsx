import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import ExpenseEditForm from './ExpenseEditForm';
import { Link } from 'react-router-dom';

function ExpensesPage() {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/expenses/expenses/')
        .then(response => response.json())
        .then(data => setExpenses(data))
        .catch(error => console.error("Błąd połączenia:", error));
    }, [])

    const handleDelete = (id) => {
        if(window.confirm("Czy na pewno chcesz usunąć ten wydatek")) {
            fetch(`http://127.0.0.1:8000/api/expenses/expenses/${id}/`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    setExpenses(prevExpenses => prevExpenses.filter(item => item.id !== id))
                } else {
                    alert("Bład podczas usuwania wydatku!")
                }})
            .catch(error => console.error(error))
        }
        
    }

    return (
        <Container>
            <h2>Lista Wydatków...</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id} className='list-item expense-item d-flex justify-content-between align-items-center'>
                        {expense.title} - {expense.price}PLN x {expense.count} (Kategoria: {expense.category_name})
                        <div>
                            <Button variant="danger" onClick={() => handleDelete(expense.id)}>Usuń</Button>
                            <Button variant="warning" className="ms-2" as={Link} to={`/expenses/edit/${expense.id}`}>Edytuj</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    )
}

export default ExpensesPage