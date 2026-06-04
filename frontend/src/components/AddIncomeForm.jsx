import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddIncomeForm() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(1);
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
            }))
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

        <form onSubmit={handleSubmit}>
            <label>Podaj Kategorię: </label>
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Wybierz kategorię...</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            <br/>

            <label>Podaj tytuł: </label>
            <input 
                type="text" 
                value={title}
                maxLength="50"
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder='np. Wypłata za maj'
            />
            <br/>

            <label>Podaj wartość: </label>
            <input 
                type="number"
                value={value}
                min="0.01"
                step="0.01"
                onChange={(e) => setValue(Number(e.target.value))}
                required
            />
            <br/>

            <label>Podaj datę: </label>
            <input 
                type="date" 
                value={date}
                max={today}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <br/>

            <button type = "submit">Zapisz</button>
            <button type = "button" onClick={handleSaveAndExit}>Zapisz i wyjdź</button>
        </form>

    )
}

export default AddIncomeForm