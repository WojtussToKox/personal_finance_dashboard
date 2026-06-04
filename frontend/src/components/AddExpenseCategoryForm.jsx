import { useState } from "react"

function AddExpenseCategoryForm({onAdd}) {

    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const newCategory = {
            "name": name
        }

        fetch('http://127.0.0.1:8000/api/expenses/categories/', {
            method: "POST",
            body: JSON.stringify(newCategory),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(data => {
                setName('')
                alert("Pomyślnie dodano nową kategorię")
                console.log("Pomyślnie dodano -> ", data)
                if(onAdd) {
                    onAdd(data)
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            <h2>Dodaj Nowa Kategorie Wydatku</h2>
            <form onSubmit={handleSubmit}>
                <label>Nazwa Kategorii: </label>
                <input 
                    type="text"
                    value={name}
                    maxLength="50"
                    required
                    placeholder='np. "Elektronika"'
                    onChange={(e) => setName(e.target.value)}
                />
                <br />

                <button type = "submit">Dodaj</button>
            </form>
        </>
    )
}

export default AddExpenseCategoryForm