import React from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    image_url?: string;
    category?: { name: string };
  };
  onAddToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-brown-900/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-brown-900/5 relative">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">☕</div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.category && (
            <span className="bg-brown-900/80 backdrop-blur text-cream-100 text-xs px-2 py-1 rounded-full font-medium">
              {product.category.name}
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              Out of Stock
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-brown-900 mb-1 truncate">{product.name}</h3>
        <p className="text-amber-600 font-semibold mb-4">
          Rp {product.price.toLocaleString('id-ID')}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded-lg font-medium transition ${
            product.stock > 0 
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
