import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";

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
        <Link
          variant="button"
          color="text.primary"
          href="/home"
          sx={{ my: 1, mx: 1.5 }}
        >
          Imoveis
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="/simulacao"
          sx={{ my: 1, mx: 1.5 }}
        >
          Simulações
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="/clientes"
          sx={{ my: 1, mx: 1.5 }}
        >
          Clientes
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="/resumoVenda"
          sx={{ my: 1, mx: 1.5 }}
        >
          Resumo de Venda
        </Link>
      </nav>
      <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
)

export default Header