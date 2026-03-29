import { MapPin } from "lucide-react";

function EducationBox({ title, provider, location, period, description, image }) {
  return (
    <div className="group relative flex flex-col gap-6 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 w-full hover:bg-white/[0.04] transition-all duration-300">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image */}
      {image && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#050505] border border-white/10 shadow-xl">
          <img
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            src={image}
            alt={provider}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3 relative z-10">
        {period && (
          <span className="text-xs font-inter font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit backdrop-blur-sm">
            {period}
          </span>
        )}

        <h1 className="text-xl lg:text-2xl text-zinc-100 font-outfit font-bold group-hover:text-emerald-400 transition-colors mt-1">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-sm font-inter">
          <h2 className="font-semibold text-zinc-300">{provider}</h2>
          <span className="hidden sm:block text-zinc-700">|</span>
          <h3 className="text-zinc-500 flex items-center gap-1.5 font-medium">
            <MapPin size={14} className="text-emerald-500/70 shrink-0" />
            {location}
          </h3>
        </div>

        <p className="font-inter text-zinc-400 text-[0.95rem] leading-relaxed mt-2 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}

export default EducationBox;
