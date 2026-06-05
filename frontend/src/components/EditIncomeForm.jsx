import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditIncomeForm() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(1);
    const [value, setValue] = useState(1);
    const [date, setDate] = useState('');
    const [categories, setCategories] = useState([]);
    
    const today = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    const { id } = useParams();
    
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/incomes/Categories/")
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.log(error))
    }, [])


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/incomes/Incomes/${id}/`)
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
            fetch(`http://127.0.0.1:8000/api/incomes/Incomes/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
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

        <form onSubmit={handleSaveAndExit}>
            <label>Podaj Kategorię: </label>
                <select 
                    value={category}
                    onChange={(e) => setCategory(Number(e.target.value))}
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

            <button type = "submit" >Zapisz i wyjdź</button>
        </form>

    )
}

export default EditIncomeForm