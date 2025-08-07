import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import api from './api';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import Header from './components/ui/Header';
import StoragePage from './pages/StoragePage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

import { 
  setUser, 
  fetchCurrentUser  
} from './store/slices/authSlice';


/**
 * The main app component, which renders 
 * the app's header, routes, and handles
 * authentication-related redirects.
 *
 * @returns {React.ReactElement} The app component.
 */
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const abortControllerRef = useRef(null);

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    const token = localStorage.getItem('token');

    if (token && !isAuthenticated) {
      dispatch(fetchCurrentUser(signal));

      api.get('/auth/users/me/', { signal })
        .then(response => {
          dispatch(setUser(response.data));

          if (response.data.is_superuser) {
            navigate('/admin');
          } else {
            navigate('/storage');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    dispatch, 
    isAuthenticated, 
    navigate
  ]);

  return (
    <>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<HomePage />} 
        />

        <Route 
          path="/login" 
          element={<LoginPage />} 
        />

        <Route 
          path="/register" 
          element={<RegisterPage />} 
        />

        <Route 
          element={<ProtectedRoute 
        />}>
          <Route 
            path="/storage" 
            element={<StoragePage />} 
          />
        </Route>

        <Route 
          element={<ProtectedRoute adminOnly />}
        >
          <Route 
            path="/admin" 
            element={<AdminPage />} 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
