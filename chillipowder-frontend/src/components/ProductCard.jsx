import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Plus } from 'lucide-react';
import { useContext } from 'react';
import CartContext from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="group relative glass-dark rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-brand-muted/10 hover:border-brand-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10">
            {/* Image Container */}
            <div className="relative pt-[120%] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-brand-dark/20">
                    <Link
                        to={`/product/${product._id}`}
                        className="p-4 bg-brand-primary hover:bg-rose-600 rounded-full text-white transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl"
                    >
                        <Eye className="w-6 h-6" />
                    </Link>
                </div>

                {/* Badge */}
                <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md ${product.countInStock > 0
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}>
                    {product.countInStock > 0 ? 'Available' : 'Sold Out'}
                </span>

                {product.discountRate > 0 && (
                    <span className="absolute top-6 left-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md bg-brand-primary/20 border-brand-primary/30 text-brand-primary">
                        {product.discountRate}% OFF
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.2em]">
                        {product.category}
                    </span>
                    <div className="flex flex-col items-end">
                        <span className="text-xl font-bold text-brand-text tracking-tight">
                            ₹{product.price}
                        </span>
                        {product.mrp > product.price && (
                            <span className="text-[10px] text-slate-500 line-through">
                                ₹{product.mrp}
                            </span>
                        )}
                    </div>
                </div>

                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-bold text-brand-text mb-1 line-clamp-1 group-hover:text-brand-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-[10px] text-brand-muted font-mono mb-4">{product.size || '500g'}</p>
                </Link>

                <p className="text-slate-500 text-sm line-clamp-2 mb-8 leading-relaxed">
                    {product.description}
                </p>

                <button
                    onClick={() => addToCart(product, 1)}
                    disabled={product.countInStock === 0}
                    className={`w-full btn-premium flex items-center justify-center space-x-2 ${product.countInStock > 0
                        ? 'bg-brand-primary text-white hover:bg-rose-600 group/btn shadow-lg shadow-brand-primary/20'
                        : 'bg-brand-muted/10 text-brand-muted cursor-not-allowed border border-brand-muted/10'
                        }`}
                >
                    <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90" />
                    <span className="text-xs sm:text-sm uppercase tracking-wider sm:tracking-normal">{product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
