import { Box, Button, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import api  from '../../services/api'
import { login } from '../../services/auth'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const realizarLogin = async (event) => {
    event.preventDefault()
    
    const nome = event.target[0].value
    const senha = event.target[2].value

    if (nome && senha) {
      try {
        const response = await api.post("/login", { nome, senha });
        login(response.data.token)

        navigate('/home')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Paper
      maxWidth="500"
    >
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 10,
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box method='post' component="form" onSubmit={realizarLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {/*
          <FormControlLabel
            control={
             <Checkbox value="remember" color="primary" />
          }

          
            label="Remember me"
          />
          */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
export default Login;