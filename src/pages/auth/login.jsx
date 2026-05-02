import { useState } from "react";
import { useNavigate } from "react-router";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "./main.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isFormValid || loading) {
      return;
    }

    setLoading(true);
    localStorage.setItem("token", "d-token");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-lg bg-green-500/50 p-6 text-center shadow-md backdrop-blur-md"
      >
        <h1 className="search-title flex flex-row items-center justify-center gap-3 text-center">
          Welcome
          <span style={{ color: "#4CAF50" }}>Back</span>
        </h1>
        <div className="py-5 flex flex-col gap-4">
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password  */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {show ? (
                <FiEyeOff className="text-gray-400" />
              ) : (
                <FiEye className="text-gray-400" />
              )}
            </button>
          </div>
          {/* Button */}
          <div className="grid grid-cols-3   text-sm gap-4 underline py-2">
            <p>Remember</p> <p>Forgot</p> <p>First create a account</p>
          </div>
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition ${
              isFormValid && !loading
                ? "bg-green-600 hover:bg-green-700"
                : "cursor-not-allowed bg-green-500/40 opacity-60 "
            }`}
          >
            <span className="text-center font-semibold">
              {loading ? "Login..." : "Login"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
