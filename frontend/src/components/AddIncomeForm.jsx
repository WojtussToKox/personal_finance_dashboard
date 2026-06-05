import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

function AddIncomeForm() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState(1);
    const [date, setDate] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/incomes/Categories/")
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.log(error))
    }, [])

    const today = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    const sendDataToServer = (e) => {
        e.preventDefault();
        
        if ((value < 0.01) || (category < 1)) {
            alert("Podano nieprawidłowe dane!");
            return Promise.reject("Błąd walidacji");
        }


        const newIncome = {
            "category": category,
            "title": title,
            "value": value,
            "date": date,
        };

        return(
            fetch('http://127.0.0.1:8000/api/incomes/Incomes/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newIncome),
            })
        )
    }

    const handleSubmit = (e) => {
        sendDataToServer(e)
        .then(response => response.json())
        .then(data => {
            setCategory(1)
            setTitle('')
            setValue(1)
            setDate('')
            alert("Pomyślnie dodano nowy przychód")
            console.log("Pomyślnie dodano -> ", data)
        })
        .catch(error => console.log(error))
    }

    const handleSaveAndExit = (e) => {
        sendDataToServer(e)
        .then(response => response.json())
        .then(data => navigate('/incomes'))
        .catch(error => console.log(error))
    }

    return (
        <Card bg="light" className="shadow-sm mt-4">
            <Card.Body>
                <Card.Title className="text-center mb-4">Dodaj Przychód</Card.Title>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className='mb-3' controlId='formCategory'>
                        <Form.Label >Podaj Kategorię: </Form.Label>
                        <Form.Select 
                            value={category}
                            onChange={(e) => setCategory(Number(e.target.value))}
                            required
                            className='shadow-sm'
                        >
                            <option value="" disabled>Wybierz kategorię</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formTitle'> 
                        <Form.Label>Podaj tytuł: </Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title}
                            maxLength="50"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder='np. Wypłata za maj'
                            className='shadow-sm'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formValue'> 
                        <Form.Label>Podaj wartość: </Form.Label>
                        <Form.Control 
                            type="number"
                            value={value}
                            min="0.01"
                            step="0.01"
                            onChange={(e) => setValue(Number(e.target.value))}
                            required
                            className='shadow-sm'
                        />
                        <Form.Text>Wartość przychodu musi być więszka od 0.</Form.Text>
                    </Form.Group>
                    
                    <Form.Group className='mb-3' controlId='formDate'> 
                        <Form.Label>Podaj datę: </Form.Label>
                        <Form.Control 
                            type="date" 
                            value={date}
                            max={today}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className='shadow-sm'
                        />
                    </Form.Group>

                    <Button type = "submit" className='me-1'>Zapisz</Button>
                    <Button type = "button"  onClick={handleSaveAndExit}>Zapisz i wyjdź</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddIncomeForm