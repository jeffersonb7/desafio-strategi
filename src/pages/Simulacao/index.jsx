import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useContext } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import ImovelContext from '../../contexts/Imovel';

const Simulacao = () => {
    const { imovelSelecionado ,pagamentoSelecionado: pagamento, setPagamentoSelecionado: setPagamento } = useContext(ImovelContext)
    
    const handleChange = (event) => {
        setPagamento(event.target.value);
      };

      const history = useNavigate()

    return (
        <Box
        >
            <Header />
            <Container maxWidth="md" component="main"
                
            >
                <Box sx={{ mb: 10, mt: 10 }}>
                <Typography component="h1" variant="h5">
                    Forma de pagamento
                </Typography>
                </Box>

                <Typography
          sx={{ flex: '1 1 100%', mb: 1 }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Dados do Imóvel
        </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo</TableCell>
                                <TableCell align="right">Endereço</TableCell>
                                <TableCell align="right">Valor de Venda</TableCell>
                                <TableCell align="right">Parcelamento 180x</TableCell>
                                <TableCell align="right">Valor de Comissao</TableCell>

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
                                <TableCell align="right">R$ {(imovelSelecionado.valor_de_venda / 180).toFixed(2)}</TableCell>
                                <TableCell align="right">{imovelSelecionado.valorComissao}</TableCell>

                                </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box componenet="container" noValidate sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Forma de pagamento</InputLabel>
                        <Select
                        required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pagamento}
                            label="Pagamento"
                            onChange={handleChange}
                        >
                            <MenuItem value={"A vista"}>A vista</MenuItem>
                            <MenuItem value={"Parcelado"}>Parcelado</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => history('/clientes')}
                    >
                        Selecionar o cliente
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Simulacao