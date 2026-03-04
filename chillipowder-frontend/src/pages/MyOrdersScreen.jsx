import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, ArrowRight, Package, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const MyOrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/myorders');
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-4">My <span className="text-brand-primary">History</span></h1>
                    <p className="text-brand-muted font-medium">Tracking your culinary trajectory.</p>
                </div>

                {orders.length === 0 ? (
                    <div className="glass-morphism rounded-[2.5rem] border border-brand-muted/10 p-20 text-center">
                        <div className="w-20 h-20 bg-brand-muted/5 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag className="w-10 h-10 text-brand-muted" />
                        </div>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">No Transactions Detected</h2>
                        <p className="text-brand-muted mb-10 max-w-sm mx-auto">Your collection is currently empty. Start your journey by exploring our artisan spices.</p>
                        <Link to="/shop" className="btn-premium bg-brand-primary text-white hover:bg-rose-600 inline-flex items-center space-x-2">
                            <span>Explore Shop</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="glass-morphism rounded-[2.5rem] border border-brand-muted/10 p-8 hover:border-brand-primary/30 transition-all duration-500 group shadow-lg hover:shadow-2xl hover:shadow-brand-primary/5">
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    <div className="flex-grow">
                                        <div className="flex flex-wrap items-center gap-4 mb-6">
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
                                                ID: {order._id.slice(-8).toUpperCase()}
                                            </span>
                                            <div className="flex items-center text-brand-muted text-xs font-medium">
                                                <Calendar className="w-3.5 h-3.5 mr-2" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className={`flex items-center text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${order.isDelivered
                                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                    : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                                }`}>
                                                {order.isDelivered ? (
                                                    <><CheckCircle className="w-3 h-3 mr-1.5" /> Arrived</>
                                                ) : (
                                                    <><Clock className="w-3 h-3 mr-1.5 animate-pulse" /> In Transit</>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="flex -space-x-4 overflow-hidden">
                                                {order.orderItems.slice(0, 3).map((item, i) => (
                                                    <div key={i} className="inline-block h-14 w-14 rounded-2xl border-2 border-brand-dark overflow-hidden bg-brand-muted/10">
                                                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                                                    </div>
                                                ))}
                                                {order.orderItems.length > 3 && (
                                                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl border-2 border-brand-dark bg-brand-surface text-[10px] font-bold text-brand-muted">
                                                        +{order.orderItems.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="hidden sm:block">
                                                <p className="text-sm font-bold text-brand-text truncate max-w-[200px]">
                                                    {order.orderItems.map(item => item.name).join(', ')}
                                                </p>
                                                <p className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">
                                                    {order.orderItems.reduce((acc, item) => acc + item.qty, 0)} Items in packet
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end shrink-0 border-t md:border-t-0 md:border-l border-brand-muted/10 pt-6 md:pt-0 md:pl-8">
                                        <div className="text-right">
                                            <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest mb-1">Total Stake</p>
                                            <p className="text-3xl font-bold text-brand-text tracking-tighter">₹{order.totalPrice}</p>
                                        </div>

                                        <Link
                                            to={`/order/${order._id}`}
                                            className="mt-6 btn-premium bg-brand-muted/5 hover:bg-brand-muted/10 border border-brand-muted/20 text-brand-text flex items-center space-x-2 group/btn"
                                        >
                                            <span className="text-xs font-bold uppercase tracking-widest">Verify Status</span>
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
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

export default MyOrdersScreen;
