import { useEffect, useState } from "react"
import AddIncomeCategoryForm from "../components/AddIncomeCategoryForm"

function IncomeCategoryPage () {
    
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        const token = localStorage.getItem('access');
        fetch(`${import.meta.env.VITE_API_URL}/api/incomes/Categories/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      })
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error))
    }, [])

    const handleCategoryAdded = (newCategoryData) => {
        setCategories([...categories, newCategoryData])
    }

    return (
        <div>
            <div>
                <h2>Kategorie Przychodów</h2>
                <ul>
                    {categories.map((category, index) => (
                        <li key={category.id} className='list-item'>{index + 1}. {category.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <AddIncomeCategoryForm onAdd={handleCategoryAdded}/>
            </div>
        </div>
    )
}

export default IncomeCategoryPage