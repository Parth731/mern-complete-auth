import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { unSetUserToken } from '../features/authSlice';
import { setUserInfo, unSetUserInfo } from '../features/userSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/UserAuthApi';
import ChangePassword from './auth/ChangePassword';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(token);
  const [userData, setUserData] = useState({
    email: '',
    name: '',
  });
  useEffect(() => {
    if (data && isSuccess) {
      const { user } = data;
      setUserData({
        email: user.email,
        name: user.name,
      });
    }
  }, [data, isSuccess]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && isSuccess) {
      const { user } = data;
      dispatch(
        setUserInfo({
          email: user.email,
          name: user.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  const handleLogout = () => {
    dispatch(unSetUserToken({ token: null }));
    dispatch(unSetUserInfo({ email: '', name: '' }));
    removeToken();
    navigate('/login');
  };
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Grid container>
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
          <h1>Dashboard</h1>
          <Typography variant='h5'>Email: {userData.email}</Typography>
          <Typography variant='h6'>Name: {userData.name}</Typography>
          <Button
            variant='contained'
            color='warning'
            size='large'
            onClick={handleLogout}
            sx={{ mt: 8 }}>
            Logout
          </Button>
        </Grid>
        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
