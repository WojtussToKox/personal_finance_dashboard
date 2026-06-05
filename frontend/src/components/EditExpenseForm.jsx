
import { useState, useEffect } from 'react';
import { Card, Form, Button} from 'react-bootstrap';
import { useNavigate, useParams} from 'react-router-dom';

function EditExpenseForm () {
    
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(1.00);
    const [count, setCount] = useState(1);
    const [category, setCategory] = useState('');
    
    const [date, setDate] = useState('');
    const today = new Date().toISOString().split('T')[0];


    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/expenses/categories/')
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error("Coś poszło nie tak -> ", error))
    }, [])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/expenses/expenses/${id}/`)
        .then(response => response.json())
        .then(data => {
            setCategory(data.category)
            setTitle(data.title)
            setPrice(data.price)
            setCount(data.count)
            setDate(data.date)
        })
        .catch(error => console.error("Błąd przy pobieraniu danych -> ", error))
    }, [id])


    const sendDataToServer = (e) => {
        e.preventDefault();

        if((price < 0.01) || count < 1) {
            alert("Podano niewłaśiwe dane");
            return Promise.reject("Błąd walidacji");
        }

        const newIncome = {
            "title": title,
            "price": price,
            "count": count,
            "date": date,
            "category": category,
        }

        return(
            fetch(`http://127.0.0.1:8000/api/expenses/expenses/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newIncome),
            })
        )
    }


    const handleSaveAndExit = (e) => {
        if(window.confirm("Czy na pewno chcesz edytować ten wydatek?")) {
            sendDataToServer(e)
            .then(response => response.json())
            .then(data => navigate('/expenses'))
            .catch(error => console.log(error))
        }
    }

    return (
        <Card bg="light" className='shadow-sm mt-4 '>
            <Card.Body>
                <Card.Title className='text-center mb-4'>Zmień Dane</Card.Title>
                <Form onSubmit={handleSaveAndExit}>
                    <Form.Group className='mb-2' controlId='formCategory'>
                        <Form.Label>Podaj Kategorię: </Form.Label>
                        <Form.Select 
                            value={category}
                            onChange={(e) => setCategory(Number(e.target.value))}
                            required
                            className='shadow-sm'
                        >
                            <option value="" disabled> Wybierz Kategorie... </option>
                        {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className='mb-2'>
                        <Form.Label>Podaj tytuł: </Form.Label>
                        <Form.Control
                            type="text" 
                            value={title}
                            maxLength="50"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder='np. Kebab na mieście'
                            className='shadow-sm'
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <Form.Label>Podaj cenę: </Form.Label>
                        <Form.Control 
                            type="number"
                            value={price}
                            min="0.01"
                            step="0.01"
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                            className='shadow-sm'
                        />
                    </Form.Group>         
                    
                    <Form.Group className='mb-2'>
                        <Form.Label>Podaj ilość: </Form.Label>
                        <Form.Control 
                            type="number"
                            value={count}
                            min="1"
                            step="1"
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                            className='shadow-sm'
                        />
                    </Form.Group>   
                    
                    <Form.Group className='mb-3'>
                        <Form.Label>Podaj datę: </Form.Label>
                        <Form.Control 
                            type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        max={today}
                        required
                            className='shadow-sm'
                        />
                    </Form.Group>   
                    

                    <Button type = 'submit'>Zapisz i wyjdź</Button>

                </Form>
            </Card.Body>
        </Card>
    )
}

export default EditExpenseForm