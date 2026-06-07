import { Container, Row, Col} from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchWithAuth } from "../utils/api";
import { useState, useEffect } from 'react'

function DashboardCharts() {

    const [expenseData, setExpenseData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);

    useEffect(()=> {
        fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/incomes/summary/`)
            .then(response => response.json())
            .then(data => setIncomeData(data))
            .catch(error => console.error(error));
        
        fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/expenses/summary/`)
            .then(response => response.json())
            .then(data => setExpenseData(data))
            .catch(error => console.error(error));
    }, [])


    const INCOME_COLORS = ['#00fe6a', '#00C49F', '#3aff28', '#00ff6a', '#00ffb3'];
    const EXPENSE_COLORS = ['#fe0800', '#c43e00', '#ff2828', '#d32c03', '#f71b0c'];

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Wykres przedstawiający rozkład przychodów i wydatków</h2>
            <Row>
                <Col xs={12} md={6}>
                    <h4 className="text-center">Przychody</h4>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={incomeData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {incomeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col xs={12} md={6}>
                    <h4 className="text-center">Wydatki</h4>
                    <ResponsiveContainer  width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={expenseData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default DashboardCharts