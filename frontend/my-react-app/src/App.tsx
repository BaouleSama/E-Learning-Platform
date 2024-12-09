
import './App.css'
import Footer from './Component/Layout/Footer'
import Header from './Component/Layout/Header'
import Home from './Component/Home'
import { Routes, Route } from 'react-router-dom'
import SignUp from './Component/Pages/SignUp'
function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <Footer />
    </>




  )
}
export default App
