import './App.css'
import Login from './pages/Login/index'
import Home from './pages/Home/index'
import { Container } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from './services/auth'

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Container component="main" maxWidth="lg">
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
      </Routes>
    </Container>
  )
}

export default App
