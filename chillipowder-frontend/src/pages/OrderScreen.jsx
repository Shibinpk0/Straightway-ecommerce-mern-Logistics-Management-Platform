import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const OrderScreen = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <Loader />;
    if (!order) return <div className="text-center py-20 bg-brand-dark text-brand-text">Order not found</div>;

    const steps = [
        { label: 'Placed', icon: <Package className="w-5 h-5" />, date: order.createdAt, completed: true },
        { label: 'Paid', icon: <CreditCard className="w-5 h-5" />, date: order.paidAt, completed: order.isPaid },
        { label: 'Dispatched', icon: <Truck className="w-5 h-5" />, date: order.deliveredAt, completed: order.isDelivered },
        { label: 'Arrived', icon: <CheckCircle className="w-5 h-5" />, date: order.deliveredAt, completed: order.isDelivered },
    ];

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link
                    to="/shop"
                    className="inline-flex items-center text-brand-muted hover:text-brand-primary mb-10 transition-colors uppercase text-[10px] font-bold tracking-[0.2em]"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-2">Order <span className="text-brand-primary">Verification</span></h1>
                        <p className="text-brand-muted font-medium font-mono text-xs uppercase tracking-widest">Tracking Reference: {order._id.toUpperCase()}</p>
                    </div>
                    <div className="bg-brand-primary/10 border border-brand-primary/20 px-6 py-3 rounded-2xl">
                        <span className="text-brand-primary font-bold text-sm tracking-tight">Status: {order.isDelivered ? 'Delivered' : (order.isPaid ? 'Processing' : 'Awaiting Payment')}</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="glass-morphism rounded-[2.5rem] border border-brand-muted/10 p-10 mb-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />

                    <div className="flex flex-col md:flex-row justify-between relative z-10">
                        {steps.map((step, index) => (
                            <div key={step.label} className="flex-1 flex flex-col items-center mb-8 md:mb-0 relative">
                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-7 left-1/2 w-full h-[2px] bg-brand-muted/10">
                                        <div
                                            className="h-full bg-brand-primary transition-all duration-1000"
                                            style={{ width: step.completed && steps[index + 1].completed ? '100%' : '0%' }}
                                        />
                                    </div>
                                )}

                                <div className={`relative z-20 w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${step.completed
                                        ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                                        : 'bg-brand-muted/5 border-brand-muted/10 text-brand-muted'
                                    }`}>
                                    {step.icon}
                                </div>
                                <div className="mt-4 text-center">
                                    <p className={`text-xs font-bold uppercase tracking-widest ${step.completed ? 'text-brand-text' : 'text-brand-muted'}`}>{step.label}</p>
                                    {step.completed && (
                                        <p className="text-[10px] text-brand-muted mt-1 font-mono">{new Date(step.date).toLocaleDateString()}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Items */}
                    <div className="space-y-6">
                        <div className="glass-morphism rounded-[2.5rem] border border-brand-muted/10 p-10 shadow-xl">
                            <h3 className="text-xl font-bold text-brand-text mb-8 tracking-tight flex items-center">
                                <ShoppingBag className="w-5 h-5 mr-3 text-brand-primary" />
                                Order Composition
                            </h3>
                            <div className="space-y-6">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-6">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-brand-muted/10 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-brand-text font-bold text-sm tracking-tight">{item.name}</p>
                                            <p className="text-brand-muted text-[10px] font-bold uppercase tracking-widest mt-1">Qty: {item.qty} × ₹{item.price}</p>
                                        </div>
                                        <div className="text-brand-text font-bold">
                                            ₹{item.qty * item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-6">
                        <div className="glass-dark rounded-[2.5rem] border border-brand-muted/10 p-10 shadow-xl">
                            <h3 className="text-xl font-bold text-brand-text mb-8 tracking-tight flex items-center">
                                <MapPin className="w-5 h-5 mr-3 text-brand-primary" />
                                Logistic Path
                            </h3>
                            <div className="text-brand-muted space-y-2">
                                <p className="text-sm font-bold text-brand-text">{order.user.name}</p>
                                <p className="text-sm">{order.shippingAddress.address}</p>
                                <p className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p className="text-sm">{order.shippingAddress.country}</p>
                            </div>

                            <div className="h-px bg-brand-muted/10 my-8" />

                            <h3 className="text-xl font-bold text-brand-text mb-8 tracking-tight flex items-center">
                                <CreditCard className="w-5 h-5 mr-3 text-brand-primary" />
                                Transaction
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-brand-muted">Method</span>
                                    <span className="text-brand-text font-bold">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-brand-muted">Total Investment</span>
                                    <span className="text-brand-text font-bold text-xl tracking-tighter">₹{order.totalPrice}</span>
                                </div>
                                <div className={`mt-2 p-3 rounded-xl border text-center text-[10px] font-black uppercase tracking-[0.2em] ${order.isPaid ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                    }`}>
                                    {order.isPaid ? `Verified on ${new Date(order.paidAt).toLocaleDateString()}` : 'Payment Pending verification'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
