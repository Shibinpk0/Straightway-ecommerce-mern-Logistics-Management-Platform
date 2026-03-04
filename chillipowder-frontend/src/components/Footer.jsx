const Footer = () => {
    return (
        <footer className="bg-brand-dark border-t border-brand-muted/ text-slate-400 py-12 sm:py-16 mt-auto relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-brand-primary/5 blur-[100px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center font-bold text-brand-text text-xs">SW</div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-brand-text tracking-tight leading-none">Straight<span className="text-brand-primary">Way</span></span>
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 mt-0.5">Flour & Oil Mill</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                            Merging tradition with technology to deliver the world's finest spices and flours. Redefining your pantry, one batch at a time.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-brand-text font-bold mb-6 tracking-wider uppercase text-xs">Navigation</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/" className="hover:text-brand-primary transition-colors">Home</a></li>
                            <li><a href="/shop" className="hover:text-brand-primary transition-colors">Shop</a></li>
                            <li><a href="/cart" className="hover:text-brand-primary transition-colors">Cart</a></li>
                            <li><a href="/about" className="hover:text-brand-primary transition-colors">Our Story</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-text font-bold mb-6 tracking-wider uppercase text-xs">Support</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/shipping" className="hover:text-brand-primary transition-colors">Shipping Policy</a></li>
                            <li><a href="/returns" className="hover:text-brand-primary transition-colors">Returns & Refunds</a></li>
                            <li><a href="/faq" className="hover:text-brand-primary transition-colors">FAQ</a></li>
                            <li><a href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-text font-bold mb-6 tracking-wider uppercase text-xs">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center space-x-3">
                                <span className="text-brand-primary opacity-60">📍</span>
                                <span>123 Spice Street, Mill Town, India</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-brand-primary opacity-60">✉️</span>
                                <span>concierge@straightway.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="text-brand-primary opacity-60">📞</span>
                                <span>+91 98765 43210</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-brand-muted/ flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs tracking-widest uppercase">
                    <p className="text-center md:text-left">&copy; {new Date().getFullYear()} StraightWay. Defined by Quality.</p>
                    <div className="flex space-x-6 mt-6 md:mt-0 opacity-60">
                        <a href="#" className="hover:text-brand-text transition-colors">Instagram</a>
                        <a href="#" className="hover:text-brand-text transition-colors">Twitter</a>
                        <a href="#" className="hover:text-brand-text transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
