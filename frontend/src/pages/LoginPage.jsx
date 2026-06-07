import { useState } from "react";
import { useNavigate, Link} from 'react-router-dom'
import { Form, Button, Card, Container} from 'react-bootstrap';

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        fetch(`${import.meta.env.VITE_API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(response => {
            if(!response.ok) {
                alert("Nieprawidłowy login lub hasło")
                throw new Error("Nieprawidłowy login lub hasło");
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);

            navigate('/');
        })
        .catch(error => console.error(error));
    }


    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title className="mb-3 fs-2">Zaloguj się</Card.Title>
                    <Form onSubmit={handleLogin}>
                        <Form.Group>
                            <Form.Label className="mb-2">Nazwa Użytkownika</Form.Label>
                            <Form.Control 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mb-2 shadow-sm"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mb-4 shadow-sm"
                            />
                           
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                                    Zaloguj się
                        </Button>
                        <Link to='/register' className="text-secondary text-decoration-none">Nie masz konta? Kliknij mnie i zarejestruj się</Link>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default LoginPage