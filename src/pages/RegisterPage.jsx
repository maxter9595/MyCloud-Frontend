import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { register } from '../store/slices/authSlice';
import Notification from '../components/ui/Notification';
import RegisterForm from '../components/auth/RegisterForm';


/**
 * RegisterPage component renders the registration 
 * page for the application. It utilizes the Notification 
 * and RegisterForm components. The RegisterForm is connected 
 * to handleSubmit to dispatch register actions. The user is 
 * redirected to the storage page after a successful registration.
 * 
 * @returns {JSX.Element} The rendered registration page component.
 */
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await dispatch(
        register(values)
      ).unwrap();

      navigate('/storage');

    } catch (err) {
      console.error(
        'Registration failed:', 
        err
      );
    }
  };

  return (
    <div className="auth-page">
      <h1>Регистрация</h1>
      <Notification />
      <RegisterForm 
        onSubmit={handleSubmit} 
      />
      <p 
        style={{ 
          textAlign: 'center', 
          marginTop: '1rem' 
        }}>
        Уже есть аккаунт? <Link to="/login">Войдите</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
