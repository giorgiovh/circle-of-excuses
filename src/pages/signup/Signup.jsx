import { useState } from 'react'

// hooks
import { useLoginWithGoogle } from '../../hooks/useLoginWithGoogle';

// mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignup } from '../../hooks/useSignup';

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const { error, isPending, signup } = useSignup()

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, displayName);
  }

  const { loginWithGoogle } = useLoginWithGoogle()

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="displayname"
                  label="Display Name"
                  name="displayname"
                  type="text"
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </Grid>
            </Grid>
            {!isPending && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  backgroundColor: '#048c04', 
                  '&:hover': {
                    backgroundColor: '#036b03'
                  }
                }}
              >
                Sign Up
              </Button>
            )}
            {isPending && (
              <Button
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  backgroundColor: '#048c04', 
                  '&:hover': {
                    backgroundColor: '#036b03'
                  }
                }}
                disabled
              >
                loading
              </Button>
            )}
            {error && <p>{error}</p>}
          </Box>
          <div style={{"textAlign":"center"}}>OR</div>
          <Button
            onClick={loginWithGoogle}
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2, 
              backgroundColor: '#048c04', 
              '&:hover': {
                backgroundColor: '#036b03'
              }
            }}
          >
            Sign Up with Google
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}