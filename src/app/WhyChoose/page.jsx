const WhyChoose = () => {
  return (
    <div className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center">

        <h2 className="text-4xl font-bold">
          Why Choose <span className="text-green-400">SportNest?</span>
        </h2>

        <p className="mt-4 text-gray-400">
          We provide the best sports facility booking experience.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:scale-105 transition">
            <h3 className="text-xl font-bold text-green-400">Easy Booking</h3>
            <p className="mt-2 text-gray-400">
              Book any sports facility in just a few clicks.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:scale-105 transition">
            <h3 className="text-xl font-bold text-green-400">Verified Venues</h3>
            <p className="mt-2 text-gray-400">
              All facilities are verified and trusted.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:scale-105 transition">
            <h3 className="text-xl font-bold text-green-400">Best Price</h3>
            <p className="mt-2 text-gray-400">
              Affordable pricing for everyone.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyChoose;