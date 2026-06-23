export default function Analytics() {
  return (
    <section
      id="analytics"
      className="bg-gray-100 p-10 text-center text-black"
    >
      <h2 className="text-3xl font-bold mb-4">
        OpenPolicyEnv Analytics
      </h2>

      <p className="text-lg mb-8">
        Live policy review metrics and RL environment insights.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-black">
          <h3 className="font-bold text-2xl">4</h3>
          <p>Policy Tasks</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-black">
          <h3 className="font-bold text-2xl">100%</h3>
          <p>API Availability</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-black">
          <h3 className="font-bold text-2xl">FastAPI</h3>
          <p>Backend Engine</p>
        </div>
      </div>
    </section>
  );
}