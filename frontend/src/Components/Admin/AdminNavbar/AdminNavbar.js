import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '../../../axios'
import './AdminNavbar.css'


function BasicExample() {
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.auth_user);

  const logout = async () => {
    const refresh_token = JSON.parse(localStorage.getItem('refresh'))
    const token = JSON.parse(localStorage.getItem('access'))

    try {
      console.log(token)
      const res = await axios.post('logout/', { refresh_token: refresh_token }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(res.status)
      localStorage.clear();
      axios.defaults.headers.common['Authorization'] = null;
      window.location.href = '/admin'
    } catch (e) {
      console.log('logout not working', e)
    }
  }


  return (
    <>
      <Navbar expand="lg" className="header">
        <Container>
          <Navbar.Brand href="#home">{name}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/admin/home')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('/admin/create_user')}>Create User</Nav.Link>
            </Nav>
            <Button onClick={()=> logout()} className='adminlogout'>logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default BasicExample;