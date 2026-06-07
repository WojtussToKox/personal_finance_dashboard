import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

function EditIncomeForm() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState(1);
    const [date, setDate] = useState('');
    const [categories, setCategories] = useState([]);
    
    const today = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    const { id } = useParams();
    
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
        .catch(error => console.log(error))
    }, [])


    useEffect(() => {
        const token = localStorage.getItem('access');
        fetch(`${import.meta.env.VITE_API_URL}/api/incomes/Incomes/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
            setCategory(data.category)
            setTitle(data.title)
            setValue(data.value)
            setDate(data.date)
        })
    }, [id])
    

    const sendDataToServer = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');
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
            fetch(`${import.meta.env.VITE_API_URL}/api/incomes/Incomes/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newIncome),
            })
        )
    }

    

    const handleSaveAndExit = (e) => {
        if(window.confirm("Czy na pewno chcesz edytować ten przychód?")) {
            sendDataToServer(e)
            .then(response => response.json())
            .then(data => navigate('/incomes'))
            .catch(error => console.log(error))
        }
    }

    return (
        <Card bg="light" className="shadow-sm mt-4">
            <Card.Body>
                <Card.Title className="text-center mb-4">Zmień Dane</Card.Title>
                <Form onSubmit={handleSaveAndExit}>
                    <Form.Group className='mb-2' controlId='formCategory'>
                        <Form.Label>Podaj Kategorię: </Form.Label>
                        <Form.Select 
                            value={category}
                            onChange={(e) => setCategory(Number(e.target.value))}
                            required
                            className='shadow-sm'
                        >
                            <option value="" disabled>Wybierz kategorię...</option>
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
                            placeholder='np. Wypłata za maj'
                            className='shadow-sm'
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
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
                    </Form.Group>

                    <Form.Group className='mb-3'>
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

                    <Button type="submit" >Zapisz i wyjdź</Button>
                    <Button className='ms-2' type="button" as ={Link} to={`/incomes/`}>Wróć bez zapisywania</Button>
                </Form>
            </Card.Body>
        </Card>            
    )
}

export default EditIncomeForm