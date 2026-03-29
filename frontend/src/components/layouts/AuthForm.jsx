function AuthForm({ children, title, onSubmit, className }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <h2 className="text-4xl font-outfit font-extrabold text-center text-white mb-8 tracking-tight">
          {title}
        </h2>
        
        <form
          onSubmit={onSubmit}
          className={`flex flex-col gap-6 bg-white/[0.02] backdrop-blur-2xl p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl ${className}`}
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
