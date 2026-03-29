import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import ImageInput from "../ui/ImageInput";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";

function ProjectForm({
  project,
  onSubmit,
  isPending,
  projectError,
  hasDeleteButton,
  onDelete,
}) {
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
      status: project?.status || "",
      usedTechnologies: project?.usedTechnologies || "",
      githubUrl: project?.githubUrl || "",
      downloadUrl: project?.downloadUrl || "",
      image: null,
      imageUrl: project?.imageUrl || "",
    },
  });

  // Reset form when project changes (for edit mode)
  useEffect(() => {
    if (project) {
      reset({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "",
        usedTechnologies: project.usedTechnologies || "",
        githubUrl: project.githubUrl || "",
        downloadUrl: project.downloadUrl || "",
        image: null,
        imageUrl: project.imageUrl || "",
      });
    }
  }, [project, reset]);

  const imageUrl = watch("imageUrl");

  const handleImageChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }

    if (file.size > 5 * 1024 * 1024) return;

    setValue("image", file);
    setValue("imageUrl", URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <form
      className="flex flex-col gap-8 bg-white/[0.02] backdrop-blur-3xl p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <Input
          label="Project Name"
          placeholder="e.g. Outlander"
          error={errors.name?.message}
          {...register("name", { required: "Project Name is required" })}
        />

        <Dropdown
          label="Status"
          options={[
            { value: "Completed", label: "Completed" },
            { value: "In Progress", label: "In Progress" },
            { value: "Not Started", label: "Not Started" },
          ]}
          error={errors.status?.message}
          {...register("status", { required: "Status is required" })}
        />

        <div className="md:col-span-2">
           <TextArea
            label="Brief Description"
            placeholder="Describe the main goal and features..."
            error={errors.description?.message}
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Max 500 characters",
              },
            })}
          />
        </div>

        <Input
          label="Technologies"
          placeholder="React, Node.js, etc."
          error={errors.usedTechnologies?.message}
          {...register("usedTechnologies", { required: "Technologies required" })}
        />

        <Input
          label="GitHub Link"
          placeholder="https://github.com/..."
          error={errors.githubUrl?.message}
          {...register("githubUrl", { required: "GitHub URL is required" })}
        />

         <Input
          label="Live Demo Link"
          placeholder="https://..."
          error={errors.downloadUrl?.message}
          {...register("downloadUrl")}
        />

        <ImageInput
          label="Cover Image"
          onChange={handleImageChange}
          error={errors.image?.message}
        />
      </div>

      {imageUrl && (
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-4 left-4 text-xs font-inter font-bold text-white/50 uppercase tracking-widest">Preview Mode</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-4">
        {hasDeleteButton ? (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all font-inter font-semibold text-sm"
          >
            Delete Project
          </button>
        ) : <div />}

        <Button
          type="submit"
          disabled={isPending}
          className="min-w-[160px] shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        >
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

export default ProjectForm;
