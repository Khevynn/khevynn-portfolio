function TextArea({ error, label, className, ...rest }) {
  return (
    <div className="text-gray-300 mb-4">
      {(() => {
        return (
          <label className="block text-gray-300 mb-2" htmlFor={rest.id}>
            {label}
          </label>
        );
      })()}

      <textarea
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...rest}
      />
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
}

export default TextArea;
