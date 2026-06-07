export const AUTH_URL = 'http://localhost:3001';
export const PRODUCT_URL = 'http://localhost:3002';
export const TRANSACTION_URL = 'http://localhost:3003';

export function getHeaders(auth = false) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('jomoro_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const authApi = {
  register: (data: Record<string, unknown>) =>
    fetch(`${AUTH_URL}/auth/register`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(r => r.json()),
  login: (data: Record<string, unknown>) =>
    fetch(`${AUTH_URL}/auth/login`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(async r => {
      if (!r.ok) {
        const err = await r.json();
        throw new Error(err.message || 'Login failed');
      }
      return r.json();
    }),
};

export const productApi = {
  getAll: () => fetch(`${PRODUCT_URL}/products`).then(r => r.json()),
  getById: (id: number) => fetch(`${PRODUCT_URL}/products/${id}`).then(r => r.json()),
  getCategories: () => fetch(`${PRODUCT_URL}/categories`).then(r => r.json()),
  getByCategoryId: (id: number) => fetch(`${PRODUCT_URL}/categories/${id}/products`).then(r => r.json()),
  adminCreate: (data: Record<string, unknown>) =>
    fetch(`${PRODUCT_URL}/admin/products`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify(data) }).then(r => r.json()),
  adminUpdate: (id: number, data: Record<string, unknown>) =>
    fetch(`${PRODUCT_URL}/admin/products/${id}/update`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify(data) }).then(r => r.json()),
  adminReduce: (id: number, qty: number) =>
    fetch(`${PRODUCT_URL}/admin/products/${id}/reduce`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify({ quantity: qty }) }).then(r => {
      if (!r.ok) return r.json().then(e => { throw new Error(e.message) });
      return r.json();
    }),
  adminDelete: (id: number) =>
    fetch(`${PRODUCT_URL}/admin/products/${id}/delete`, { method: 'POST', headers: getHeaders(true) }).then(r => r.json()),
};

export const cartApi = {
  get: () =>
    fetch(`${TRANSACTION_URL}/cart`, { headers: getHeaders(true) }).then(r => r.json()),
  add: (data: Record<string, unknown>) =>
    fetch(`${TRANSACTION_URL}/cart`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify(data) }).then(r => {
      if (!r.ok) return r.json().then(e => { throw new Error(e.message) });
      return r.json();
    }),
  update: (productId: number, qty: number) =>
    fetch(`${TRANSACTION_URL}/cart/${productId}/update`, { method: 'POST', headers: getHeaders(true), body: JSON.stringify({ quantity: qty }) }).then(r => {
      if (!r.ok) return r.json().then(e => { throw new Error(e.message) });
      return r.json();
    }),
  remove: (productId: number) =>
    fetch(`${TRANSACTION_URL}/cart/${productId}/delete`, { method: 'POST', headers: getHeaders(true) }).then(r => r.json()),
  clear: () =>
    fetch(`${TRANSACTION_URL}/cart/clear`, { method: 'POST', headers: getHeaders(true) }).then(r => r.json()),
};

export const orderApi = {
  getAll: () =>
    fetch(`${TRANSACTION_URL}/orders`, { headers: getHeaders(true) }).then(r => r.json()),
  getDetail: (id: number) =>
    fetch(`${TRANSACTION_URL}/orders/${id}`, { method: 'POST', headers: getHeaders(true) }).then(r => r.json()),
  checkout: () =>
    fetch(`${TRANSACTION_URL}/orders`, { method: 'POST', headers: getHeaders(true) }).then(r => {
      if (!r.ok) return r.json().then(e => { throw new Error(e.message) });
      return r.json();
    }),
  pay: (id: number, data: { payment_method: string; amount: number }) =>
    new Promise<{ message: string }>((resolve) => 
      setTimeout(() => resolve({ message: `Payment of ${data.amount} for order #${id} via ${data.payment_method} successful` }), 1000)
    ),
};

export const profileApi = {
  get: () =>
    fetch(`${TRANSACTION_URL}/profiles`, { headers: getHeaders(true) }).then(r => r.json()),
};