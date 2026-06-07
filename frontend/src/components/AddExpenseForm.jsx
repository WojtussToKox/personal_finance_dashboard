import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap'

function AddExpenseForm () {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(1.00);
    const [count, setCount] = useState(1);
    const [category, setCategory] = useState('');
    
    const [date, setDate] = useState('');
    const today = new Date().toISOString().split('T')[0];


    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access');
        fetch(`${import.meta.env.VITE_API_URL}/api/expenses/categories/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error("Coś poszło nie tak -> ", error))
    }, [])


    const sendDataToServer = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');

        if (!title || !category || !date) {
        alert("Wypełnij wszystkie wymagane pola (Tytuł, Kategoria, Data)!");
        return Promise.reject("Brak wymaganych danych");
        }

        if((price < 0.01) || count < 1) {
            alert("Podano niewłaśiwe dane");
            return Promise.reject("Błąd walidacji");
        }

        const newExpense = {
            "title": title,
            "price": price,
            "count": count,
            "date": date,
            "category": category,
        }

        return(
            fetch(`${import.meta.env.VITE_API_URL}/api/expenses/expenses/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newExpense),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(JSON.stringify(err));
                    });
                }
               
                return response.json();
            })
        )
    }

    const handleSubmit = (e) => {
        sendDataToServer(e)
        .then(data => {
            setCategory('')
            setTitle('')
            setPrice(1.00)
            setCount(1)
            setDate('')
            alert("Pomyślnie dodano nowy wydatek")
            console.log("Pomyślnie dodano -> ", data)
        })
        .catch(error => console.error(error))
    }

    const handleSaveAndExit = (e) => {
        sendDataToServer(e)
        .then(data => navigate('/expenses'))
        .catch(error => console.log(error))
    }
    
    return (
        <Card bg="light" className="shadow-sm mt-4">
            <Card.Body>
                <Card.Title className="text-center mb-4">Dodaj Wydatek</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='formCategory'>
                        <Form.Label>Podaj Kategorie:</Form.Label>
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
                    
                    <Form.Group className='mb-3' controlId='formCategory'>
                        <Form.Label>Podaj tytuł: </Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength='50'
                            placeholder='np. "Kebab na mieście"'
                            required
                            className='shadow-sm'
                        />
                    </Form.Group>

                
                     

                    <Form.Group className='mb-3' controlId='formCategory'>
                        <Form.Label>Podaj cenę: </Form.Label>
                        <Form.Control 
                            type="number" 
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            min='0.01'
                            step='0.01'
                            required
                            className='shadow-sm'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formCategory'>
                        <Form.Label>Podaj ilość: </Form.Label>
                        <Form.Control 
                            type="number" 
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            min='1'
                            step='1'
                            required
                            className='shadow-sm'
                        />
                    </Form.Group>  

                    <Form.Group className='mb-3' controlId='formCategory'>
                        <Form.Label>Podaj date: </Form.Label>
                        <Form.Control 
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            max={today}
                            required
                            className='shadow-sm'
                        />
                    </Form.Group>

                    <Button type = 'submit'>Zapisz</Button>
                    <Button className='ms-1' type = 'button' onClick = {handleSaveAndExit}>Zapisz i wyjdź</Button>

                </Form>
            </Card.Body>
        </Card>
        
    )
}

export default AddExpenseForm