import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ClassRoom from "./pages/ClassRoom"
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/classroom/:id" element={<ClassRoom />} />
      </Routes>
      <Toaster position="bottom-center" />
    </>
  )
}

export default App