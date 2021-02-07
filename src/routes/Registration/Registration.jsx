import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import {Link} from 'react-router-dom'

const RegistrationPage = (props) => {
  const handleRegSuccess = (user) => {
    
    const { history } = props;
    history.push('/login');
  };

  return (
    <>
      <h2>Register</h2>
      <RegistrationForm onRegSuccess={handleRegSuccess} />
      
      <Link to="/login">Have an account? Login Here!</Link>
    </>
  );
};

export default RegistrationPage;