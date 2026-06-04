import { useEffect, useState } from "react"
import AddIncomeCategoryForm from "../components/AddIncomeCategoryForm"

function IncomeCategoryPage () {
    
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/incomes/Categories/')
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