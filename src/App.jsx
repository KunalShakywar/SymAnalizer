import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aisearch from "./pages/Search";
import SymptomGallery from "./pages/symGallery";
import { useEffect, useState } from "react";
import SplashScreen from "./components/Splash";
import Navbar from "./components/layout/navbarTop";
import MedicalShope from "./pages/medicalShop/medShop";
const Layout = () => {
  return (
    <div>
  <Routes>
    <Route path="/" element={<Aisearch/>}/>
    <Route path="/symgallery" element={<SymptomGallery/>}/>
    <Route path="/medicalshop" element={<MedicalShope/>}/>
  </Routes>
</div>
  )
}
function App() {
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },2000) //2 Sec
  },[])
  return(
    <>
    <BrowserRouter>
    <Navbar/>
   {  loading ? <SplashScreen/> :
    <Layout/> 
     } 
    </BrowserRouter>
    </>
  )
}
export default App;
