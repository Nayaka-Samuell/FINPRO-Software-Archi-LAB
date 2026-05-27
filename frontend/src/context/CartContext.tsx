import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { cartApi } from '../api';
import { AuthContext } from './AuthContext';

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: async () => {},
  addToCart: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useContext(AuthContext);

  const refreshCart = useCallback(async () => {
    if (!user || user.role !== 'CUSTOMER') return;
    try {
      const data = await cartApi.get();
      setCartCount(data.items?.length || 0);
    } catch {
      setCartCount(0);
    }
  }, [user]);

  const addToCart = useCallback(async (productId: number, quantity = 1) => {
    await cartApi.add({ product_id: productId, quantity });
    setCartCount(prev => prev + 1);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
