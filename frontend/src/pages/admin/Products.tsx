import { useState, useEffect } from 'react';
import { productApi } from '../../api';
import { toast } from '../../components/Toast';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image_url: '',
    category_id: 1
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prods, cats] = await Promise.all([
        productApi.getAll(),
        productApi.getCategories()
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (product: any = null) => {
    if (product) {
      setFormData({ ...product });
      setIsEditing(true);
    } else {
      setFormData({
        id: 0,
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image_url: '',
        category_id: categories.length > 0 ? categories[0].id : 1
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await productApi.adminUpdate(formData.id, {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
          image_url: formData.image_url,
          category_id: Number(formData.category_id)
        });
        toast.success('Product updated successfully');
      } else {
        await productApi.adminCreate({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
          image_url: formData.image_url,
          category_id: Number(formData.category_id)
        });
        toast.success('Product created successfully');
      }
      closeModal();
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productApi.adminDelete(id);
      toast.success('Product deleted');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete product');
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
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8 border-b border-chalk-muted pb-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-ink">Manage Products</h1>
        <button 
          onClick={() => openModal()}
          className="btn-primary py-2 px-6"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white border border-ink shadow-[4px_4px_0_0_#1E1EFF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-ink text-white">
              <tr>
                <th className="p-4 text-xs font-bold uppercase tracking-widest">ID</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest">Product</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest">Category</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest">Price</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest">Stock</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chalk-muted">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-chalk-off transition">
                  <td className="p-4 text-ink-muted text-sm font-bold">#{product.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 border border-chalk-muted bg-white overflow-hidden flex items-center justify-center">
                        {product.image_url ? <img src={product.image_url} alt="" className="object-cover h-full w-full" /> : <span className="opacity-50">☕</span>}
                      </div>
                      <span className="font-black uppercase tracking-tight text-ink">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-ink text-sm font-bold uppercase">
                    {categories.find(c => c.id === product.category_id)?.name || product.category_id}
                  </td>
                  <td className="p-4 font-black text-ink">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 border text-xs font-bold uppercase tracking-widest ${product.stock > 10 ? 'border-green-400 text-green-600' : product.stock > 0 ? 'border-amber-400 text-amber-600' : 'border-red-400 text-red-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openModal(product)} className="text-xs font-bold uppercase tracking-widest text-blue-electric hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-ink/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-ink shadow-[8px_8px_0_0_#1E1EFF]">
            <div className="p-6 border-b border-chalk-muted flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-black uppercase tracking-tighter text-ink">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={closeModal} className="text-ink-muted hover:text-ink text-3xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="form-label">Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-input" />
                </div>
                <div className="col-span-2">
                  <label className="form-label">Description</label>
                  <textarea required minLength={20} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="form-input min-h-[100px]"></textarea>
                </div>
                <div>
                  <label className="form-label">Price ($)</label>
                  <input required type="number" min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Stock</label>
                  <input required type="number" min="0" value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select required value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: Number(e.target.value)})} className="form-input bg-white">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="form-label">Image URL (Optional)</label>
                  <input type="text" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="form-input" />
                </div>
              </div>
              <div className="pt-6 flex justify-end gap-3 border-t border-chalk-muted mt-6">
                <button type="button" onClick={closeModal} className="btn-outline py-2 px-6">Cancel</button>
                <button type="submit" className="btn-primary py-2 px-6">
                  {isEditing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
