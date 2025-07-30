import { useNavigate } from "react-router-dom";

function NavigateButton({ to, children, className }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default NavigateButton;
