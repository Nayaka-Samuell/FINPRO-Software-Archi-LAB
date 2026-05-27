import { useState, useEffect, useContext } from 'react';
import { productApi } from '../api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { toast } from '../components/Toast';
import { formatRupiah } from '../utils/formatCurrency';

const Menu = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => { fetchData(); }, [selectedCategory]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [cats, prods] = await Promise.all([
        productApi.getCategories(),
        selectedCategory ? productApi.getByCategoryId(selectedCategory) : productApi.getAll(),
      ]);
      setCategories(Array.isArray(cats) ? cats : []);
      setProducts(Array.isArray(prods) ? prods : []);
    } catch {
      toast.error('Failed to load menu. Please try again.');
      setCategories([]);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (!user) { toast.error('Please login to add items to cart'); return; }
    setLoadingProductId(productId);
    try {
      await addToCart(productId, 1);
      toast.success('Added to cart! 🛒');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add to cart');
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative bg-blue-electric py-20 px-6 overflow-hidden"
        style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-ink/70"></div>
        <div className="relative z-10 container mx-auto max-w-5xl">
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">Jomoro Koffee</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-white">OUR<br />MENU</h1>
          <p className="text-white/70 mt-6 text-lg font-medium max-w-xl">Discover our carefully crafted coffees and delicious treats, made fresh every day.</p>
        </div>
      </div>

      <div className="border-b border-chalk-muted bg-white sticky top-[65px] z-30">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="flex overflow-x-auto no-scrollbar gap-0">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 py-4 px-6 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-200 ${selectedCategory === null ? 'border-blue-electric text-blue-electric' : 'border-transparent text-ink-muted hover:text-ink hover:border-ink-muted'}`}
            >All Items</button>
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 py-4 px-6 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-200 ${selectedCategory === cat.id ? 'border-blue-electric text-blue-electric' : 'border-transparent text-ink-muted hover:text-ink hover:border-ink-muted'}`}
              >{cat.name}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-chalk-muted border border-chalk-muted">
            {[1,2,3,4,5,6].map((n) => (
              <div key={n} className="bg-white animate-pulse">
                <div className="h-56 bg-chalk-off" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-chalk-muted rounded w-3/4" />
                  <div className="h-3 bg-chalk-muted rounded w-full" />
                  <div className="h-3 bg-chalk-muted rounded w-2/3" />
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-6 bg-chalk-muted rounded w-1/4" />
                    <div className="h-10 bg-chalk-muted rounded w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-4xl font-black uppercase tracking-tighter text-ink-muted mb-4">No Items Found</p>
            <p className="text-ink-muted font-medium">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-chalk-muted border border-chalk-muted">
            {products.map((product) => (
              <div key={product.id} className="bg-white group flex flex-col hover:bg-chalk-off transition-colors duration-200">
                <div className="h-56 bg-chalk-off overflow-hidden relative">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-electric/5">
                      <span className="text-6xl opacity-30">☕</span>
                    </div>
                  )}
                  {product.stock > 0 && product.stock <= 5 && (
                    <div className="absolute top-3 left-3 bg-blue-electric text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">Only {product.stock} left</div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                      <span className="text-white text-xs font-black uppercase tracking-widest border border-white px-4 py-2">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-ink mb-1 leading-tight">{product.name}</h3>
                  <p className="text-ink-muted text-sm font-medium leading-relaxed line-clamp-2 flex-grow mb-6">{product.description}</p>
                  <div className="flex items-center justify-between border-t border-chalk-muted pt-4 mt-auto">
                    <span className="text-2xl font-black tracking-tighter text-ink">{formatRupiah(product.price)}</span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0 || user?.role === 'ADMIN' || loadingProductId === product.id}
                      className={`text-xs font-bold uppercase tracking-widest py-2 px-4 transition-all duration-200 active:scale-95 flex items-center gap-2 ${
                        product.stock === 0 || user?.role === 'ADMIN' ? 'bg-chalk-muted text-ink-muted cursor-not-allowed'
                        : loadingProductId === product.id ? 'bg-blue-electric/70 text-white cursor-wait'
                        : 'bg-blue-electric text-white hover:bg-blue-deep'
                      }`}
                    >
                      {loadingProductId === product.id ? (
                        <><svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Adding...</>
                      ) : product.stock === 0 ? 'Sold Out' : (
                        <><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>Add to Cart</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
