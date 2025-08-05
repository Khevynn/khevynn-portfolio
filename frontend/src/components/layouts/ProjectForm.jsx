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
    console.log("Selected file:", file);

    if (!file) return;

    // Clean up previous blob URL
    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      console.error("File too large");
      return;
    }

    // Set new file and create blob URL for preview
    setValue("image", file);
    setValue("imageUrl", URL.createObjectURL(file));
    console.log("Image set successfully");
  };

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data:", data);
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col gap-5 bg-gray-800 p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        label="Project Name"
        placeholder="Enter project name"
        error={errors.name?.message}
        {...register("name", { required: "Project Name is required" })}
      />

      <TextArea
        label="Description"
        placeholder="Enter project description"
        className="overflow-y-auto wrap-break min-h-30"
        error={errors.description?.message}
        {...register("description", {
          required: "Description is required",
          maxLength: {
            value: 500,
            message: "Description must be less than 500 characters",
          },
        })}
      />

      <Dropdown
        label="Status"
        options={[
          { value: "Completed", label: "Completed" },
          { value: "In Progress", label: "In Progress" },
          { value: "Not Started", label: "Not Started" },
        ]}
        error={errors.status?.message}
        {...register("status", {
          required: "Status is required",
        })}
      />

      <Input
        label="Technologies Used"
        placeholder="Enter technologies used"
        error={errors.usedTechnologies?.message}
        {...register("usedTechnologies", {
          required: "Technologies are required",
          maxLength: {
            value: 200,
            message: "Technologies must be less than 200 characters",
          },
        })}
      />

      <ImageInput
        label="Image"
        accept="image/*"
        onChange={handleImageChange}
        error={errors.image?.message}
      />

      {imageUrl && (
        <div className="mt-2">
          <img
            src={imageUrl}
            alt="Project preview"
            className="w-40 h-40 object-cover rounded border border-gray-700"
          />
        </div>
      )}

      <Input
        label="GitHub URL"
        placeholder="Enter GitHub repository URL"
        error={errors.githubUrl?.message}
        {...register("githubUrl", {
          required: "GitHub URL is required",
          pattern: {
            value:
              /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/,
            message: "Invalid GitHub URL format",
          },
        })}
      />

      <Input
        label="Download URL"
        placeholder="Enter download URL"
        type="url"
        error={errors.downloadUrl?.message}
        {...register("downloadUrl", {
          required: "Download URL is required",
          pattern: {
            value: /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/,
            message: "Invalid URL format",
          },
        })}
      />

      <div className="flex justify-end w-full gap-4">
        <Button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>

        {hasDeleteButton && (
          <Button
            className="px-4 py-2 bg-transparent border border-red-500 hover:bg-red-500 text-red-500 hover:text-white rounded transition-colors"
            type="button"
            onClick={onDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </Button>
        )}
      </div>

      {projectError && (
        <p className="text-red-500 mt-2">
          Error during operation: {projectError.message}
        </p>
      )}
    </form>
  );
}

export default ProjectForm;
