import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from './components/Toast';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Products from './pages/admin/Products';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />

                <Route element={<PrivateRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/payment/:id" element={<Payment />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<AdminRoute />}>
                  <Route path="/admin/products" element={<Products />} />
                </Route>
              </Routes>
            </main>
            {/* ToastContainer harus ada di sini biar toast bisa tampil */}
            <ToastContainer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
