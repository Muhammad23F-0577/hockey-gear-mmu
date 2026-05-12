import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import BatsPage from "./pages/BatsPage";
import BallsPage from "./pages/BallsPage";
import KitsPage from "./pages/KitsPage";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Profile from "./pages/Profile";

/* =========================
   🟢 HOCKEY STORE LAYOUTS
   ========================= */

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const AdminLayout = ({ children }) => <>{children}</>;

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />

        {/* HOCKEY STORE PAGES */}
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/bats" element={<Layout><BatsPage /></Layout>} />
        <Route path="/balls" element={<Layout><BallsPage /></Layout>} />
        <Route path="/kits" element={<Layout><KitsPage /></Layout>} />

        {/* USER FEATURES */}
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetailsPage /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <p className="text-green-500 text-center py-20 flex items-center justify-center">
                Hockey page not found
              </p>
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;