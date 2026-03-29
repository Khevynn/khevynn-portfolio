function Dropdown({ error, label, className, options, ...rest }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-inter font-semibold text-zinc-400 tracking-wide uppercase" htmlFor={rest.id}>
          {label}
        </label>
      )}

      <select
        className={`w-full px-4 py-3 bg-[#0a0a0a] border rounded-xl font-inter text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer ${
          error ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-emerald-500/50"
        } ${className}`}
        {...rest}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className="text-zinc-300 bg-[#0a0a0a]"
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}
    </div>
  );
}

export default Dropdown;
