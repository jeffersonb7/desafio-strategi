import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";

const Header = () => {
  const history = useNavigate()

  return (
    <AppBar
    position="static"
    color="default"
    elevation={0}
    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
  >
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Imoveiz
      </Typography>
      <nav>
        <Button
          variant="button"
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
        >
          <Link to="/home">Imóveis</Link>
        </Button>
        <Button
          variant="button"
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
        >
          <Link to="/simulacao">Simulação</Link>
        </Button>
        <Button
          variant="button"
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
        >
          <Link to="/clientes">Clientes</Link>
        </Button>
        <Button
          variant="button"
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
        >          
          <Link to="/resumoVenda">Resumo de Venda</Link>
        </Button>
      </nav>
      <Button href="#" onClick={
        () => {
          logout()
          history('/')
        }
      } variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export default Header