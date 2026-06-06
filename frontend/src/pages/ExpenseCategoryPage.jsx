import { useEffect, useState } from "react"
import AddExpenseCategoryForm from "../components/AddExpenseCategoryForm"

function ExpenseCategoryPage() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/expenses/categories/`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error))
    }, [])

    const handleCategoryAdded = (newCategoryData) => {
        setCategories([...categories, newCategoryData])
    }

    return (
        <div className="page-container">
            <div>
                <h2>Kategorie Wydatków</h2>
                <ul>
                    {categories.map((category, index) => (
                        <li key={category.id} className="list-item">{index + 1}. {category.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <AddExpenseCategoryForm onAdd={handleCategoryAdded}/>
            </div>
        </div>
    )
}

export default ExpenseCategoryPage