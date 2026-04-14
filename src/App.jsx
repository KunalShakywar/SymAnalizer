import {Routes,Route,BrowserRouter} from "react-router"
import Aisearch from "./pages/Search"
import SymptomGallery from "./pages/symGallery";
import { useEffect, useState } from "react";
import SplashScreen from "./components/Splash";
const Layout = () => {
  return (
    <div>
  <Routes>
    <Route path="/" element={<Aisearch/>}/>
    <Route path="/symgallery" element={<SymptomGallery/>}/>
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
   {  loading ? <SplashScreen/> : <Layout/>  } 
    </BrowserRouter>
    </>
  )
}
export default App;
