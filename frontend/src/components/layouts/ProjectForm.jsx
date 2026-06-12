import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X, Star, Eye, EyeOff } from "lucide-react";

import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import ImageInput from "../ui/ImageInput";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";

const CATEGORIES = [
  { value: "Backend", label: "Backend" },
  { value: "Full Stack", label: "Full Stack" },
  { value: "Frontend", label: "Frontend" },
  { value: "Game Dev", label: "Game Dev" },
  { value: "Other", label: "Other" },
];

const STATUS_OPTIONS = [
  { value: "Completed", label: "Completed" },
  { value: "In Progress", label: "In Progress" },
  { value: "Not Started", label: "Not Started" },
];

function ProjectForm({ project, onSubmit, isPending, projectError, hasDeleteButton, onDelete }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      shortDescription: project?.shortDescription || "",
      detailedDescription: project?.detailedDescription || "",
      category: project?.category || "Backend",
      status: project?.status || "In Progress",
      usedTechnologies: project?.usedTechnologies || "",
      githubUrl: project?.githubUrl || "",
      downloadUrl: project?.downloadUrl || "",
      liveDemoUrl: project?.liveDemoUrl || "",
      documentationUrl: project?.documentationUrl || "",
      videoDemoUrl: project?.videoDemoUrl || "",
      displayOrder: project?.displayOrder || 0,
      images: null,
      imageUrl: project?.imageUrl || "",
    },
  });

  // Controlled states for complex fields
  const [isFeatured, setIsFeatured] = useState(
    project?.isFeatured === 1 || project?.isFeatured === true
  );
  const [isPublished, setIsPublished] = useState(
    project?.isPublished !== 0 && project?.isPublished !== false
  );
  const [techTags, setTechTags] = useState(
    Array.isArray(project?.techTags) ? project.techTags : []
  );
  const [tagInput, setTagInput] = useState("");
  const [metrics, setMetrics] = useState(
    Array.isArray(project?.impactMetrics) ? project.impactMetrics : []
  );
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [markdownPreview, setMarkdownPreview] = useState(false);

  const imageUrl = watch("imageUrl");
  const detailedDescription = watch("detailedDescription");

  // Reset when project changes (edit mode)
  useEffect(() => {
    if (project) {
      reset({
        name: project.name || "",
        description: project.description || "",
        shortDescription: project.shortDescription || "",
        detailedDescription: project.detailedDescription || "",
        category: project.category || "Backend",
        status: project.status || "In Progress",
        usedTechnologies: project.usedTechnologies || "",
        githubUrl: project.githubUrl || "",
        downloadUrl: project.downloadUrl || "",
        liveDemoUrl: project.liveDemoUrl || "",
        documentationUrl: project.documentationUrl || "",
        videoDemoUrl: project.videoDemoUrl || "",
        displayOrder: project.displayOrder || 0,
        images: null,
        imageUrl: project.imageUrl || "",
      });
      setIsFeatured(project.isFeatured === 1 || project.isFeatured === true);
      setIsPublished(project.isPublished !== 0 && project.isPublished !== false);
      setTechTags(Array.isArray(project.techTags) ? project.techTags : []);
      setMetrics(Array.isArray(project.impactMetrics) ? project.impactMetrics : []);
    }
  }, [project, reset]);

  // Cover image handler
  const handleImageChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    setValue("image", file);
    setValue("imageUrl", URL.createObjectURL(file));
  };

  // Gallery images handler (additional images)
  const handleGalleryChange = (e) => {
    const files = Array.from(e?.target?.files || []);
    const previews = files.map((f) => URL.createObjectURL(f));
    setGalleryPreviews((prev) => [...prev, ...previews]);
    // Store files in a hidden input via setValue
    setValue("galleryFiles", files);
  };

  // Tag input
  const addTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().replace(/,$/, "");
      if (tag && !techTags.includes(tag)) {
        setTechTags((prev) => [...prev, tag]);
      }
      setTagInput("");
    }
  };
  const removeTag = (tag) => setTechTags((prev) => prev.filter((t) => t !== tag));

  // Metrics
  const addMetric = () => setMetrics((prev) => [...prev, { label: "", value: "" }]);
  const updateMetric = (i, field, val) =>
    setMetrics((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)));
  const removeMetric = (i) => setMetrics((prev) => prev.filter((_, idx) => idx !== i));

  // Build FormData on submit
  const handleFormSubmit = (data) => {
    const formData = new FormData();

    // Basic fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images" && key !== "image" && key !== "imageUrl" && key !== "galleryFiles" && value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Featured & published
    formData.append("isFeatured", isFeatured ? "true" : "false");
    formData.append("isPublished", isPublished ? "true" : "false");

    // Tech tags
    formData.append("techTags", JSON.stringify(techTags));

    // Impact metrics
    formData.append("impactMetrics", JSON.stringify(metrics.filter((m) => m.label && m.value)));

    // Cover image file
    const coverFile = data.image;
    if (coverFile instanceof File) {
      formData.append("images", coverFile);
    }

    // Gallery files
    const galleryFiles = data.galleryFiles || [];
    if (Array.isArray(galleryFiles)) {
      galleryFiles.forEach((f) => formData.append("images", f));
    }

    onSubmit(formData);
  };

  return (
    <form
      className="flex flex-col gap-10 bg-white/[0.02] backdrop-blur-3xl p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* ── Section: Basic Info ─────────────────── */}
      <Section title="Basic Info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <Input
            label="Project Name"
            placeholder="e.g. ErgoTech Backend"
            error={errors.name?.message}
            {...register("name", { required: "Project Name is required" })}
          />
          <Dropdown
            label="Status"
            options={STATUS_OPTIONS}
            error={errors.status?.message}
            {...register("status", { required: "Status is required" })}
          />
          <Dropdown
            label="Category"
            options={CATEGORIES}
            error={errors.category?.message}
            {...register("category")}
          />
          <Input
            label="Display Order"
            type="number"
            placeholder="0"
            {...register("displayOrder")}
          />

          <div className="md:col-span-2">
            <TextArea
              label="Short Description (for cards - max 300 chars)"
              placeholder="One-line recruiter-facing summary..."
              error={errors.shortDescription?.message}
              {...register("shortDescription", {
                maxLength: { value: 300, message: "Max 300 characters" },
              })}
            />
          </div>

          <div className="md:col-span-2">
            <TextArea
              label="Description (legacy / fallback)"
              placeholder="Brief description used as fallback..."
              error={errors.description?.message}
              {...register("description", {
                maxLength: { value: 500, message: "Max 500 characters" },
              })}
            />
          </div>
        </div>
      </Section>

      {/* ── Section: Detailed Description (Markdown) ── */}
      <Section title="Detailed Description (Markdown)">
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={() => setMarkdownPreview(false)}
            className={`text-xs font-inter px-3 py-1.5 rounded-lg border transition-all ${!markdownPreview ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" : "border-white/10 text-zinc-500 hover:text-zinc-300"}`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMarkdownPreview(true)}
            className={`text-xs font-inter px-3 py-1.5 rounded-lg border transition-all ${markdownPreview ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" : "border-white/10 text-zinc-500 hover:text-zinc-300"}`}
          >
            Preview
          </button>
        </div>
        <p className="text-[11px] text-zinc-600 font-inter mb-3">
          Supports Markdown: headings (#), lists (- item), code (```), links ([text](url)), bold (**text**)
        </p>
        {!markdownPreview ? (
          <textarea
            {...register("detailedDescription")}
            placeholder={`## Overview\n\nDescribe your project...\n\n## Problem\n\n## Solution\n\n## Architecture\n\n## Challenges\n\n## Results`}
            rows={16}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/40 resize-y"
          />
        ) : (
          <div className="w-full min-h-[300px] bg-white/[0.02] border border-white/10 rounded-xl px-6 py-4 text-sm text-zinc-300 font-inter leading-relaxed whitespace-pre-wrap">
            {detailedDescription || <span className="text-zinc-600">Nothing to preview yet.</span>}
          </div>
        )}
      </Section>

      {/* ── Section: Technologies ───────────────── */}
      <Section title="Technologies & Tags">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-inter font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Tech Tags (press Enter or comma to add)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-inter font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Java, Spring Boot, PostgreSQL..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-inter text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/40"
            />
          </div>
          <Input
            label="Used Technologies (legacy comma-separated)"
            placeholder="Java, Spring Boot, Docker..."
            {...register("usedTechnologies")}
          />
        </div>
      </Section>

      {/* ── Section: Links ─────────────────────── */}
      <Section title="Project Links">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <Input label="GitHub Repository" placeholder="https://github.com/..." {...register("githubUrl")} />
          <Input label="Live Demo URL" placeholder="https://..." {...register("liveDemoUrl")} />
          <Input label="Documentation URL" placeholder="https://docs.example.com" {...register("documentationUrl")} />
          <Input label="Video Demo URL" placeholder="https://youtube.com/..." {...register("videoDemoUrl")} />
          <Input label="Download / Legacy URL" placeholder="https://..." {...register("downloadUrl")} />
        </div>
      </Section>

      {/* ── Section: Images ────────────────────── */}
      <Section title="Images">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ImageInput label="Cover Image" onChange={handleImageChange} error={errors.image?.message} />
          <div>
            <label className="block text-xs font-inter font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Gallery Images (up to 4 additional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="w-full text-sm font-inter text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border file:border-white/10 file:bg-white/5 file:text-zinc-300 file:text-xs file:font-semibold hover:file:bg-white/10 transition-all"
            />
            {galleryPreviews.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-3">
                {galleryPreviews.map((src, i) => (
                  <div key={i} className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10">
                    <img src={src} className="w-full h-full object-cover" alt={`Gallery ${i + 1}`} />
                    <button
                      type="button"
                      onClick={() => setGalleryPreviews((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-0.5 right-0.5 bg-black/70 rounded-full p-0.5 text-white"
                    >
                      <X size={9} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {imageUrl && (
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-black/40 mt-4">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-inter font-bold text-white/50 uppercase tracking-widest">
              Cover Preview
            </span>
          </div>
        )}
      </Section>

      {/* ── Section: Impact Metrics ─────────────── */}
      <Section title="Impact Metrics">
        <div className="flex flex-col gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                value={m.value}
                onChange={(e) => updateMetric(i, "value", e.target.value)}
                placeholder="e.g. 40%"
                className="w-28 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm font-inter text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/40"
              />
              <input
                value={m.label}
                onChange={(e) => updateMetric(i, "label", e.target.value)}
                placeholder="e.g. Reduced processing time"
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm font-inter text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/40"
              />
              <button
                type="button"
                onClick={() => removeMetric(i)}
                className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addMetric}
            className="inline-flex items-center gap-2 text-xs font-inter font-semibold text-zinc-400 hover:text-emerald-400 border border-dashed border-white/10 hover:border-emerald-500/30 px-4 py-2.5 rounded-xl transition-all self-start"
          >
            <Plus size={14} /> Add Metric
          </button>
        </div>
      </Section>

      {/* ── Section: Publishing ─────────────────── */}
      <Section title="Publishing">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Featured toggle */}
          <button
            type="button"
            onClick={() => setIsFeatured((f) => !f)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-inter text-sm font-semibold transition-all ${
              isFeatured
                ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                : "bg-white/[0.02] border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20"
            }`}
          >
            <Star size={15} fill={isFeatured ? "currentColor" : "none"} />
            {isFeatured ? "Featured ✓" : "Mark as Featured"}
          </button>

          {/* Published toggle */}
          <button
            type="button"
            onClick={() => setIsPublished((p) => !p)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-inter text-sm font-semibold transition-all ${
              isPublished
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                : "bg-white/[0.02] border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20"
            }`}
          >
            {isPublished ? <Eye size={15} /> : <EyeOff size={15} />}
            {isPublished ? "Published" : "Draft (hidden)"}
          </button>
        </div>
      </Section>

      {/* ── Footer: actions ─────────────────────── */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-2">
        {hasDeleteButton ? (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all font-inter font-semibold text-sm"
          >
            Delete Project
          </button>
        ) : (
          <div />
        )}

        <Button type="submit" disabled={isPending} className="min-w-[160px] shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          {isPending ? "Syncing..." : "Save Changes"}
        </Button>
      </div>

      {projectError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-inter text-center mt-4">
          Error: {projectError.message}
        </div>
      )}
    </form>
  );
}

/** Small section wrapper for visual grouping */
function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xs font-inter font-bold text-zinc-500 uppercase tracking-[0.2em] pb-3 border-b border-white/5">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default ProjectForm;
