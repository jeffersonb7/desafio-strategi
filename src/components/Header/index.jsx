import { AppBar, Button, Toolbar, Typography, Link as LinkButton } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => (
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
        <LinkButton
          variant="button"
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
        >
          <Link to="/home">Imóveis</Link>
        </LinkButton>
        <LinkButton
          variant="button"
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
        >
          <Link to="/simulacao">Simulação</Link>
        </LinkButton>
        <LinkButton
          variant="button"
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
        >
          <Link to="/clientes">Clientes</Link>
        </LinkButton>
        <LinkButton
          variant="button"
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
        >          
          <Link to="/resumoVenda">Resumo de Venda</Link>
        </LinkButton>
      </nav>
      <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
)

export default Header