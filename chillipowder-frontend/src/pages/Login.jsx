import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [navigate, user, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full" />

            <div className="max-w-md w-full relative z-10">
                <div className="glass-morphism rounded-[2.5rem] border border-brand-muted/ p-10 md:p-12 shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-colors duration-500" />

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-primary/20">
                            <Lock className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-3">Welcome Back</h2>
                        <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">Authenticate to your profile</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-xs font-bold tracking-widest uppercase text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div className="space-y-4">
                            <div className="relative group">
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-brand-muted/ border border-brand-muted/ rounded-2xl py-4 pl-12 pr-4 text-brand-text placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 group-hover:text-brand-primary transition-colors" />
                            </div>

                            <div className="relative group">
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-brand-muted/ border border-brand-muted/ rounded-2xl py-4 pl-12 pr-4 text-brand-text placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 group-hover:text-brand-primary transition-colors" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full h-14 btn-premium bg-brand-primary text-white hover:bg-rose-600 flex items-center justify-center space-x-3 shadow-2xl shadow-brand-primary/20 transition-all group h-14"
                            >
                                <span className="uppercase tracking-[0.2em] font-bold text-xs">Verify & Enter</span>
                                <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 pt-10 border-t border-brand-muted/ text-center">
                        <p className="text-slate-500 text-sm mb-4">New to our collection?</p>
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}
                            className="inline-flex items-center space-x-2 text-brand-primary font-bold uppercase tracking-widest text-xs hover:underline group"
                        >
                            <span>Initialize New Account</span>
                            <UserPlus className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
