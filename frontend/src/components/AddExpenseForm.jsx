import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        fetch('http://127.0.0.1:8000/api/expenses/categories/')
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error("Coś poszło nie tak -> ", error))
    }, [])


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
            fetch('http://127.0.0.1:8000/api/expenses/expenses/', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newIncome),
            })
        )
    }

    const handleSubmit = (e) => {
        sendDataToserver(e)
        .then(response => response.json())
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
        .then(response => response.json())
        .then(data => navigate('/expenses'))
        .catch(error => console.log(error))
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>Podaj Kategorie:</label>
            <select 
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))} 
                required 
            >
                <option value="" disabled> Wybierz Kategorie... </option>
                {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
            </select>
            <br />

            <label>Podaj tytuł: </label>
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength='50'
                placeholder='np. "Kebab na mieście"'
                required
            />
            <br />

            
            <label>Podaj cenę: </label>
            <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min='0.01'
                step='0.01'
                required
            />
            <br />
            
            <label>Podaj ilość: </label>
            <input 
                type="number" 
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min='1'
                step='1'
                required
            />
            <br />
            
            <label>Podaj date: </label>
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={today}
                required
            />
            <br />

            <button type = 'submit'>Zapisz</button>
            <button type = 'button' onClick = {handleSaveAndExit}>Zapisz i wyjdź</button>

        </form>
    )
}

export default AddExpenseForm