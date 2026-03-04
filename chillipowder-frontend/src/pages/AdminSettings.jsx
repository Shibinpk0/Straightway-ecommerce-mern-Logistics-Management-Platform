import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import Loader from '../components/Loader';
import { ArrowLeft, Save, Image as ImageIcon, Layout, Shield } from 'lucide-react';

const AdminSettings = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [backgroundImage, setBackgroundImage] = useState('');
    const [siteName, setSiteName] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchSettings = async () => {
            try {
                const { data } = await api.get('/settings');
                setBackgroundImage(data.backgroundImage);
                setSiteName(data.siteName);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchSettings();
    }, [user, navigate]);

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
            setBackgroundImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert('Image upload failed');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);
        try {
            await api.put('/settings', { backgroundImage, siteName });
            setLoadingUpdate(false);
            alert('Settings updated successfully');
            window.location.reload(); // Refresh to apply global bg
        } catch (error) {
            console.error(error);
            setLoadingUpdate(false);
            alert('Settings update failed');
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

                <div className="max-w-2xl mx-auto">
                    <div className="glass-morphism rounded-[2.5rem] border border-brand-muted/10 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />

                        <div className="px-10 py-8 border-b border-brand-muted/10 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary">
                                    <Layout className="w-6 h-6" />
                                </div>
                                <h1 className="text-2xl font-bold text-brand-text tracking-tight">Global Configuration</h1>
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] text-brand-muted font-bold uppercase tracking-widest bg-brand-muted/5 px-3 py-1.5 rounded-full border border-brand-muted/10">
                                <Shield className="w-3 h-3 text-emerald-500" />
                                <span>Master Level</span>
                            </div>
                        </div>

                        <form onSubmit={submitHandler} className="p-10 space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <Layout className="w-3 h-3" />
                                        <span>Site Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Site designation"
                                        value={siteName}
                                        onChange={(e) => setSiteName(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted ml-1">
                                        <ImageIcon className="w-3 h-3" />
                                        <span>Master Background Asset</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Asset URL or path"
                                        value={backgroundImage}
                                        onChange={(e) => setBackgroundImage(e.target.value)}
                                        className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all hover:bg-brand-muted/10 font-mono text-xs"
                                    />
                                    <input
                                        type="file"
                                        id="bg-file"
                                        onChange={uploadFileHandler}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="bg-file"
                                        className="mt-2 inline-flex items-center px-4 py-2 bg-brand-muted/5 border border-brand-muted/10 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-text hover:bg-brand-muted/10 cursor-pointer transition-all"
                                    >
                                        {uploading ? 'Processing Architecture...' : 'Upload Core Background'}
                                    </label>
                                </div>

                                {backgroundImage && (
                                    <div className="relative group rounded-3xl overflow-hidden border border-white/10 aspect-video">
                                        <img src={backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-brand-dark/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-brand-dark/60 px-4 py-2 rounded-full border border-brand-muted/10">Background Preview</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loadingUpdate}
                                className="w-full btn-premium bg-brand-primary text-white py-5 rounded-3xl flex items-center justify-center space-x-3 shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <Save className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-[0.2em]">{loadingUpdate ? 'Synchronizing...' : 'Apply Global Configuration'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
