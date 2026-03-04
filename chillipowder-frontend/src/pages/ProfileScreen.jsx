import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import Loader from '../components/Loader';
import { User, Mail, Lock, ShieldCheck, CheckCircle, Save, ArrowLeft } from 'lucide-react';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [navigate, user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        setMessage(null);
        setSuccess(false);

        try {
            const { data } = await api.put('/auth/profile', {
                name,
                email,
                password,
            });

            // Update local user state
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));

            setSuccess(true);
            setLoading(false);
            setPassword('');
            setConfirmPassword('');

            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-brand-muted hover:text-brand-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back</span>
                </button>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tighter mb-4 flex items-center">
                        Account <span className="text-brand-primary ml-3">Settings</span>
                    </h1>
                    <p className="text-brand-muted font-medium">Manage your digital identity and security parameters.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Security Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass-morphism rounded-[2.5rem] p-8 border border-brand-muted/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-colors duration-500" />

                            <div className="relative z-10 text-center">
                                <div className="w-20 h-20 bg-gradient-to-tr from-brand-primary to-rose-400 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-brand-primary/20 mb-6">
                                    <User className="w-10 h-10 text-brand-text" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-text mb-1">{user?.name}</h3>
                                <p className="text-xs text-brand-muted font-bold uppercase tracking-widest mb-6">{user?.isAdmin ? 'Security Administrator' : 'Verified Merchant'}</p>

                                <div className="flex items-center justify-center space-x-2 text-emerald-400 bg-emerald-400/10 py-2 px-4 rounded-full border border-emerald-400/20">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Account Protected</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-dark rounded-[2rem] p-6 border border-brand-muted/10">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-4 opacity-70">Security Checklist</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs text-brand-text/80">Encrypted transmission</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs text-brand-text/80">HMAC Authentication</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="glass-morphism rounded-[2.5rem] p-8 sm:p-12 border border-brand-muted/10 shadow-2xl relative overflow-hidden">
                            {loading && (
                                <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-[2.5rem]">
                                    <Loader />
                                </div>
                            )}

                            <form onSubmit={submitHandler} className="space-y-8">
                                {message && (
                                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-bold flex items-center animate-shake">
                                        <ShieldCheck className="w-5 h-5 mr-3 shrink-0" />
                                        {message}
                                    </div>
                                )}

                                {success && (
                                    <div className="p-4 bg-emerald-500/10 border border-emerald-400/20 rounded-2xl text-emerald-400 text-sm font-bold flex items-center animate-fade-in">
                                        <CheckCircle className="w-5 h-5 mr-3 shrink-0" />
                                        Profile synchronization successful.
                                    </div>
                                )}

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-3 ml-1">Full Identity</label>
                                        <div className="relative">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted group-focus-within:text-brand-primary transition-colors" />
                                            <input
                                                type="text"
                                                className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-5 pl-14 pr-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                                placeholder="Enter full name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-3 ml-1">Communications Hub (Email)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted group-focus-within:text-brand-primary transition-colors" />
                                            <input
                                                type="email"
                                                className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-5 pl-14 pr-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                                placeholder="Enter email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-muted/10">
                                        <div className="group">
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-3 ml-1">New Access Key (Password)</label>
                                            <div className="relative">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted group-focus-within:text-brand-primary transition-colors" />
                                                <input
                                                    type="password"
                                                    className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-5 pl-14 pr-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-3 ml-1">Confirm Protocol</label>
                                            <div className="relative">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted group-focus-within:text-brand-primary transition-colors" />
                                                <input
                                                    type="password"
                                                    className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-5 pl-14 pr-6 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                                    placeholder="••••••••"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full h-16 btn-premium bg-brand-primary text-white hover:bg-rose-600 flex items-center justify-center space-x-3 shadow-2xl transition-all group mt-10"
                                >
                                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="uppercase tracking-[0.2em] font-bold text-xs">Commit Updates</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
