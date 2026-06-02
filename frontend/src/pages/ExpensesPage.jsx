import { useState, useEffect } from 'react'

function ExpensesPage() {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/expenses/expenses/')
        .then(response => response.json())
        .then(data => setExpenses(data))
        .catch(error => console.error("Błąd połączenia:", error));
  }, [])

  return (
    <div>
        <h2>Lista Wydatków...</h2>
        <ul>
            {expenses.map((expense) => (
                <li key={expense.id} className='list-item expense-item'>
                    {expense.title} - {expense.price}PLN x {expense.count} (Kategoria: {expense.category})
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ExpensesPage