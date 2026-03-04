import { Trash2, Plus, Minus } from 'lucide-react';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
    const { addToCart, removeFromCart } = useContext(CartContext);

    return (
        <div className="group flex flex-col md:flex-row items-center justify-between py-8 border-b border-brand-muted/10 last:border-0">
            <div className="flex items-center w-full md:w-auto mb-6 md:mb-0">
                <div className="relative w-24 h-24 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-2xl border border-brand-muted/10"
                    />
                </div>
                <div className="ml-6 flex-grow">
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mb-1 block">
                        {item.category}
                    </span>
                    <Link to={`/product/${item.product}`} className="text-lg font-bold text-brand-text hover:text-brand-primary transition-colors block mb-1">
                        {item.name}
                    </Link>
                    <div className="flex items-center space-x-3">
                        <p className="text-brand-muted font-bold">₹{item.price}</p>
                        <span className="text-[10px] text-brand-muted font-mono bg-brand-muted/5 px-2 py-0.5 rounded-lg border border-brand-muted/10">{item.size || '500g'}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto md:space-x-12">
                <div className="flex items-center bg-brand-muted/5 border border-brand-muted/10 rounded-xl p-1">
                    <button
                        className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all disabled:opacity-20 border border-brand-muted/10"
                        onClick={() => addToCart(item, item.qty - 1)}
                        disabled={item.qty <= 1}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-brand-text">
                        {item.qty}
                    </span>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all disabled:opacity-20 border border-brand-muted/10"
                        onClick={() => addToCart(item, item.qty + 1)}
                        disabled={item.qty >= item.countInStock}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="text-right">
                        <p className="text-[10px] text-brand-muted uppercase tracking-widest mb-1">Subtotal</p>
                        <p className="font-bold text-brand-text">₹{item.price * item.qty}</p>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.product)}
                        className="p-2 text-brand-muted hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
