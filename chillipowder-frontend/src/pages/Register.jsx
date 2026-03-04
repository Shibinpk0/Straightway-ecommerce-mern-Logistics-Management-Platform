import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import { User, Mail, Lock, UserPlus, LogIn } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');

    const { register, user, loading } = useContext(AuthContext);
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
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            setMessage(null);
            try {
                await register(name, email, password);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full" />

            <div className="max-w-md w-full relative z-10 py-12">
                <div className="glass-morphism rounded-[2.5rem] border border-brand-muted/10 p-10 md:p-12 shadow-2xl overflow-hidden relative group">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/5 blur-[60px] rounded-full -ml-16 -mb-16 group-hover:bg-brand-primary/10 transition-colors duration-500" />

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-primary/20">
                            <UserPlus className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-3">Join the Elite</h2>
                        <p className="text-brand-muted text-sm font-medium tracking-wide uppercase">Create your master account</p>
                    </div>

                    {(message || error) && (
                        <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-xs font-bold tracking-widest uppercase text-center animate-shake">
                            {message || error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={submitHandler}>
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-3.5 pl-12 pr-4 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted w-5 h-5 group-hover:text-brand-primary transition-colors" />
                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                required
                                className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-3.5 pl-12 pr-4 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted w-5 h-5 group-hover:text-brand-primary transition-colors" />
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                required
                                className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-3.5 pl-12 pr-4 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted w-5 h-5 group-hover:text-brand-primary transition-colors" />
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                required
                                className="w-full bg-brand-muted/5 border border-brand-muted/10 rounded-2xl py-3.5 pl-12 pr-4 text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all group-hover:bg-brand-muted/10"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted w-5 h-5 group-hover:text-brand-primary transition-colors" />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full h-14 btn-premium bg-brand-primary text-white hover:bg-rose-600 flex items-center justify-center space-x-3 shadow-2xl transition-all group"
                            >
                                <span className="uppercase tracking-[0.2em] font-bold text-xs">Initialize Account</span>
                                <UserPlus className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 pt-10 border-t border-brand-muted/10 text-center">
                        <p className="text-brand-muted text-sm mb-4">Already a member?</p>
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            className="inline-flex items-center space-x-2 text-brand-primary font-bold uppercase tracking-widest text-xs hover:underline group"
                        >
                            <span>Verify Identity</span>
                            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
