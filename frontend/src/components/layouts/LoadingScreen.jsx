import Loading from "../ui/Loading";

function LoadingScreen({ text }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black bg-opacity-80">
      <div className="flex flex-col items-center gap-4">
        <Loading />
        <span className="text-lg text-gray-200 font-semibold animate-pulse">
          {text}
        </span>
      </div>
    </div>
  );
}

export default LoadingScreen;
