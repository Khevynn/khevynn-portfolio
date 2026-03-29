function TextArea({ error, label, className, ...rest }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-inter font-semibold text-zinc-400 tracking-wide uppercase" htmlFor={rest.id}>
          {label}
        </label>
      )}

      <textarea
        className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl font-inter text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all min-h-[120px] resize-y ${
          error ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-emerald-500/50"
        } ${className}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}
    </div>
  );
}

export default TextArea;
