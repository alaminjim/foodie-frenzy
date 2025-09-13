import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaDownload, FaPlay, FaTimes } from "react-icons/fa";
import { bannerAssets } from "../../../public/FOODIE-FRENZY-FINAL/dummydata";

const Banner = () => {
  const [search, setSearch] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [videos, setVideo] = useState(false);

  const { bannerImage, video, orbitImages } = bannerAssets;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("search", search);
  };
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-700/10"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10 ">
          {/* left content */}
          <div className="flex-1 space-y-8 relative md:pr-8 lg:pr-19 text-center md:text-left ">
            <h1 className="text-4xl sm:text-5xl md:text-4xl  lg:text-6xl font-bold leading-tight font-serif drop-shadow-md">
              We're Here <br></br>
              <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text">
                For Food & Delivery
              </span>
            </h1>

            <p className="text-lg md:text-lg lg:text-xl font-playfair italic sm:text-xl text-amber-100 max-w-xl opacity-90 mx-auto md:mx-0">
              Best cooks and best delivery guys all at your service. Hot tasty
              food will reach you in 60 minutes.
            </p>

            <form
              onSubmit={handleSearch}
              onSub
              className="relative max-w-2xl mx-auto md:mx-0 group"
            >
              <div className="relative flex items-center bg-amber-900/30 rounded-xl border-2 border-amber-400/50 shadow-2xl hover:border-amber-500 transition-all duration-300 lg:w-[500px]">
                <div className="pl-6 pr-3 py-4">
                  <IoSearchOutline className="text-xl text-amber-400/80"></IoSearchOutline>
                </div>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Discover your next favorite meal..."
                  className="w-full py-4 pr-6 bg-transparent outline-none placeholder:amber-200/70 text-lg font-medium tracking-wide"
                />
                <button
                  type="submit"
                  className="mr-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-300 rounded-lg font-semibold text-amber-900 hover:from-amber-300 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-amber-300/20"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6 ">
              <button className="group flex items-center gap-3 bg-amber-800/30 hover:bg-amber-800/50 px-6 py-3 rounded-lg transition-all duration-300 border-2 border-amber-700/50 hover:border-amber-400">
                <FaDownload className="text-xl text-amber-400 group-hover:animate-bounce" />
                <span className="text-lg">Download App</span>
              </button>

              <button
                onClick={() => setVideo(true)}
                className="group flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-300/30"
              >
                <FaPlay className="text-xl text-amber-900"></FaPlay>
                <span className="text-lg text-amber-900 font-semibold">
                  Watch Video
                </span>
              </button>
            </div>
          </div>
          {/* right side */}
          <div className="flex-1 relative group mt-8 md:mt-0 min-h-[400px]">
            <div className="relative rounded-full p-1 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-400 shadow-2xl w-[250px] sm:w-[350px] xs:w-[300px] h-[250px] xs:h-[300px] sm:h-[350px] mx-auto">
              {/* Orbit images are now behind the banner */}
              {orbitImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${
                    index === 0 ? "orbit" : `orbit-delay-${index * 5}`
                  }
        w-[80px] xs:w-[100px] sm:w-[150px] h-[80px] xs:h-[100px] sm:h-[150px]`}
                >
                  <img
                    src={image}
                    alt={`Orbiting ${index + 1}`}
                    className="w-full h-full rounded-full border border-amber-500/50 shadow-lg bg-amber-900/20 p-1 object-cover"
                  />
                </div>
              ))}

              {/* Main banner stays on top of the orbiting images */}
              <img
                className="rounded-full border-4 xs:border-8 border-amber-900/50 w-full h-full object-cover object-top relative z-20"
                src={bannerImage}
                alt="banner"
              />

              {/* Overlay is on top of the banner to create a gradient effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-amber-900/40 mix-blend-md z-30"></div>
            </div>
          </div>
        </div>
      </div>
      {videos && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg p-4 ">
          <button
            onClick={() => setVideo(false)}
            className="absolute top-6 right-6 text-amber-400 hover:text-amber-300 text-3xl z-10 transition-all"
          >
            <FaTimes></FaTimes>
          </button>
          <div className="w-full max-w-4xl mx-auto">
            <video
              controls
              autoPlay
              className="w-full aspect-video object-contain rounded-lg shadow-2xl"
            >
              <source src={video} type="video/mp4"></source>
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
