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
import { CardMedia, Fab } from '@mui/material';
import api from '../../services/api'
import { useContext, useEffect, useState } from 'react';
import { NavigateNextRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import ImovelContext from '../../contexts/Imovel';

const Home = () => {
    const { imovelSelecionado, setImovelSelecionado } = useContext(ImovelContext)
    const [imoveis, setImoveis] = useState([])

    useEffect(() => {
        getAllImoveis()
    }, [])

    const getAllImoveis = () => {
        api.get('/imoveis').then(
            (response) => {
                const allImoveis = response.data.success
                console.log(allImoveis)
                setImoveis(allImoveis)
            }
        ).catch(error => console.error('Error'))
    }

    const selecionarImovel = (id) => {
        if (imovelSelecionado.id == id) {
            setImovelSelecionado({})    
        } else {
            const imovel = imoveis.find((imovel) => imovel.id == id)
            setImovelSelecionado(imovel)
        }
        console.log(imovelSelecionado)
    }
    
    const history = useNavigate()

    const nextStep = () => {
        history('/simulacao', { imovelSelecionado, setImovelSelecionado });
    }

    return (
        <Box
        >
            <Header />
            <Container maxWidth="md" component="main"
                sx={{ mb: 10, mt: 10 }}
            >
                <Grid container spacing={5} alignItems="flex-end">
                    {imoveis.map((imovel) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={imovel.id}
                            xs={12}
                            sm={6}
                            md={4}
                        >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={imovel.url_da_foto}
                                    title={`Imagem de ${imovel.tipo}`}
                                />
                                <CardContent
                                    sx={{minHeight: "100px"}}
                                >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {imovel.tipo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {imovel.endereco}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body1" color="text.primary">
                                        {imovel.valor_de_venda}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    { imovel.id != imovelSelecionado.id ? 
                                        (<Button size="small" onClick={() => selecionarImovel(imovel.id)} variant='contained'>Selecionar Imóvel</Button>)
                                        :                                         
                                        (<Button size="small" onClick={() => selecionarImovel(imovel.id)} variant='contained'>Remover Seleção Imóvel</Button>)

                                    }
                                    {/* <Button size="small">Editar</Button> */}
                                    {/* <Button size="small" variant="outlined" color="error">Excluir</Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {
                !(Object.keys(imovelSelecionado).length === 0) ?
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

export default Home