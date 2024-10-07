import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from '../../../axios'
import './Header.scss';

function Header() {
  const navigate = useNavigate();
  const { name, isAuthenticated } = useSelector((state) => state.auth_user);

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
      window.location.href = '/'
    } catch (e) {
      console.log('logout not working', e)
    }
  }

  return (
    <Navbar expand="lg" className="MainNavBar">
            <Nav.Link onClick={() => navigate('/')} className='HomeSpan'>Home</Nav.Link>
            <span className="Divider"> | </span>
            {isAuthenticated ? <Nav.Link onClick={() => navigate('/profile')} className='ProfileSpan'>Profile</Nav.Link> : ''}
          <span className="UserName">{name}</span>
    
            {isAuthenticated ? (
              <span onClick={() => logout()} className="LoginSpan">
                Logout
              </span>
            ) : (
              <span onClick={() => navigate('/login')} className="LoginSpan">
                Login
              </span>
            )}
    </Navbar>
  );
}

export default Header;
