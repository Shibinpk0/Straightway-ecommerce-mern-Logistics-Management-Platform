import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Package, Tag, FileText, Database, Shield, Edit } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import AuthContext from '../context/AuthContext';

const ProductEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [mrp, setMrp] = useState(0);
    const [discountRate, setDiscountRate] = useState(0);
    const [size, setSize] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand || '');
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setMrp(data.mrp || 0);
                setDiscountRate(data.discountRate || 0);
                setSize(data.size || '');
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                alert('Could not synchronize product state');
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, user, navigate]);

    // Internal synchronization logic: MRP & Discount -> Price
    useEffect(() => {
        if (mrp > 0) {
            const calculatedPrice = Math.round(mrp * (1 - discountRate / 100));
            if (calculatedPrice !== Number(price)) {
                setPrice(calculatedPrice);
            }
        }
    }, [mrp, discountRate, price]);

    const handlePriceChange = (val) => {
        const newPrice = Number(val);
        setPrice(newPrice);
        if (mrp > 0 && newPrice <= mrp) {
            const newDiscount = Math.round(((mrp - newPrice) / mrp) * 100);
            if (newDiscount !== discountRate) {
                setDiscountRate(newDiscount);
            }
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await api.post('/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            alert(`Image upload failed: ${message}`);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);
        try {
            await api.put(`/products/${id}`, {
                name,
                price: Number(price),
                image,
                brand,
                category,
                countInStock: Number(countInStock),
                description,
                mrp: Number(mrp),
                discountRate: Number(discountRate),
                size,
            });
            setLoadingUpdate(false);
            alert('Product Schema Updated!');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            setLoadingUpdate(false);
            alert('Protocol update failed');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-24 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <Link to="/admin" className="group inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-primary transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Return to Control Center
                </Link>

                <div className="max-w-4xl mx-auto">
                    <div className="glass-morphism rounded-[2.5rem] border border-brand-muted/10 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />

                        <div className="px-10 py-8 border-b border-brand-muted/10 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary">
                                    <Edit className="w-6 h-6" />
                                </div>
                                <h1 className="text-2xl font-bold text-brand-text tracking-tight">Modify Entity <span className="text-brand-muted font-mono text-xs ml-2">#{(id || '').slice(-6).toUpperCase()}</span></h1>
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest bg-brand-muted/5 px-3 py-1.5 rounded-full border border-brand-muted/10">
                                <Shield className="w-3 h-3 text-emerald-500" />
                                <span>Secured Interface</span>
                            </div>
                        </div>

                        <form onSubmit={submitHandler} className="p-10 space-y-8">
                            {/* Primary Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Package className="w-3 h-3" />
                                        <span>Product Designation</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Identification name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Tag className="w-3 h-3" />
                                        <span>Current Price (INR)</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Selling price"
                                        value={price}
                                        onChange={(e) => handlePriceChange(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Database className="w-3 h-3" />
                                        <span>Brand Association</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Merchant brand"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Database className="w-3 h-3" />
                                        <span>Product Size (e.g. 500g)</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Physical dimensions or weight"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Financials */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Database className="w-3 h-3" />
                                        <span>Maximum Retail Price (MRP)</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="MRP"
                                        value={mrp}
                                        onChange={(e) => setMrp(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Tag className="w-3 h-3" />
                                        <span>Discount Rate (%)</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Discount percentage"
                                        value={discountRate}
                                        onChange={(e) => setDiscountRate(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Logistics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Database className="w-3 h-3" />
                                        <span>Inventory Quantum</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Stock count"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Tag className="w-3 h-3" />
                                        <span>Categorization</span>
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10 appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled className="bg-brand-dark">Select Category</option>
                                        <option value="Flour" className="bg-brand-dark">Flour</option>
                                        <option value="Spices" className="bg-brand-dark">Spices</option>
                                        <option value="Salt" className="bg-brand-dark">Salt</option>
                                        <option value="Oil" className="bg-brand-dark">Oil</option>
                                        <option value="Blends" className="bg-brand-dark">Blends</option>
                                        <option value="Others" className="bg-brand-dark">Others</option>
                                    </select>
                                </div>
                            </div>

                            {/* Assets */}
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <FileText className="w-3 h-3" />
                                        <span>Visual Asset Link</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Direct image source URL"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10 font-mono text-xs"
                                        required
                                    />
                                    <input
                                        type="file"
                                        id="image-file"
                                        onChange={uploadFileHandler}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image-file"
                                        className="mt-2 inline-flex items-center px-4 py-2 bg-brand-muted/5 border border-brand-muted/10 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-text hover:bg-brand-muted/10 cursor-pointer transition-all"
                                    >
                                        {uploading ? 'Processing Architecture...' : 'Upload Direct Asset'}
                                    </label>
                                </div>

                                {image && (
                                    <div className="p-6 bg-brand-muted/5 border border-brand-muted/10 rounded-3xl flex flex-col items-center">
                                        <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest mb-4">Master View Preview</span>
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden border border-brand-muted/10 shadow-2xl">
                                            <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <FileText className="w-3 h-3" />
                                        <span>Description Manifest</span>
                                    </label>
                                    <textarea
                                        placeholder="Detailed entity information..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="5"
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10 resize-none"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loadingUpdate}
                                    className={`w-full h-16 btn-premium bg-brand-primary text-white hover:bg-rose-600 flex items-center justify-center space-x-3 shadow-2xl transition-all group ${loadingUpdate ? 'opacity-50 cursor-wait' : ''}`}
                                >
                                    <span className="uppercase tracking-[0.2em] font-bold text-xs">{loadingUpdate ? 'Synchronizing State...' : 'Commit Changes'}</span>
                                    {!loadingUpdate && <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditScreen;
