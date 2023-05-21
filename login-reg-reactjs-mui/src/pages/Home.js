import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const Home = () => {
  const myData = useSelector((state) => state.userInfo);
  console.log(myData);
  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item sm={10}>
          <h1>Home Page</h1>
          <hr />
          <p>
            {myData.email} {myData.name}
          </p>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
