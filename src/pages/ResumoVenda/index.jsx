import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import api from '../../services/api'
import Header from '../../components/Header';
import { useContext, useState } from 'react';
import ImovelContext from '../../contexts/Imovel';
import UserContext from '../../contexts/User';

const ResumoVenda = () => {
  const { pagamentoSelecionado, imovelSelecionado, clienteSelecionado } = useContext(ImovelContext)
  const { user } = useContext(UserContext)

  const [toast, setTotast] = useState(false)

  async function handleCadastroVenda() {
    event.preventDefault()
    const dados = {

      "id_imovel": imovelSelecionado.id,
      "valor": imovelSelecionado.valor_de_venda,
      "condicaoDePagamento": pagamentoSelecionado,
      "nomeCliente": clienteSelecionado.nome,
      "email": clienteSelecionado.email,
      "comissao": new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(imovelSelecionado.valorComissao.replace("R$", '').replace(',', ''))

    }
    imovelSelecionado.valorComissao
    cadastrarVenda(dados)
  }

  const cadastrarVenda = async (dados) => {
    try {
      const response = await api.post('/vendas-cadastro/', dados);
      if (response.status == 200) {
        setTotast("Cadastro completo")
      }
    } catch {

    }
  }

  return (
    <Box
    >
      <Header />

      <Container maxWidth="md" component="main"
        sx={{ mb: 10, mt: 10 }}
      >
        Vendedor
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={user.nome}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.nome}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

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

        Pagamento
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Pagamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={pagamentoSelecionado}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {pagamentoSelecionado}
                </TableCell>
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
                <TableCell align="right">Valor da Venda</TableCell>
                <TableCell align="right">Parcelamento 180x</TableCell>
                <TableCell align="right">Valor da Comissão</TableCell>
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
                <TableCell align="right">{imovelSelecionado.valorVenda}</TableCell>
                <TableCell align="right">{imovelSelecionado.valorParcelamento}</TableCell>
                <TableCell align="right">{imovelSelecionado.valorComissao}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box component="container">
          <Button onClick={() => handleCadastroVenda()}>Cadastrar Venda</Button>
        </Box>
      </Container>


      {
        toast &&

        <Box maxWidth="lg" sx={{ width: '100%', position: 'fixed', bottom: 10 }} display='flex' justifyContent='left'>
          <Alert variant="filled" severity="success">
            {toast}
          </Alert>
        </Box>
      }

    </Box>
  );
}

export default ResumoVenda