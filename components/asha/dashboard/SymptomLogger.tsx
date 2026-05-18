const symptoms = [
  "मतली",
  "आट",
  "हाथ",
  "कानी",
  "सासफुल भाइका",
];

export default function SymptomLogger() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-4 min-h-[200px]">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-[#1f2a44]">
          Symptom Logger
        </h2>

        <button className="text-gray-500 text-xl">
          •••
        </button>

      </div>

      <div className="flex flex-wrap gap-3 mt-8">

        {symptoms.map((symptom, index) => (
          <button
            key={index}
            className={`px-5 py-2 rounded-full border transition
            ${
              index === 1
                ? "bg-green-100 border-green-300 text-green-700"
                : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-green-50"
            }`}
          >
            {symptom}
          </button>
        ))}

      </div>

    </div>
  );
}