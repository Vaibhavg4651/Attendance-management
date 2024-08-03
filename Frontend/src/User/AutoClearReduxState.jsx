import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const AutoClearReduxState = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Logout = useCallback(() => {
      dispatch(logout());
      navigate('/');
    }, [dispatch, navigate]);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        Logout();
      }, 5 * 60 * 1000); // 60 minutes
  
      return () => clearTimeout(timer);
    }, [dispatch]);
  
    return null;
  };

  export default AutoClearReduxState;