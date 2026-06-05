import { useState } from "react"
import { Card, Form, Button } from "react-bootstrap"

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
            <Card bg="light" className="mb-4">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fs-4">Nazwa Kategorii: </Form.Label>
                            <Form.Control 
                                type="text"
                                value={name}
                                maxLength="50"
                                required
                                placeholder='np. "Elektronika"'
                                onChange={(e) => setName(e.target.value)}
                                className="shadow"
                            />
                        </Form.Group>

                        <Button type="submit">Dodaj</Button>
                    </Form>

                </Card.Body>
            </Card>
        </>
    )
}

export default AddExpenseCategoryForm