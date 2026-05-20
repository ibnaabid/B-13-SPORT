import Link from "next/link";

const HeroSection = () => {
  return (
    <div>
      <div 
        className="hero min-h-screen animate__animated  animate__zoomInDown"
        style={{
          backgroundImage:
            "url('/assests/jason-charters-IorqsMssQH0-unsplash.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="hero-overlay bg-black/70"></div>

        {/* Content */}
        <div className="hero-content text-center text-white">
          <div className="max-w-2xl">

            <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
              Book Your Favorite
              <span className="text-green-400"> Sports Arena</span>
            </h1>

            <p className="mb-8 text-lg text-gray-300 md:text-xl">
              Reserve football turfs, badminton courts, tennis arenas,
              and more with just a few clicks. Play smarter with
              SportNest.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">

              <Link href="/facilities">
                <button className="btn border-none bg-green-400 px-8 text-lg font-bold text-black hover:bg-green-300">
                  Explore Facilities
                </button>
              </Link>

              <button className="btn btn-outline border-white text-white hover:bg-white hover:text-black">
                Learn More
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;