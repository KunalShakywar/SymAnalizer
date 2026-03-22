import {Routes,Route,BrowserRouter} from "react-router"
import Aisearch from "./components/Aisearch"
import SymptomGallery from "./pages/symGallery";
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
  return(
    <>
    <BrowserRouter>
    <Layout/>
    </BrowserRouter>
    </>
  )
}
export default App;
