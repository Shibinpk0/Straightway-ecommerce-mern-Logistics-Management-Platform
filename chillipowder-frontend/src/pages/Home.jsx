import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Zap, ShieldCheck, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-brand-dark overflow-hidden transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20">
                {/* Background Decor */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-xl animate-fade-in-up">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-muted/5 border border-brand-muted/10 text-brand-primary text-xs font-bold tracking-widest uppercase mb-6">
                                <Star className="w-3 h-3" />
                                <span>The Future of Spices</span>
                            </div>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-brand-text mb-6 sm:mb-8 tracking-tight leading-[1.1] sm:leading-[1.1]">
                                Elevate Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-rose-400 to-orange-400">
                                    Culinary Craft
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-brand-muted mb-10 leading-relaxed max-w-lg">
                                Experience the pinnacle of purity with our modern-milled flours and artisan spices. Freshly ground, logically sourced, and delivered with precision.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <Link
                                    to="/shop"
                                    className="btn-premium bg-brand-primary text-white hover:bg-rose-600 shadow-2xl shadow-brand-primary/40 flex items-center group w-full sm:w-auto justify-center"
                                >
                                    Explore Shop <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button className="text-brand-muted hover:text-brand-primary font-medium transition-colors">
                                    Learn Our Process &rarr;
                                </button>
                            </div>
                        </div>

                        <div className="relative animate-blur-in hidden lg:block">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-brand-muted/10 aspect-square">
                                <img
                                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
                                    alt="Spices"
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 glass-morphism rounded-2xl flex flex-col items-center justify-center border border-brand-primary/20 animate-bounce shadow-2xl">
                                <span className="text-brand-primary font-bold text-2xl">100%</span>
                                <span className="text-[10px] uppercase tracking-widest text-brand-muted">Organic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-6">Unrivaled Quality</h2>
                        <p className="text-brand-muted px-4 sm:px-0">We redefine the standard for pantry essentials through advanced milling technology and a commitment to freshness.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Leaf />, title: 'Purely Natural', desc: 'Zero additives or preservatives. Just raw, unadulterated nature in every gram.' },
                            { icon: <Zap />, title: 'Freshly Milled', desc: 'Milled on-demand in our state-of-the-art facility to preserve volatile oils and aroma.' },
                            { icon: <ShieldCheck />, title: 'Quality Verified', desc: 'Rigorous testing protocols ensure every batch meets our elite purity standards.' }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-3xl glass-morphism hover:bg-brand-muted/5 transition-all duration-500 border border-brand-muted/10 hover:border-brand-primary/30">
                                <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary/20 transition-all duration-500">
                                    <div className="text-brand-primary">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-brand-text mb-4">{feature.title}</h3>
                                <p className="text-brand-muted text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Discover Section */}
            <section className="py-24 bg-brand-muted/5">
                <div className="container mx-auto px-6">
                    <div className="glass-morphism rounded-[40px] p-12 md:p-20 overflow-hidden relative border border-brand-muted/10">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/10 blur-[100px] -z-10" />
                        <div className="max-w-2xl px-2 sm:px-0">
                            <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-6 sm:mb-8 text-balance">Ready to revolutionize your kitchen?</h2>
                            <p className="text-lg md:text-xl text-brand-text/80 mb-10 sm:mb-12 opacity-80">Join thousands of chefs and home cooks who trust StraightWay for the ultimate flavor foundation.</p>
                            <Link
                                to="/shop"
                                className="btn-premium inline-block bg-brand-primary text-white hover:bg-rose-600 shadow-2xl shadow-brand-primary/20"
                            >
                                Shop the Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
