import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, RefreshCcw, Minus, Plus } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import CartContext from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    if (loading) return <Loader />;
    if (!product) return <div className="text-center py-20 bg-brand-dark text-brand-text">Product not found</div>;

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <Link
                    to="/shop"
                    className="inline-flex items-center text-brand-muted hover:text-brand-primary mb-12 transition-colors uppercase text-xs font-bold tracking-[0.2em]"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Product Image */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-brand-primary/5 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative rounded-[3rem] overflow-hidden border border-brand-muted/10 shadow-2xl aspect-[4/5]">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center space-x-3 mb-6">
                            <span className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                                {product.category}
                            </span>
                            <span className={`flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest ${product.countInStock > 0 ? 'text-emerald-400' : 'text-rose-400'
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${product.countInStock > 0 ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`} />
                                <span>{product.countInStock > 0 ? 'Physically In Stock' : 'Awaiting Stock'}</span>
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-6 tracking-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center space-x-4 mb-8">
                            <div className="flex items-center text-amber-400 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span className="text-brand-muted text-xs font-medium border-l border-brand-muted/10 pl-4 uppercase tracking-widest">Premium Grade</span>
                            <span className="text-brand-muted text-xs font-bold border-l border-brand-muted/10 pl-4 font-mono">{product.size || '500g'}</span>
                        </div>

                        <div className="flex items-baseline space-x-4 mb-10">
                            <span className="text-5xl font-bold text-brand-text tracking-tighter">₹{product.price}</span>
                            {product.mrp > product.price && (
                                <div className="flex flex-col">
                                    <span className="text-brand-muted text-sm line-through">₹{product.mrp}</span>
                                    <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">{product.discountRate}% OFF</span>
                                </div>
                            )}
                        </div>

                        <p className="text-brand-muted leading-relaxed mb-10 max-w-xl text-lg">
                            {product.description}
                        </p>

                        <div className="glass-morphism rounded-[2rem] sm:rounded-3xl p-6 sm:p-8 border border-brand-muted/10 mb-10">
                            {product.countInStock > 0 && (
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
                                    <div className="flex items-center bg-brand-muted/5 border border-brand-muted/10 rounded-2xl p-1.5 h-12 sm:h-14">
                                        <button
                                            className="w-10 h-10 flex items-center justify-center text-brand-text hover:bg-brand-muted/10 rounded-xl transition-colors disabled:opacity-20"
                                            onClick={() => setQty(Math.max(1, qty - 1))}
                                            disabled={qty <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center text-brand-text font-bold select-none">
                                            {qty}
                                        </span>
                                        <button
                                            className="w-10 h-10 flex items-center justify-center text-brand-text hover:bg-brand-muted/10 rounded-xl transition-colors disabled:opacity-20"
                                            onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                            disabled={qty >= product.countInStock}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={product.countInStock === 0}
                                        className="btn-premium flex-grow h-14 bg-brand-primary text-white hover:bg-rose-600 flex items-center justify-center space-x-3 shadow-2xl shadow-brand-primary/20 transition-all group"
                                    >
                                        <ShoppingCart className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                        <span className="uppercase tracking-[0.2em] font-bold text-xs">Initialize Order</span>
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { icon: <ShieldCheck className="w-4 h-4" />, label: 'Gold Purity' },
                                    { icon: <Truck className="w-4 h-4" />, label: 'Fast Transit' },
                                    { icon: <RefreshCcw className="w-4 h-4" />, label: 'Modern Milled' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-3 text-brand-muted">
                                        <div className="text-brand-primary">
                                            {item.icon}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
