import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { profileApi } from '../api';

const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);
  const { cartCount, refreshCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (token && user?.role === 'CUSTOMER') {
      refreshCart();
      profileApi.get()
        .then((data) => setFirstName(data.first_name))
        .catch(() => {});
    }
  }, [token, user, location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-chalk-muted shadow-sm' : 'border-b border-chalk-muted'
        }`}
        style={{
          backgroundImage: 'url(/navbar-bg.png)',
          backgroundColor: 'transparent',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-blue-electric flex items-center justify-center">
              <span className="text-white font-black text-xs leading-none">JK</span>
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-ink group-hover:text-blue-electric transition-colors">
              Jomoro Koffee
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/menu" className={`nav-link ${isActive('/menu') ? 'text-blue-electric' : 'text-ink'}`}>
              Menu
            </Link>

            {user?.role === 'ADMIN' && (
              <Link to="/admin/products" className={`nav-link ${isActive('/admin/products') ? 'text-blue-electric' : 'text-ink'}`}>
                Admin
              </Link>
            )}

            {user?.role === 'CUSTOMER' && (
              <>
                {/* Cart dengan icon + badge real-time dari CartContext */}
                <Link
                  to="/cart"
                  className={`nav-link flex items-center gap-2 relative ${isActive('/cart') ? 'text-blue-electric' : 'text-ink'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-blue-electric text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'text-blue-electric' : 'text-ink'}`}>
                  Orders
                </Link>
                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'text-blue-electric' : 'text-ink'}`}>
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-4">
                {firstName && (
                  <span className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    Hi, {firstName}
                  </span>
                )}
                <button onClick={handleLogout} className="btn-outline text-xs py-2 px-4">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="nav-link text-ink">Login</Link>
                <Link to="/register" className="btn-primary text-xs py-2 px-5">Join Us</Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96 border-t border-chalk-muted' : 'max-h-0'}`}>
          <div className="px-6 py-4 flex flex-col gap-4 bg-white">
            <Link to="/menu" className="nav-link py-2 border-b border-chalk-muted">Menu</Link>
            {user?.role === 'ADMIN' && (
              <Link to="/admin/products" className="nav-link py-2 border-b border-chalk-muted">Admin Panel</Link>
            )}
            {user?.role === 'CUSTOMER' && (
              <>
                <Link to="/cart" className="nav-link py-2 border-b border-chalk-muted flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart
                  {cartCount > 0 && (
                    <span className="bg-blue-electric text-white text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="nav-link py-2 border-b border-chalk-muted">Orders</Link>
                <Link to="/profile" className="nav-link py-2 border-b border-chalk-muted">Profile</Link>
              </>
            )}
            {token ? (
              <button onClick={handleLogout} className="btn-outline w-full text-xs">Logout</button>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link to="/login" className="btn-outline w-full text-center text-xs">Login</Link>
                <Link to="/register" className="btn-primary w-full text-center text-xs">Join Us</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-[65px]" />
    </>
  );
};

export default Navbar;
