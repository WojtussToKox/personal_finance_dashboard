import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function IncomesPage() {
  const [incomes, setIncomes] = useState([])

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/incomes/Incomes/`)
      .then(response => response.json())
      .then(data => setIncomes(data))
      .catch(error => console.error("Błąd połączenia:", error));
  }, [])

  const handleDelete = (id) => {
    if(window.confirm("Czy na pewno chcesz usunąć ten wpis?")) {
      fetch(`http://127.0.0.1:8000/api/incomes/Incomes/${id}/`, {
        method: "DELETE"
      })
      .then(respone => {
        if (respone.ok) {
          setIncomes(prevIncomes => prevIncomes.filter(item => item.id !== id));
        }
        else {
          alert("Błąd podczas usuwania!")
        }
      })
      .catch(error => console.error(error));
    }
  }

  return (
    <div>
      <h2>💸 Twoje Przychody</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id} className='list-item income-item'>
            {income.title} - {income.value} PLN (Kategoria: {income.category_name})
             <Button onClick={() => handleDelete(income.id)}>Usuń</Button>
             <Button as={Link} to={`/incomes/edit/${income.id}`}>Edytuj</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IncomesPage