import { Alert, Box, Button, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import api  from '../../services/api'
import { login } from '../../services/auth'
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import UserContext from "../../contexts/User";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)
  const [toast, setToast] = useState(false)

  const realizarLogin = async (event) => {
    event.preventDefault()
    
    const nome = event.target[0].value
    const senha = event.target[2].value

    if (nome && senha) {
      try {
        const response = await api.post("/login", { nome, senha });
        login(response.data.token)
        setUser(response.data.dadosDoUsuario)
        
        navigate('/home')
      } catch (err) {
        setToast("Username or senha inválida")
      }
    }
  }

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
    <Paper>
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

    {
      toast && 

      <Box maxWidth="lg" sx={{ width: '100%', position: 'fixed', bottom: 10 }} display='flex' justifyContent='left'>
        <Alert variant="filled" severity="error">
          {toast}
        </Alert>
    </Box>
    }


    </Box>
  )
}
export default Login;