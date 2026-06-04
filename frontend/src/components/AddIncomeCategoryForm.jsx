import { useState } from "react"

function AddIncomeCategoryForm({onAdd}) {

    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const newIncome = {
            "name": name,
        }

        fetch('http://127.0.0.1:8000/api/incomes/Categories/', {
            method: "POST",
            body: JSON.stringify(newIncome),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(data => {
                setName('')
                alert("Pomyślnie dodano nową kategorię")
                console.log("Dodano -> ", data)
                if(onAdd) {
                    onAdd(data)
                }
            })
            .catch(error => console.error(error))

    }

    return (
        <>
            <h2>Dodaj nową kategorię przychodu</h2>
            <form onSubmit={handleSubmit}>
                <label>Nazwa Kategorii</label>
                <input 
                    type="text" 
                    value={name}
                    maxLength='50'
                    placeholder='np. "Wypłata"'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />

                <button type="submit">Zapisz</button>
            </form>
        </>
    )
}

export default AddIncomeCategoryForm