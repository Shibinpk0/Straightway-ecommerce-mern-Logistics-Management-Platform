import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { Search, SlidersHorizontal, PackageSearch, X, RotateCcw } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);

                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    const addRecentSearch = (term) => {
        if (!term.trim() || recentSearches.includes(term)) return;
        const newSearches = [term, ...recentSearches.slice(0, 4)];
        setRecentSearches(newSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    };

    const removeRecentSearch = (term) => {
        const newSearches = recentSearches.filter(t => t !== term);
        setRecentSearches(newSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            {/* Header Area */}
            <div className="container mx-auto px-6 mb-16 text-center md:text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4 tracking-tight">
                            The <span className="text-brand-primary">Collection</span>
                        </h1>
                        <p className="text-brand-muted max-w-md">Browse our curated selection of ultra-fine flours and elite spice blends.</p>
                    </div>
                </div>
            </div>

            {/* Filtering System */}
            <div className="container mx-auto px-4 sm:px-6 mb-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 p-6 sm:p-8 glass-morphism rounded-[2rem] sm:rounded-[2.5rem] border border-brand-muted/10 shadow-2xl">
                    {/* Search */}
                    <div className="relative flex-grow max-w-md group">
                        <input
                            type="text"
                            placeholder="Find your flavor..."
                            className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-3.5 pl-12 pr-4 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onBlur={() => addRecentSearch(searchTerm)}
                            onKeyDown={(e) => e.key === 'Enter' && addRecentSearch(searchTerm)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted w-5 h-5 group-hover:text-brand-primary transition-colors" />

                        {recentSearches.length > 0 && searchTerm === '' && (
                            <div className="absolute top-full left-0 right-0 mt-3 flex flex-wrap gap-2 animate-fade-in z-20">
                                {recentSearches.map((term) => (
                                    <div key={term} className="flex items-center space-x-2 bg-brand-muted/10 border border-brand-muted/20 px-3 py-1.5 rounded-xl transition-all hover:border-brand-primary/40 group/pill">
                                        <button
                                            onClick={() => setSearchTerm(term)}
                                            className="text-[10px] font-bold text-brand-muted group-hover/pill:text-brand-text uppercase tracking-wider"
                                        >
                                            {term}
                                        </button>
                                        <button onClick={() => removeRecentSearch(term)}>
                                            <X className="w-3 h-3 text-brand-muted hover:text-rose-500 transition-colors" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => { setRecentSearches([]); localStorage.removeItem('recentSearches'); }}
                                    className="p-1.5 text-brand-muted hover:text-brand-primary transition-colors"
                                    title="Wipe Memory"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0">
                        <div className="flex items-center text-brand-muted mr-1 sm:mr-4 whitespace-nowrap sticky left-0 bg-brand-dark lg:bg-transparent z-10 px-2 sm:px-0 lg:static">
                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">Categories</span>
                        </div>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap border ${category === cat
                                    ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                    : 'bg-brand-muted/10 border-brand-muted/10 text-brand-muted hover:bg-brand-muted/20 hover:text-brand-text'
                                    }`}
                            >
                                {cat === 'Spieces' ? 'Spices' : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Display */}
            <div className="container mx-auto px-6">
                {filteredProducts.length === 0 ? (
                    <div className="py-32 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-brand-muted/5 rounded-full flex items-center justify-center mb-6 text-brand-muted">
                            <PackageSearch className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-text mb-2">No Matches Found</h3>
                        <p className="text-brand-muted">Try adjusting your filters or search term.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setCategory('All'); }}
                            className="mt-6 text-brand-primary font-bold hover:underline"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
