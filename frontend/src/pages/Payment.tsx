import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { orderApi } from '../api';
import { toast } from '../components/Toast';
import { formatRupiah } from '../utils/formatCurrency';

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state?.total) {
      setOrderTotal(location.state.total);
      setIsLoading(false);
    } else {
      orderApi.getDetail(Number(id)).then(data => {
        setOrderTotal(data.total);
        setIsLoading(false);
      }).catch(() => {
        toast.error('Failed to load order details');
        setIsLoading(false);
      });
    }
  }, [id, location.state]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    try {
      await orderApi.pay(Number(id), {
        payment_method: selectedMethod,
        amount: orderTotal
      });
      toast.success('Payment successful!');
      navigate('/orders');
    } catch (err: any) {
      toast.error(err.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'CREDIT_CARD', name: 'Credit / Debit Card', icon: '💳' },
    { id: 'E_WALLET', name: 'E-Wallet', icon: '📱' },
    { id: 'BANK_TRANSFER', name: 'Bank Transfer', icon: '🏦' },
    { id: 'CASH', name: 'Cash', icon: '💵' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-blue-electric border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-chalk-off px-6 py-16">

      <div className="w-full max-w-lg">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-ink mb-10 text-center">
          Payment
        </h1>

        <div className="bg-white border border-ink shadow-[8px_8px_0_0_#1E1EFF]">
          <div className="p-8 border-b border-chalk-muted bg-ink text-white text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest block mb-2">Order #{id} Total</span>
            <span className="text-5xl font-black">{formatRupiah(orderTotal)}</span>
          </div>

          <div className="p-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-6">Select Payment Method</h2>

            <div className="space-y-4 mb-8">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border cursor-pointer transition-all duration-200 ${selectedMethod === method.id
                      ? 'border-blue-electric bg-blue-electric/5'
                      : 'border-chalk-muted hover:border-ink'
                    }`}
                >
                  <div className="text-2xl mr-4 grayscale">{method.icon}</div>
                  <div className="flex-grow font-bold uppercase tracking-wide text-ink text-sm">{method.name}</div>
                  <div className={`w-5 h-5 border-2 flex items-center justify-center rounded-none ${selectedMethod === method.id ? 'border-blue-electric' : 'border-chalk-muted'
                    }`}>
                    {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-blue-electric" />}
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing || !selectedMethod}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
            >
              {isProcessing ? 'Processing...' : `Pay ${formatRupiah(orderTotal)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
