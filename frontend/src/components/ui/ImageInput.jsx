import { Upload } from "lucide-react";

function ImageInput({ error, onChange, label, ...rest }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <label className="text-sm font-inter font-semibold text-zinc-400 tracking-wide uppercase" htmlFor={rest.id}>
          {label}
        </label>
      )}
      <div className="flex items-center">
        <label
          htmlFor={rest.id}
          className={`group cursor-pointer flex flex-col items-center justify-center w-full min-h-[140px] border-2 border-dashed rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-300 ${
            error ? "border-red-500/50 bg-red-500/5" : "border-white/10"
          }`}
        >
          <div className="p-3 rounded-full bg-white/5 border border-white/10 mb-3 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
            <Upload className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-zinc-400 text-sm font-inter font-medium">
            <span className="text-emerald-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-zinc-500 text-xs font-inter mt-1">PNG, JPG or WebP (max. 5MB)</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...rest}
            id={rest.id}
            onChange={onChange}
          />
        </label>
      </div>
      {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}
    </div>
  );
}

export default ImageInput;
