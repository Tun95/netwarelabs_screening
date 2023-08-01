import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/homescreen/HomeScreen";
import Footer from "./common/footer/Footer";
import NavBar from "./common/nav bar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/utilities/scroll to top/ScrollToTop";
import LoadingOverlayComponent from "./components/utilities/message loading/OverlayLoading";
import { useState } from "react";
import Cart from "./common/cart/Cart";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="App">
      <Router>
        <LoadingOverlayComponent>
          <ToastContainer />
          <ScrollToTop />
          <NavBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
          <Footer />
        </LoadingOverlayComponent>
      </Router>
    </div>
  );
}

export default App;
