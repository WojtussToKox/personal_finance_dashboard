import { Card, Row, Col, Container } from 'react-bootstrap';
import DashboardSummary from '../components/DashboardSummary';
import DashboardCharts from '../components/DashboardCharts';

function Dashboard() {

  
  return (
    <Container>
        <DashboardSummary />
        <DashboardCharts />
    </Container>
  )
}

export default Dashboard