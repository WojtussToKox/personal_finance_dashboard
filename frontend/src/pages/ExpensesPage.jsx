import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
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
        <div>
            <h2>Lista Wydatków...</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id} className='list-item expense-item'>
                        {expense.title} - {expense.price}PLN x {expense.count} (Kategoria: {expense.category_name})
                        <Button onClick={() => handleDelete(expense.id)}>Usuń</Button>
                        <Button as={Link} to={`/expenses/edit/${expense.id}`}>Edytuj</Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExpensesPage