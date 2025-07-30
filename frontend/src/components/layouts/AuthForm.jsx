function AuthForm({ children, title, onSubmit, className }) {
  return (
    <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {title}
      </h2>
      <form
        onSubmit={onSubmit}
        className={`w-md bg-gray-800 p-8 rounded-lg shadow-md ${className}`}
      >
        {children}
      </form>
    </div>
  );
}

export default AuthForm;
