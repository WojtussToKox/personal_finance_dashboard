import { useState, useEffect } from 'react'

function IncomesPage() {
  const [incomes, setIncomes] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/incomes/Incomes/')
      .then(response => response.json())
      .then(data => setIncomes(data))
      .catch(error => console.error("Błąd połączenia:", error));
  }, [])

  return (
    <div>
      <h2>💸 Twoje Przychody</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            {income.title} - {income.value} PLN (Kategoria: {income.category_name})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IncomesPage