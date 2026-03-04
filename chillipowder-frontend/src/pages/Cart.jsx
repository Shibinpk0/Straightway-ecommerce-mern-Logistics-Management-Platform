import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import CartContext from '../context/CartContext';
import CartItem from '../components/CartItem';
import AuthContext from '../context/AuthContext';

const Cart = () => {
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=checkout');
        } else {
            navigate('/checkout');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-brand-dark pt-40 pb-20 flex flex-col items-center text-center px-6">
                <div className="relative mb-12 animate-blur-in">
                    <div className="w-32 h-32 bg-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/20">
                        <ShoppingBag className="w-12 h-12 text-brand-primary" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-muted/ rounded-full blur-xl animate-pulse" />
                </div>

                <h2 className="text-4xl font-bold text-brand-text mb-4 tracking-tight">Your Cart is Pristine</h2>
                <p className="text-brand-muted mb-12 max-w-sm">Elevate your pantry by selecting from our elite collection of spices and flours.</p>

                <Link
                    to="/shop"
                    className="btn-premium bg-brand-primary text-white hover:bg-rose-600 px-10 py-4 shadow-2xl shadow-brand-primary/20 flex items-center group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Explore the Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-2">Shopping <span className="text-brand-primary">Cart</span></h1>
                        <p className="text-brand-muted font-medium">You have {cartItems.reduce((acc, item) => acc + item.qty, 0)} items in your selection.</p>
                    </div>

                    <button
                        onClick={clearCart}
                        className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-rose-500 transition-colors py-2 px-4 rounded-xl hover:bg-brand-muted/5"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Purge Cart</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Cart Items */}
                    <div className="w-full lg:flex-grow">
                        <div className="glass-morphism rounded-[2rem] sm:rounded-[2.5rem] border border-brand-muted/10 p-6 md:p-12 shadow-2xl">
                            {cartItems.map((item) => (
                                <CartItem key={item.product} item={item} />
                            ))}
                        </div>

                        <div className="mt-8">
                            <Link to="/shop" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-primary transition-colors group">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Return to Shop
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[400px] shrink-0 sticky top-32">
                        <div className="glass-dark rounded-[2rem] sm:rounded-[2.5rem] border border-brand-muted/10 p-8 sm:p-10 shadow-2xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-[60px] rounded-full -mr-16 -mt-16" />

                            <h2 className="text-2xl font-bold text-brand-text mb-10 tracking-tight">Order Summary</h2>

                            <div className="space-y-6 mb-10 text-brand-muted">
                                <div className="flex justify-between items-center bg-brand-muted/5 rounded-2xl p-4 border border-brand-muted/10">
                                    <span className="text-xs font-bold uppercase tracking-widest">Subtotal</span>
                                    <span className="text-brand-text font-bold">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-center bg-brand-muted/5 rounded-2xl p-4 border border-brand-muted/10">
                                    <span className="text-xs font-bold uppercase tracking-widest">Est. Shipping</span>
                                    <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest bg-emerald-400/10 px-2 py-1 rounded-md">Complimentary</span>
                                </div>

                                <div className="pt-6 border-t border-brand-muted/10 flex justify-between items-center">
                                    <span className="text-brand-text font-bold text-lg tracking-tight">Total Investment</span>
                                    <span className="text-brand-text font-bold text-3xl tracking-tighter">₹{cartTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={checkoutHandler}
                                className="w-full h-16 btn-premium bg-brand-primary text-white hover:bg-rose-600 flex items-center justify-center space-x-3 shadow-2xl shadow-brand-primary/20 transition-all group"
                            >
                                <span className="uppercase tracking-[0.2em] font-bold text-xs">Proceed to Checkout</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="mt-6 text-center text-[10px] text-brand-muted font-bold uppercase tracking-widest">
                                Secure Encrypted Transaction
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
