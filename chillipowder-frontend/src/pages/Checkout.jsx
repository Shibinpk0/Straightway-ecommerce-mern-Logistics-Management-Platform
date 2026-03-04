import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import Loader from '../components/Loader';
import { MapPin, CreditCard, ShoppingBag, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [loading, setLoading] = useState(false);

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice: cartTotal,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: cartTotal,
            };

            const { data } = await api.post('/orders', orderData);
            clearCart();
            setLoading(false);
            navigate(`/order/${data._id}`);
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert('Failed to place order');
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-4">Finalize <span className="text-brand-primary">Order</span></h1>
                    <p className="text-brand-muted font-medium">Verify your details and choose a payment route.</p>
                </div>

                {loading && <Loader />}

                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Forms */}
                    <div className="w-full lg:flex-grow">
                        <form onSubmit={submitHandler} className="space-y-12">
                            {/* Address Section */}
                            <div className="glass-morphism rounded-[2rem] sm:rounded-[2.5rem] border border-brand-muted/10 p-6 sm:p-10 shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-colors duration-500" />

                                <div className="flex items-center space-x-4 mb-10">
                                    <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-brand-text tracking-tight">Shipping Destination</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2 ml-1">Physical Address</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                            placeholder="Street address, building number..."
                                            value={shippingAddress.address}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2 ml-1">City</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                                placeholder="City name"
                                                value={shippingAddress.city}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2 ml-1">Postal Protocol</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                                placeholder="Zip / Postal Code"
                                                value={shippingAddress.postalCode}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2 ml-1">Territory / Country</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                            placeholder="Country"
                                            value={shippingAddress.country}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="glass-morphism rounded-[2rem] sm:rounded-[2.5rem] border border-brand-muted/10 p-6 sm:p-10 shadow-2xl">
                                <div className="flex items-center space-x-4 mb-10">
                                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-brand-text tracking-tight">Payment Protocol</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { id: 'PayPal', label: 'PayPal / Secure Terminal', icon: '💳' },
                                        { id: 'COD', label: 'Cash on Arrival', icon: '💰' }
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`relative flex items-center p-6 bg-brand-muted/5 border rounded-[2rem] cursor-pointer transition-all duration-300 ${paymentMethod === method.id
                                                ? 'border-brand-primary bg-brand-primary/5 shadow-lg shadow-brand-primary/10'
                                                : 'border-brand-muted/10 hover:bg-brand-muted/10'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={paymentMethod === method.id}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="hidden"
                                            />
                                            <div className="w-10 h-10 rounded-xl bg-brand-muted/5 flex items-center justify-center mr-4 text-xl">
                                                {method.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-brand-text font-bold text-sm">{method.label}</p>
                                                {paymentMethod === method.id && (
                                                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mt-1 block animate-fade-in">Selected Route</span>
                                                )}
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'border-brand-primary bg-brand-primary' : 'border-brand-muted/40'
                                                }`}>
                                                {paymentMethod === method.id && <CheckCircle className="w-4 h-4 text-brand-text" />}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Side */}
                    <div className="w-full lg:w-[400px] shrink-0 sticky top-32">
                        <div className="glass-dark rounded-[2rem] sm:rounded-[2.5rem] border border-brand-muted/10 p-8 sm:p-10 shadow-2xl overflow-hidden relative">
                            <h3 className="text-2xl font-bold text-brand-text mb-8 tracking-tight flex items-center justify-between">
                                Summary
                                <div className="text-brand-muted font-normal text-sm bg-brand-muted/5 px-3 py-1 rounded-full border border-brand-muted/10">
                                    {cartItems.length} Selection{cartItems.length > 1 ? 's' : ''}
                                </div>
                            </h3>

                            <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-hide space-y-6 mb-10">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center group">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-xl border border-brand-muted/10 overflow-hidden flex-shrink-0">
                                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div>
                                                <p className="text-brand-text font-bold text-sm tracking-tight line-clamp-1">{item.name}</p>
                                                <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest mt-0.5">Quantity: {item.qty}</p>
                                            </div>
                                        </div>
                                        <span className="text-brand-text font-bold text-sm">₹{item.qty * item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 pt-6 border-t border-brand-muted/10 mb-10">
                                <div className="flex justify-between items-center text-brand-muted">
                                    <span className="text-xs font-bold uppercase tracking-widest">Est. Shipping</span>
                                    <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest bg-emerald-400/10 px-2 py-1 rounded-md">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text font-bold text-lg tracking-tight">Total Investment</span>
                                    <span className="text-brand-text font-bold text-3xl tracking-tighter">₹{cartTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={submitHandler}
                                disabled={loading}
                                className="w-full h-16 btn-premium bg-brand-primary text-white hover:bg-rose-600 flex items-center justify-center space-x-3 shadow-2xl transition-all group"
                            >
                                <span className="uppercase tracking-[0.2em] font-bold text-xs">Execute Order</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 pt-8 border-t border-brand-muted/10 grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2 text-brand-muted">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Secured</span>
                                </div>
                                <div className="flex items-center space-x-2 text-brand-muted">
                                    <ShoppingBag className="w-4 h-4 text-brand-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Authorized</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
