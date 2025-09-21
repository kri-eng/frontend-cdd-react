function Result({ result, handleReset }) {

  return (
    <>
      <div className="bg-white/10 border border-gray-400 rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Result</h3>
          <span
            className={`px-3 py-1 rounded-full border ${
              result.risk === "High Risk"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-green-100 text-green-700 border-green-300"
            }`}
          >
            {result.risk}
          </span>
        </div>
        <p className="mt-2 text-white">
          Probability: <strong>{result.probability}%</strong>
        </p>
        <p className="text-gray-300 text-sm">Note: Demo model. Not medical advice.</p>
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="mt-6 bg-blue-400 text-white rounded-md px-4 py-2 hover:bg-blue-900 transition"
      >
        Try Again
      </button>
    </>
  );
}
export default Result;