function Dropdown({ error, label, className, options, ...rest }) {
  return (
    <div className="text-gray-300 mb-4">
      {label && (
        <label className="block text-gray-300 mb-2" htmlFor={rest.id}>
          {label}
        </label>
      )}

      <select
        name={rest.name}
        id={rest.id}
        className={`w-55 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } bg-gray-800 text-gray-300 ${className}`}
        {...rest}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className="text-gray-300 bg-gray-800"
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
}

export default Dropdown;
