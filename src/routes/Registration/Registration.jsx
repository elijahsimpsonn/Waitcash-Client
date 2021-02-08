import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import {Link} from 'react-router-dom'
import './Registration.css'

const RegistrationPage = (props) => {
  const handleRegSuccess = (user) => {
    
    const { history } = props;
    history.push('/login');
  };

  return (
    <div className="reg">
      <h2>Register</h2>
      <RegistrationForm onRegSuccess={handleRegSuccess} />
      <p><Link to="/login">Have an account? Login Here!</Link></p>
      <p><Link to='/'>Want to head back to the Landing Page?</Link></p>

    </div>
  );
};

export default RegistrationPage;