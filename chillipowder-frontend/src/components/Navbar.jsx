import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Settings, LayoutDashboard, ChevronDown, Sun, Moon, ShoppingBag } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import ThemeContext from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
    ];

    return (
        <header className={`fixed w-full z-50 transition-all duration-500 px-2 sm:px-4 pt-4 ${scrolled ? 'top-[-4px]' : 'top-0'}`}>
            <nav className={`container mx-auto transition-all duration-500 rounded-2xl ${scrolled
                ? 'glass-dark py-3 px-4 sm:px-6 shadow-2xl scale-[0.98]'
                : 'bg-transparent py-5 px-4'
                }`}>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-gradient-to-tr from-brand-primary to-rose-400 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-brand-primary/20 flex-shrink-0">
                            <span className="text-xl font-bold text-brand-text">SW</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-bold tracking-tight text-brand-text leading-tight">
                                Straight<span className="text-brand-primary">Way</span>
                            </span>
                            <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-brand-muted opacity-70 -mt-0.5 sm:-mt-1">
                                Flour & Oil Mill
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative text-sm font-medium transition-colors hover:text-brand-primary ${location.pathname === link.path ? 'text-brand-primary' : 'text-brand-muted'
                                        }`}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary rounded-full animate-fade-in" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="h-6 w-px bg-slate-700 mx-2" />

                        {/* Actions */}
                        <div className="flex items-center space-x-5">
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-brand-muted hover:text-brand-primary transition-colors focus:outline-none"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <Link to="/cart" className="relative group p-2 text-brand-muted hover:text-brand-primary transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-brand-primary text-brand-text text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 p-1 pl-2 bg-brand-surface hover:bg-brand-muted/ border border-brand-muted/20 rounded-full transition-all duration-300"
                                    >
                                        <span className="text-xs font-medium text-brand-text/80">{user.name}</span>
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-muted/20 to-brand-muted/40 border border-brand-muted/20 flex items-center justify-center">
                                            <User className="w-4 h-4 text-brand-muted" />
                                        </div>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                            <div className="absolute right-0 mt-3 w-48 glass-dark rounded-xl py-2 z-20 animate-fade-in-up">
                                                {user.isAdmin && (
                                                    <Link to="/admin" className="flex items-center px-4 py-2.5 text-sm text-brand-text/80 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors">
                                                        <LayoutDashboard className="w-4 h-4 mr-3 text-brand-primary" />
                                                        Dashboard
                                                    </Link>
                                                )}
                                                <Link to="/myorders" className="flex items-center px-4 py-2.5 text-sm text-brand-text/80 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors">
                                                    <ShoppingBag className="w-4 h-4 mr-3 text-brand-primary" />
                                                    My Orders
                                                </Link>
                                                <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm text-brand-text/80 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors">
                                                    <Settings className="w-4 h-4 mr-3" />
                                                    Settings
                                                </Link>
                                                <div className="h-px bg-brand-muted/ my-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4 mr-3" />
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="btn-premium bg-brand-primary text-white hover:bg-rose-600 shadow-lg shadow-brand-primary/20 text-sm">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-brand-muted hover:text-brand-primary transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                        </button>
                        <Link to="/cart" className="relative p-2 text-brand-muted">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-brand-primary text-brand-text text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 text-brand-text/80 hover:text-brand-primary transition-colors"
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar (Slide-in) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-[280px] bg-brand-dark shadow-2xl animate-slide-in-right p-6 flex flex-col border-l border-brand-muted/10">
                        <div className="flex items-center justify-between mb-10">
                            <span className="text-xl font-bold text-brand-text">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-brand-muted hover:text-brand-primary">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-lg font-medium p-4 rounded-xl transition-all ${location.pathname === link.path
                                        ? 'bg-brand-primary/10 text-brand-primary pl-6 border-l-4 border-brand-primary'
                                        : 'text-brand-muted hover:bg-brand-primary/5 hover:text-brand-primary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {user && (
                                <Link to="/myorders" className={`text-lg font-medium p-4 rounded-xl transition-all ${location.pathname === '/myorders'
                                    ? 'bg-brand-primary/10 text-brand-primary pl-6 border-l-4 border-brand-primary'
                                    : 'text-brand-muted hover:bg-brand-primary/5 hover:text-brand-primary'}`}>
                                    My Orders
                                </Link>
                            )}
                            {user && user.isAdmin && (
                                <Link to="/admin" className="text-lg font-medium p-4 text-slate-400 hover:bg-brand-muted/ rounded-xl">
                                    Admin Dashboard
                                </Link>
                            )}
                        </div>

                        <div className="mt-auto pt-10 border-t border-brand-muted/10">
                            {user ? (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-4 bg-brand-surface rounded-2xl border border-brand-muted/10">
                                        <div className="w-10 h-10 rounded-full bg-brand-muted/10 border border-brand-muted/20 flex items-center justify-center">
                                            <User className="w-5 h-5 text-brand-muted" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-brand-text leading-tight">{user.name}</span>
                                            <span className="text-xs text-brand-muted">{user.email}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full btn-premium bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="w-full btn-premium bg-brand-primary text-brand-text block text-center">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
