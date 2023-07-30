import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import api from '../../services/api'
import Header from '../../components/Header';

const ResumoVenda = ({ imovelSelecionado, setImovelSelecionado, clienteSelecionado, setClienteSelecionado }) => {

    async function handleCadastroVenda() {
        event.preventDefault()
        console.log(imovelSelecionado, clienteSelecionado)
        const dados = {
            "id_imovel": imovelSelecionado.id,
            "valor": imovelSelecionado.valor_de_venda,
            "condicaoDePagamento": "a fazer",
            "nomeCliente": clienteSelecionado.nome,
            "email": clienteSelecionado.email,
            "comissao": 98
        }

        console.log(dados)
    
        cadastrarVenda(dados)
      }
    
      const cadastrarVenda = async (dados) => {
        const response = await api.post('/vendas-cadastro/', dados);
        console.log(response)
      }

    return (
        <Box
        >
            <Header />

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

                <Box component="container">
                    <Button onClick={() => handleCadastroVenda()}>Cadastrar Venda</Button>
                </Box>
            </Container>
        </Box>
    );
}

export default ResumoVenda