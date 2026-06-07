import { useState, useEffect } from 'react';
import { cartApi, orderApi } from '../api';
import { toast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { formatRupiah } from '../utils/formatCurrency';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const data = await cartApi.get();
      setCartItems(data.items || []);
    } catch (err) {
      toast.error('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      await cartApi.update(productId, newQty);
      fetchCart();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await cartApi.remove(productId);
      toast.success('Item removed');
      fetchCart();
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await orderApi.checkout();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err: any) {
      toast.error(err.message || 'Checkout failed');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-blue-electric border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-65px)] bg-white">

      {/* Page Header */}
      <div 
        className="relative bg-blue-electric py-16 px-6 overflow-hidden"
        style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-ink/70"></div>
        <div className="relative z-10 container mx-auto max-w-4xl">
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-3">Your Selection</p>
          <h1 className="text-6xl md:text-7xl font-black uppercase leading-none tracking-tighter text-white">
            Cart
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-16">
        {cartItems.length === 0 ? (
          /* ── Empty State ── */
          <div className="border border-chalk-muted p-20 text-center">
            <p className="text-6xl font-black uppercase tracking-tighter text-chalk-muted mb-4">
              Empty
            </p>
            <p className="text-ink-muted font-medium mb-8">
              Your cart is empty — add some items from the menu.
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="btn-primary"
            >
              Browse Menu →
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Cart Items ── */}
            <div className="lg:col-span-2">
              <div className="border-t-2 border-ink">
                {cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex items-center gap-5 py-6 border-b border-chalk-muted"
                  >
                    {/* Thumb */}
                    <div className="w-16 h-16 bg-blue-electric/5 border border-chalk-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl opacity-40">☕</span>
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-base font-black uppercase tracking-tighter text-ink leading-tight truncate">
                        {item.name || item.product_name}
                      </h3>
                      <p className="text-xs font-medium text-ink-muted mt-1">
                        {formatRupiah(item.price)} each
                      </p>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center border border-ink">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-colors font-bold text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-black text-ink">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-colors font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <div className="w-28 text-right font-black text-ink text-sm shrink-0">
                      {formatRupiah(item.price * item.quantity)}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-ink-muted hover:text-red-500 transition-colors font-bold text-lg leading-none shrink-0 ml-2"
                      title="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Order Summary ── */}
            <div className="lg:col-span-1">
              <div className="border border-chalk-muted p-6 sticky top-24">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-ink-muted mb-6">
                  Order Summary
                </p>

                <div className="flex justify-between items-baseline py-4 border-t border-chalk-muted">
                  <span className="text-sm font-semibold text-ink-muted uppercase tracking-wide">Subtotal</span>
                  <span className="text-base font-black text-ink">{formatRupiah(total)}</span>
                </div>
                <div className="flex justify-between items-baseline py-4 border-t border-b-2 border-t-chalk-muted border-b-ink mb-6">
                  <span className="text-sm font-black uppercase tracking-wide text-ink">Total</span>
                  <span className="text-2xl font-black text-ink">{formatRupiah(total)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout Now →'}
                </button>

                <button
                  onClick={() => navigate('/menu')}
                  className="w-full text-center text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-blue-electric transition-colors mt-4 py-2"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
