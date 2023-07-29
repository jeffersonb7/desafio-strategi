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
import { CardMedia, Divider, Fab, FormGroup, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import api from '../../services/api'
import { useEffect, useState } from 'react';
import { NavigateNextRounded } from '@mui/icons-material';

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

const ResumoVenda = ({ imovelSelecionado, setImovelSelecionado, clienteSelecionado, setClienteSelecionado }) => {
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
        setCpfCliente(cliente.cpf)
        setEmailCliente(cliente.email)
        setTelefoneCliente(cliente.telefone)

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
            const clientesFiltrados = clientes.filter((cliente) => cliente.nome.toUpperCase().includes(filtroNome.toUpperCase()))
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
                Cliente
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">CPF</TableCell>
                                <TableCell align="right">Telefone</TableCell>
                                <TableCell align="right">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                key={clienteSelecionado.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {clienteSelecionado.nome}
                                </TableCell>
                                <TableCell align="right">{clienteSelecionado.nome}</TableCell>
                                <TableCell align="right">{clienteSelecionado.cpf}</TableCell>
                                <TableCell align="right">{clienteSelecionado.telefone}</TableCell>
                                <TableCell align="right">{clienteSelecionado.email}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                Dados do imóvel
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo</TableCell>
                                <TableCell align="right">Endereço</TableCell>
                                <TableCell align="right">Valor de Venda</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                key={imovelSelecionado.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {imovelSelecionado.tipo}
                                </TableCell>
                                <TableCell align="right">{imovelSelecionado.endereco}</TableCell>
                                <TableCell align="right">{imovelSelecionado.valor_de_venda}</TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
}

export default ResumoVenda