import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// PAGES
import Aisearch from "./pages/Search";
import SymptomGallery from "./pages/symGallery";
import SplashScreen from "./components/Splash";
import MedicalShope from "./pages/medicalShop/medShop";

// NAVBAR FOR DESKTOP TOPBAR
import Navbar from "./components/layout/navbarTop";
// FOOTER FOR BOTTOM-BAR
import Footer from "./components/layout/footerBottom";
// AUTH IMPORT
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import { Forgot } from "./pages/auth/login"
// PROFILE IMPORT 
import Profile from "./pages/auth/profile/profile";






// ======================== ROUTES SECTION =============================
const Layout = () => {
  return (
    <div>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Aisearch />} />
        {/* GALLERY */}
        <Route path="/symgallery" element={<SymptomGallery />} />
        {/* MEDICAL SHOP */}
        <Route path="/medicalshop" element={<MedicalShope />} />
        {/* AUTH SIGN-UP , PROFILE  AND LOG-IN  */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/profile" element={<Profile/>}/>  {/* After Signup or Login */}


      </Routes>
    </div>
  );
};


// ======================= MAIN FUNCTION FOR ROUTES ======================
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); //2 Sec
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {loading ? <SplashScreen /> : <Layout />}
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}
export default App;
