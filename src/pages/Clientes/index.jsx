import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { CardMedia, Divider, Fab, FormGroup, Modal, TextField } from '@mui/material';
import api from '../../services/api'
import { useEffect, useState } from 'react';
import { NavigateNextRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Clientes = ({ imovelSelecionado, setImovelSelecionado, clienteSelecionado, setClienteSelecionado }) => {
  const [clientes, setClientes] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEditar, setOpenEditar] = useState(false);
  
  const [id, setId] = useState('')
  const [nomeCliente, setNomeCliente] = useState('')
  const [emailCliente, setEmailCliente] = useState('')
  const [telefoneCliente, setTelefoneCliente] = useState('')
  const [cpfCliente, setCpfCliente] = useState('')

  const handleOpenEditar = (id) => {
    const cliente = clientes.find((element) => element.id == id)

    setId(cliente.id)
    setNomeCliente(cliente.nome)
    setCpfCliente( cliente.cpf)
    setEmailCliente( cliente.email)
    setTelefoneCliente( cliente.telefone)

    setOpenEditar(true);
  }
  
  const handleCloseEditar = () => setOpenEditar(false);

  useEffect(() => {
    getAllClientes()
  }, [])

  const getAllClientes = () => {
    api.get('/clientes').then(
      (response) => {
        const allClientes = response.data.success
        console.log(allClientes)
        setClientes(allClientes)
      }
    ).catch(error => console.error('Error'))
  }

  const deleteCliente = (id) => {
    api.delete(`/clientes/${id}`)
    getAllClientes()
  }

  async function handleCadastroCliente(event) {
    event.preventDefault()
    
    const dados = {
      nome: event.target[0].value,
      cpf: event.target[2].value,
      email: event.target[4].value,
      telefone: event.target[6].value,
    }

    cadastrarCliente(dados)

    getAllClientes()
    handleClose()
  }

  const cadastrarCliente = async (dados) => {
    const response = await api.post('/cliente-cadastro/', dados);
    console.log(response)
  }

  async function handleEditarCliente(event) {
    event.preventDefault()
    
    const dados = {
      id: id,
      nome: nomeCliente,
      cpf: cpfCliente,
      email: emailCliente,
      telefone: telefoneCliente,
    }

    atualizarCliente(dados)
  }

  const atualizarCliente = async (dados) => {
    await api.put('/cliente-edicao/', dados);
    handleCloseEditar()
    getAllClientes()
  }

  const handleOnChangeInput = (element, set) => {
    console.log(element.target.value)
    set(element.target.value)
  }  

  const handleFiltro = (event) => {
    const filtroNome = event.target.value
    console.log(filtroNome)
    if (filtroNome) {
      const clientesFiltrados =  clientes.filter((cliente) => cliente.nome.toUpperCase().includes(filtroNome.toUpperCase()))
      setClientes(clientesFiltrados)
      return;
    } 
    getAllClientes()
  }

  const selecionarCliente = (id) => {
    if (clienteSelecionado.id == id) {
        setClienteSelecionado({})    
    } else {
        const cliente = clientes.find((cliente) => cliente.id == id)
        setClienteSelecionado(cliente)
    }
    console.log(clienteSelecionado)
}
const history = useNavigate()

    const nextStep = () => {
      history('/resumoVenda', { imovelSelecionado, setImovelSelecionado, clienteSelecionado, setClienteSelecionado });
    }
  return (
    <Box
    >
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
              href="#"
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
              href="#"
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
      <Container maxWidth="md" component="main"
        sx={{ mb: 10, mt: 10 }}
      >

        <Typography variant='h5'>
          Imovel Selecionado: 
          Tipo: {imovelSelecionado.tipo}
          Endereco: {imovelSelecionado.endereco}
        </Typography>
        <FormGroup container spacing={0}>
          <TextField id="outlined-basic" onChange={handleFiltro} label="Procurar um nome..." variant="outlined" />
          <Button onClick={handleOpen}>Cadastrar um cliente</Button>
        </FormGroup>
        <Grid container spacing={5} alignItems="flex-end">
          {clientes.map((cliente) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={cliente.id}
              xs={12}
              sm={6}
              md={4}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={cliente.url_da_foto}
                  title={`Imagem de ${cliente.tipo}`}
                />
                <CardContent
                  sx={{ minHeight: "180px" }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {cliente.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CPF: {cliente.cpf}
                  </Typography>
                  <Divider light />
                  <Typography variant="body2" color="text.secondary">
                    Email: {cliente.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Telefone: {cliente.telefone}
                  </Typography>
                  <Divider light />
                  <Typography variant="body2" color="text.secondary">
                    Data de Cadastro: {new Date(cliente.data_de_cadastro).toISOString().split('T')[0]}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="medium" onClick={() => {selecionarCliente(cliente.id)}}>Selecionar o cliente</Button>

                </CardActions>
                <CardActions>
                  <Button size="small" onClick={() => {handleOpenEditar(cliente.id)}}>Editar</Button>
                  <Button size="small" onClick={() => {deleteCliente(cliente.id)}} variant="outlined" color="error">Excluir</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Cadastro de clientes
            </Typography>
            <Box method='post' component="form" onSubmit={handleCadastroCliente} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                autoComplete="nome"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="cpf"
                label="CPF"
                id="cpf"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="current-password"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="telefone"
                label="Telefone"
                id="telefone"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Editar de cliente
            </Typography>
            <Box method='post' component="form" onSubmit={handleEditarCliente} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                autoComplete="nome"
                autoFocus
                onChange={() => handleOnChangeInput(event, setNomeCliente)}
                value={nomeCliente}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="cpf"
                label="CPF"
                id="cpf"
                autoComplete="current-password"
                onChange={() => handleOnChangeInput(event, setCpfCliente)}
                value={cpfCliente}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                onChange={() => handleOnChangeInput(event, setEmailCliente)}
                value={emailCliente}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="telefone"
                label="Telefone"
                id="telefone"
                onChange={() => handleOnChangeInput(event, setTelefoneCliente)}
                value={telefoneCliente}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

            {
                !(Object.keys(clienteSelecionado).length === 0) ?
            (
                <Box onClick={() => nextStep()} container fullWidth maxWidth="lg" sx={{ width:'100%', position: 'fixed', bottom: 10}} display='flex' justifyContent='right'>
                <Fab color="primary" aria-label="add">
                    <NavigateNextRounded />
                </Fab>
                </Box>
        ) : ''}
    </Box>
  );
}

export default Clientes