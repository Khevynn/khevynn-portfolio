import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

/**
 * ProjectGallery - navigable image gallery with lightbox and zoom.
 *
 * Props:
 *   images: string[]  - ordered array of image URLs (cover first)
 *   altPrefix: string - alt text prefix (project name)
 */
function ProjectGallery({ images = [], altPrefix = "Project" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const validImages = images.filter(Boolean);
  if (validImages.length === 0) return null;

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? validImages.length - 1 : i - 1));
    setZoomed(false);
  }, [validImages.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === validImages.length - 1 ? 0 : i + 1));
    setZoomed(false);
  }, [validImages.length]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") {
        setLightboxOpen(false);
        setZoomed(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  return (
    <>
      {/* Main viewer */}
      <div className="flex flex-col gap-4 w-full">
        {/* Primary image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#050505] border border-white/5 group cursor-pointer"
             onClick={() => setLightboxOpen(true)}>
          <img
            src={validImages[activeIndex]}
            alt={`${altPrefix} - image ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 text-white text-xs font-inter font-semibold">
              <Maximize2 size={14} />
              Open Lightbox
            </div>
          </div>

          {/* Navigation arrows (only if multiple images) */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Counter */}
          {validImages.length > 1 && (
            <div className="absolute bottom-3 right-3 text-[10px] font-inter font-bold bg-black/60 text-zinc-300 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {activeIndex + 1} / {validImages.length}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {validImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {validImages.map((img, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); setZoomed(false); }}
                className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === activeIndex
                    ? "border-emerald-500 opacity-100"
                    : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/30"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md">
          {/* Controls bar */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => setZoomed((z) => !z)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={zoomed ? "Zoom out" : "Zoom in"}
            >
              {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
            <button
              onClick={() => { setLightboxOpen(false); setZoomed(false); }}
              className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/50 text-white transition-colors"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Image */}
          <div className={`relative flex items-center justify-center max-w-[90vw] max-h-[85vh] transition-all duration-300 ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
               onClick={() => setZoomed((z) => !z)}>
            <img
              src={validImages[activeIndex]}
              alt={`${altPrefix} - image ${activeIndex + 1}`}
              className={`object-contain rounded-xl shadow-2xl transition-transform duration-300 ${
                zoomed
                  ? "max-w-[160vw] max-h-[160vh] scale-150"
                  : "max-w-[85vw] max-h-[80vh]"
              }`}
              style={{ pointerEvents: "none" }}
            />
          </div>

          {/* Navigation in lightbox */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Counter + keyboard hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs font-inter text-zinc-400">
            <span>{activeIndex + 1} / {validImages.length}</span>
            <span className="text-zinc-600">·</span>
            <span>← → Navigate · Esc Close · Click to zoom</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectGallery;
