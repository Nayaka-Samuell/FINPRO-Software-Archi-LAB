import { useState, useEffect } from 'react';
import { orderApi } from '../api';
import { toast } from '../components/Toast';
import { formatRupiah } from '../utils/formatCurrency';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderApi.getAll();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

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
        style={{ backgroundImage: "url('/background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative z-10 container mx-auto max-w-4xl">
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-3">Order History</p>
          <h1 className="text-6xl md:text-7xl font-black uppercase leading-none tracking-tighter text-white">
            YOUR<br />ORDERS
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-16">
        {orders.length === 0 ? (
          <div className="border border-chalk-muted p-20 text-center">
            <p className="text-6xl font-black uppercase tracking-tighter text-chalk-muted mb-4">
              None
            </p>
            <p className="text-ink-muted font-medium mb-8">
              You haven't placed any orders yet.
            </p>
            <button
              onClick={() => window.location.href = '/menu'}
              className="btn-primary"
            >
              Order Now →
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const items = order.orderDetails || order.items || [];
              const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
              
              return (
                <div key={order.id} className="border border-ink flex flex-col group hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-ink p-6 flex flex-wrap justify-between items-center gap-4 text-white">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-1">Order #{order.id}</span>
                      <span className="font-medium">{new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`px-4 py-1 border text-xs font-bold uppercase tracking-widest ${
                        order.status === 'PAID' ? 'border-green-400 text-green-400' : 
                        order.status === 'PENDING' ? 'border-amber-400 text-amber-400' : 'border-chalk-muted text-chalk-muted'
                      }`}>
                        {order.status || 'PENDING'}
                      </span>
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-1">Total</span>
                        <span className="font-black text-xl">{formatRupiah(total)}</span>
                      </div>
                      {order.status === 'PENDING' && (
                        <button 
                          onClick={() => window.location.href = `/payment/${order.id}`}
                          className="bg-white text-ink hover:bg-chalk-muted font-bold py-2 px-6 uppercase tracking-widest text-xs transition"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="space-y-4">
                      {items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-chalk-muted last:border-0">
                          <div className="flex items-center">
                            <span className="font-black uppercase tracking-tighter text-ink text-sm sm:text-base">{item.product_name || `Product #${item.product_id}`}</span>
                            <span className="mx-3 text-ink-muted font-bold text-xs">×</span>
                            <span className="text-ink font-black text-sm">{item.quantity}</span>
                          </div>
                          <span className="text-ink font-black text-sm sm:text-base">{formatRupiah(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="sm:hidden mt-4 pt-4 border-t border-chalk-muted flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-ink-muted">Total</span>
                        <span className="font-black text-xl text-ink">{formatRupiah(total)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
