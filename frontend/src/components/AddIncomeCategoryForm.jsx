import { useState } from "react"

import { Form, Button, Card } from 'react-bootstrap';

function AddIncomeCategoryForm({onAdd}) {

    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const newIncome = {
            "name": name,
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/incomes/Categories/`, {
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
            <Card bg="light" className="mb-4">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fs-5">Nazwa Kategorii</Form.Label>
                            <Form.Control
                                type="text" 
                                value={name}
                                maxLength='50'
                                placeholder='np. "Wypłata"'
                                onChange={(e) => setName(e.target.value)}
                                required
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

export default AddIncomeCategoryForm