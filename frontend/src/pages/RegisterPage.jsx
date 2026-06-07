import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate, Link} from 'react-router-dom';

function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if(password!==confirmPassword) {
            alert("Hasła nie są identyczne")
            setError("Podane hasła nie są identyczne")
            return;
        }

        const newUser = {
            "username": username,
            "password": password,
            "email": email,
            "phone_number": phoneNumber
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/account/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(JSON.stringify(err));
                });
            }
            return response.json();
        })
        .then(data => {
            alert("Pomyślnie zarejestrowano!");
            console.log("Dodano nowego użytkownika -> ", data);

            navigate('/login');
        })
        .catch(error => {
            console.error(error)
            setError("Nie udało się zarejestrować. Sprawdź dane.");
        })

    };

    return (
        <Container>
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title className="text-center">Zarestruj się!</Card.Title>
                    <Form onSubmit={handleRegister}>
                        <Form.Group>
                            <Form.Label><span className="text-danger">*</span>Podaj nazwę użytkownika: </Form.Label>
                            <Form.Control 
                                type="text"
                                value={username}
                                placeholder='np. "Jan123"'
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                className="mb-2 shadow-sm"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span className="text-danger">*</span>Podaj hasło: </Form.Label>
                            <Form.Control 
                                type="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className=" shadow-sm"
                            />
                            <Form.Text >- Hasło powinno mieć conajmniej 8 znaków w tym 1 wielka i 1 mała litera i 1 znak specjalny</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span className="text-danger">*</span>Powtórz hasło: </Form.Label>
                            <Form.Control 
                                type="password"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className=" shadow-sm"
                            />
                            <Form.Text >- Hasła muszą się zgadzać</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label><span className="text-danger">*</span>Podaj e-mail: </Form.Label>
                            <Form.Control 
                                type="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-2 shadow-sm"
                                placeholder="example@gmail.com"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Podaj numer telefonu: </Form.Label>
                            <Form.Control 
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="mb-2 shadow-sm"
                            />
                        </Form.Group>
                        <div className="mt-4">
                            <Button type="submit" className="mt-2 px-4">Zarejestruj się</Button>
                            <div className="mt-2">
                                <Link to="/login" className="text-secondary text-decoration-none">Masz już konto? Kliknij mnie i zaloguj się</Link>
                            </div>
                        </div>
                        
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default RegisterPage