function Button({ className, children, onClick, type = "button", disabled }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl bg-emerald-600 border border-emerald-500 px-6 py-2.5 font-inter text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
