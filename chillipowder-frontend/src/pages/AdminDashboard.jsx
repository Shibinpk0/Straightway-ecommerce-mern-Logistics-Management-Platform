import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import Loader from '../components/Loader';
import { Trash2, Edit, Check, X, Package, ShoppingCart, Plus, Calendar, User, CreditCard, Settings as SettingsIcon, BarChart3, TrendingUp, IndianRupee, Layers } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                if (activeTab === 'products') {
                    const { data } = await api.get('/products');
                    setProducts(data);
                } else if (activeTab === 'orders') {
                    const { data } = await api.get('/orders');
                    setOrders(data);
                } else if (activeTab === 'analytics') {
                    const { data } = await api.get('/orders/summary');
                    setSummary(data);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate, activeTab]);

    const deleteProductHandler = async (id) => {
        if (window.confirm('Delete this product from the master collection?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter((p) => p._id !== id));
            } catch (error) {
                console.error(error);
                alert('Failed to delete product');
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const { data } = await api.post('/products');
            navigate(`/admin/product/${data._id}/edit`);
        } catch (error) {
            console.error(error);
            alert('Failed to initiate product creation');
        }
    };

    const markDeliveredHandler = async (id) => {
        try {
            await api.put(`/orders/${id}/deliver`);
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error(error);
            alert('Failed to update order status');
        }
    };

    const markPaidHandler = async (id) => {
        try {
            await api.put(`/orders/${id}/pay`, {
                id: `ADMIN_VERIFIED_${Date.now()}`,
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                email_address: user.email
            });
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error(error);
            alert('Failed to verify payment');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-24 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-2">Control <span className="text-brand-primary">Center</span></h1>
                        <p className="text-brand-muted font-medium uppercase tracking-widest text-[10px]">Master Administrative Portal</p>
                    </div>

                    <div className="flex bg-brand-muted/5 border border-brand-muted/10 p-1 rounded-2xl">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'products'
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                : 'text-brand-muted hover:text-brand-text'
                                }`}
                        >
                            <Package className="w-4 h-4" />
                            <span>Inventory</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'orders'
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                : 'text-brand-muted hover:text-brand-text'
                                }`}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Logistics</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'analytics'
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                : 'text-brand-muted hover:text-brand-text'
                                }`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span>Analytics</span>
                        </button>
                        <Link
                            to="/admin/settings"
                            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all text-brand-muted hover:text-brand-text hover:bg-brand-muted/5"
                        >
                            <SettingsIcon className="w-4 h-4" />
                            <span>System</span>
                        </Link>
                    </div>
                </div>

                <div className="glass-morphism rounded-[2.5rem] border border-brand-muted/10 p-8 md:p-12 shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />

                    {activeTab === 'products' ? (
                        <div className="animate-fade-in">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-brand-text tracking-tight">Product Matrix</h2>
                                    <p className="text-brand-muted text-sm">Managing {products.length} catalog items</p>
                                </div>
                                <button
                                    onClick={createProductHandler}
                                    className="btn-premium bg-brand-primary text-white hover:bg-rose-600 flex items-center space-x-2 px-6 py-3 shadow-xl group border border-transparent hover:border-brand-muted/20"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest">New Entry</span>
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-brand-muted/10 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-muted">
                                            <th className="pb-4 px-2">ID_REF</th>
                                            <th className="pb-4 px-2">Designation</th>
                                            <th className="pb-4 px-2">Selling Price</th>
                                            <th className="pb-4 px-2">MRP</th>
                                            <th className="pb-4 px-2">Discount</th>
                                            <th className="pb-4 px-2">Classification</th>
                                            <th className="pb-4 px-2">Size</th>
                                            <th className="pb-4 px-2">Stock</th>
                                            <th className="pb-4 px-2 text-right">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-muted/10">
                                        {products.map((product) => (
                                            <tr key={product._id} className="group/row hover:bg-brand-primary/5 transition-colors">
                                                <td className="py-6 px-2 text-xs font-mono text-brand-muted">{product._id.slice(-8).toUpperCase()}</td>
                                                <td className="py-6 px-2 font-bold text-brand-text tracking-tight">{product.name}</td>
                                                <td className="py-6 px-2">
                                                    <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                                                        ₹{product.price}
                                                    </span>
                                                </td>
                                                <td className="py-6 px-2 text-brand-muted/60 text-xs line-through">₹{product.mrp || '-'}</td>
                                                <td className="py-6 px-2">
                                                    {product.discountRate ? (
                                                        <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest bg-brand-primary/10 px-2 py-1 rounded-lg">
                                                            {product.discountRate}% OFF
                                                        </span>
                                                    ) : (
                                                        <span className="text-brand-muted text-[10px] font-bold uppercase tracking-widest">-</span>
                                                    )}
                                                </td>
                                                <td className="py-6 px-2">
                                                    <span className="text-brand-muted text-xs font-bold uppercase tracking-widest">{product.category}</span>
                                                </td>
                                                <td className="py-6 px-2">
                                                    <span className="text-brand-muted text-xs font-mono">{product.size || '500g'}</span>
                                                </td>
                                                <td className="py-6 px-2">
                                                    <div className="flex flex-col">
                                                        <span className={`text-xs font-bold ${product.countInStock < 5 ? 'text-rose-500' : 'text-brand-text'}`}>
                                                            {product.countInStock} Units
                                                        </span>
                                                        {product.countInStock < 5 && (
                                                            <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded-full border border-rose-500/20 w-fit mt-1 animate-pulse">
                                                                Low Stock
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-6 px-2">
                                                    <div className="flex justify-end space-x-3 opacity-20 group-hover/row:opacity-100 transition-opacity">
                                                        <Link to={`/admin/product/${product._id}/edit`} className="p-2 bg-brand-muted/5 hover:bg-brand-muted/10 rounded-xl transition-all">
                                                            <Edit className="w-4 h-4 text-brand-text" />
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteProductHandler(product._id)}
                                                            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-all"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-rose-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : activeTab === 'analytics' ? (
                        <div className="animate-fade-in space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-8 rounded-[2rem] bg-brand-primary/5 border border-brand-primary/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <TrendingUp className="w-16 h-16 text-brand-primary" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-4">Gross Revenue</p>
                                    <h3 className="text-4xl font-bold text-brand-text">₹{summary?.totalSales?.toLocaleString()}</h3>
                                    <div className="mt-4 flex items-center space-x-2 text-emerald-500 text-[10px] font-bold">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>Master Sales Level</span>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <Layers className="w-16 h-16 text-indigo-400" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-4">Total Transactions</p>
                                    <h3 className="text-4xl font-bold text-brand-text">{summary?.numOrders}</h3>
                                    <div className="mt-4 flex items-center space-x-2 text-indigo-400 text-[10px] font-bold">
                                        <ShoppingCart className="w-3 h-3" />
                                        <span>Fullfilled Logistics</span>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <Package className="w-16 h-16 text-amber-400" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-4">Collection Size</p>
                                    <h3 className="text-4xl font-bold text-brand-text">{summary?.numProducts}</h3>
                                    <div className="mt-4 flex items-center space-x-2 text-amber-400 text-[10px] font-bold">
                                        <Package className="w-3 h-3" />
                                        <span>Active Inventory</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-brand-text tracking-tight flex items-center space-x-2">
                                    <Calendar className="w-5 h-5 text-brand-primary" />
                                    <span>Recent Performance (7D Sequence)</span>
                                </h3>
                                <div className="space-y-3">
                                    {summary?.salesData?.length > 0 ? (
                                        summary.salesData.map((day) => (
                                            <div key={day._id} className="flex items-center justify-between p-5 bg-brand-muted/5 border border-brand-muted/10 rounded-2xl group hover:border-brand-primary/30 transition-all">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xs font-bold">
                                                        {new Date(day._id).toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-brand-text">{day._id}</p>
                                                        <p className="text-[10px] text-brand-muted uppercase tracking-widest">Market Day Sequence</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-emerald-400">₹{day.totalSales.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-10 text-center glass-morphism rounded-2xl border border-brand-muted/10">
                                            <p className="text-brand-muted text-sm italic">Initializing sales trajectory data...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-brand-text tracking-tight">Order Logs</h2>
                                <p className="text-brand-muted text-sm">Tracking {orders.length} transaction records</p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-brand-muted/10 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-muted">
                                            <th className="pb-4 px-2">TXID</th>
                                            <th className="pb-4 px-2">Identity</th>
                                            <th className="pb-4 px-2">Email</th>
                                            <th className="pb-4 px-2">Timestamp</th>
                                            <th className="pb-4 px-2">Total</th>
                                            <th className="pb-4 px-2">Payment</th>
                                            <th className="pb-4 px-2">Fullfilled</th>
                                            <th className="pb-4 px-2 text-right">Auth</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-muted/10">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="group/row hover:bg-brand-primary/5 transition-colors">
                                                <td className="py-6 px-2 text-xs font-mono text-brand-muted hover:text-brand-primary transition-colors">
                                                    <Link to={`/order/${order._id}`}>
                                                        {order._id.slice(-8).toUpperCase()}
                                                    </Link>
                                                </td>
                                                <td className="py-6 px-2">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-lg bg-brand-muted/5 flex items-center justify-center">
                                                            <User className="w-4 h-4 text-brand-muted" />
                                                        </div>
                                                        <span className="font-bold text-brand-text tracking-tight">{order.user && order.user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-2 text-xs text-brand-muted">{order.user && order.user.email}</td>
                                                <td className="py-6 px-2">
                                                    <div className="flex items-center space-x-2 text-brand-muted text-xs">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{order.createdAt.substring(0, 10)}</span>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-2 font-bold text-brand-text">₹{order.totalPrice}</td>
                                                <td className="py-6 px-2">
                                                    {order.isPaid ? (
                                                        <div className="flex items-center space-x-2 text-emerald-400">
                                                            <Check className="w-4 h-4" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">Paid</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center space-x-2 text-amber-500">
                                                            <X className="w-4 h-4" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/40">Open</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-6 px-2">
                                                    {order.isDelivered ? (
                                                        <div className="flex items-center space-x-2 text-emerald-400">
                                                            <Check className="w-4 h-4" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">Done</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center space-x-2 text-rose-500">
                                                            <X className="w-4 h-4" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">Pending</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-6 px-2">
                                                    <div className="flex justify-end space-x-2">
                                                        {!order.isPaid && (
                                                            <button
                                                                onClick={() => markPaidHandler(order._id)}
                                                                className="px-3 py-1.5 bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg hover:bg-emerald-600 transition-all opacity-0 group-hover/row:opacity-100 shadow-lg shadow-emerald-500/20"
                                                            >
                                                                Verify Paid
                                                            </button>
                                                        )}
                                                        {!order.isDelivered ? (
                                                            <button
                                                                onClick={() => markDeliveredHandler(order._id)}
                                                                className="px-3 py-1.5 bg-brand-primary text-white text-[9px] font-bold uppercase tracking-widest rounded-lg hover:bg-rose-600 transition-all opacity-0 group-hover/row:opacity-100 shadow-lg shadow-brand-primary/20"
                                                            >
                                                                Dispatch
                                                            </button>
                                                        ) : (
                                                            <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
