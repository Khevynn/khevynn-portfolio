function ImageInput({ error, onChange, label, ...rest }) {
  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-gray-300 mb-2 font-semibold"
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      <div className="flex items-center space-x-4">
        <label
          htmlFor={rest.id}
          className={`cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 ${
            error ? "border-red-500" : "border-dashed border-gray-400"
          } rounded-lg bg-gray-800 hover:bg-gray-700 transition`}
        >
          <svg
            className="w-10 h-10 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-gray-400 text-sm">Click to upload</span>
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default ImageInput;
