import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authApi } from '../api';
import { toast } from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await authApi.login({ email, password });
      login(data.access_token);
      toast.success('Logged in successfully!');

      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      if (payload.role === 'ADMIN') {
        navigate('/admin/products');
      } else {
        navigate('/menu');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex">

      {/* ── LEFT PANEL (Blue) ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-blue-electric p-16">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <span className="text-blue-electric font-black text-xs">JK</span>
            </div>
            <span className="text-white text-sm font-black uppercase tracking-widest">Jomoro Koffee</span>
          </Link>
        </div>
        <div>
          <h2 className="text-7xl font-black uppercase leading-none tracking-tighter text-white mb-6">
            GOOD<br />COFFEE<br />AWAITS.
          </h2>
          <p className="text-white/60 text-base font-medium max-w-xs leading-relaxed">
            Sign in to order your favorite brew and track your orders.
          </p>
        </div>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest">
          Open 17.00 – 23.00 · Everyday
        </p>
      </div>

      {/* ── RIGHT PANEL (Form) ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-7 h-7 bg-blue-electric flex items-center justify-center">
              <span className="text-white font-black text-[10px]">JK</span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-ink">Jomoro Koffee</span>
          </Link>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ink-muted mb-3">Welcome back</p>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-ink mb-10">
            Sign In
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 mb-6 text-xs font-semibold uppercase tracking-wide">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                required
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>

          <p className="mt-8 text-xs text-ink-muted font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-electric font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
