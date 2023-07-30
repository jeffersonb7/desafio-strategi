import './App.css'
import Clientes from './pages/Clientes/index'
import Login from './pages/Login/index'
import Home from './pages/Home/index'
import { Container } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from './services/auth'
import { useContext, useState } from 'react'
import ResumoVenda from './pages/ResumoVenda'
import Simulacao from './pages/Simulacao'
import ImovelContext from './contexts/Imovel'

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const [imovelSelecionado, setImovelSelecionado] = useState({})
  const [clienteSelecionado, setClienteSelecionado] = useState({})
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState({})

  console.log("asasdasd")

  return (
    <ImovelContext.Provider value={
      {
        imovelSelecionado, setImovelSelecionado,
        clienteSelecionado, setClienteSelecionado,
        pagamentoSelecionado, setPagamentoSelecionado
      }
    }>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />
          <Route
            path="/resumoVenda"
            element={
              <PrivateRoute>
                <ResumoVenda
                  imovelSelecionado={imovelSelecionado} setImovelSelecionado={setImovelSelecionado}
                  clienteSelecionado={clienteSelecionado} setClienteSelecionado={setClienteSelecionado}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/simulacao"
            element={
              <PrivateRoute>
                <Simulacao
                  imovelSelecionado={imovelSelecionado} setImovelSelecionado={setImovelSelecionado}
                  clienteSelecionado={clienteSelecionado} setClienteSelecionado={setClienteSelecionado}
                />
              </PrivateRoute>
            }
          />

        </Routes>
      </Container>
    </ImovelContext.Provider>
  )
}

export default App
