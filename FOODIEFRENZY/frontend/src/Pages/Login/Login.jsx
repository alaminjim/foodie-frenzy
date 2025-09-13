const Login = () => {
  return (
    <div>
      {/* Login form */}
      <form className="space-y-4">
        <div>
          <label className="block text-amber-200 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-[#2D1B0E]/80 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-amber-200 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-[#2D1B0E]/80 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg shadow-md transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
