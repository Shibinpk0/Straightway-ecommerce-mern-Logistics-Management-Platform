import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import ProductEditScreen from './pages/ProductEditScreen';
import AdminSettings from './pages/AdminSettings';
import OrderScreen from './pages/OrderScreen';
import MyOrdersScreen from './pages/MyOrdersScreen';
import ProfileScreen from './pages/ProfileScreen';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import api from './services/api';

function App() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await api.get('/settings');
                setSettings(data);
            } catch (error) {
                console.error('Failed to fetch settings', error);
            }
        };
        fetchSettings();
    }, []);

    const bgStyle = settings?.backgroundImage
        ? { backgroundImage: `url(${settings.backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }
        : {};

    return (
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <div className="flex flex-col min-h-screen relative transition-colors duration-300 bg-brand-dark text-brand-text" style={bgStyle}>
                            {/* Overlay for readability if BG is present */}
                            {settings?.backgroundImage && (
                                <div className="absolute inset-0 bg-brand-dark/70 dark:bg-brand-dark/80 pointer-events-none transition-colors duration-300" />
                            )}

                            <div className="relative z-10 flex flex-col min-h-screen">
                                <Navbar />
                                <main className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/shop" element={<Shop />} />
                                        <Route path="/product/:id" element={<ProductDetails />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/checkout" element={<Checkout />} />
                                        <Route path="/admin" element={<AdminDashboard />} />
                                        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                                        <Route path="/admin/settings" element={<AdminSettings />} />
                                        <Route path="/order/:id" element={<OrderScreen />} />
                                        <Route path="/myorders" element={<MyOrdersScreen />} />
                                        <Route path="/profile" element={<ProfileScreen />} />
                                    </Routes>
                                </main>
                                <Footer />
                            </div>
                        </div>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
