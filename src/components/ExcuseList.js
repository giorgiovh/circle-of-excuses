import ImgMediaCard from './ImgMediaCard';
import { Grid } from '@mui/material';
import './ExcuseList.css';

export default function ExcuseList({ uid, excuses }) {
  if (excuses.length === 0) {
    return <div>No excuses to load...</div>;
  }

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ margin: '0 auto' }}>
      {excuses.map(excuse => (
        <Grid item xs={12} sm={6} md={4} key={excuse.id}>
          <ImgMediaCard excuse={excuse} />
        </Grid>
      ))}
    </Grid>
  );
}