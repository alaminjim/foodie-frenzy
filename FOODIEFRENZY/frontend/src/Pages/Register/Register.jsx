const Register = () => {
  return (
    <div>
      {/* Register Form */}
      <form className="space-y-2.5 md:space-y-3 lg:space-y-5">
        {/* Name */}
        <div>
          <label className="block text-amber-200 mb-1 font-semibold">
            Name
          </label>
          <input
            type="text"
            className="w-full px-5 py-3 rounded-lg bg-[#2D1B0E]/90 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-amber-200 mb-1 font-semibold">
            Profile Image URL
          </label>
          <input
            type="text"
            className="w-full px-5 py-3 rounded-lg bg-[#2D1B0E]/90 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter image URL"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-amber-200 mb-1 font-semibold">
            Email
          </label>
          <input
            type="email"
            className="w-full px-5 py-3 rounded-lg bg-[#2D1B0E]/90 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-amber-200 mb-1 font-semibold">
            Password
          </label>
          <input
            type="password"
            className="w-full px-5 py-3 rounded-lg bg-[#2D1B0E]/90 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-lg shadow-md shadow-amber-600/40 hover:from-amber-300 hover:to-amber-500 transition-all font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
