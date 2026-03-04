const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-brand-dark">
            <div className="relative">
                <div className="w-24 h-24 rounded-full border-t-2 border-brand-primary animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center font-bold text-brand-primary animate-pulse">CP</div>
                </div>
            </div>
            <p className="mt-8 text-slate-500 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">Initializing...</p>
        </div>
    );
};

export default Loader;
