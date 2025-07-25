import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 sticky top-0 z-10 border-b shadow-sm px-6 py-3 flex justify-between items-center">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="College Buddy"
            className="h-12 w-auto object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1
            className="text-xl font-bold text-blue-700 cursor-pointer"
            onClick={() => navigate("/")}
          ></h1>

          {/* Conditionally render nav buttons */}
          {!isLandingPage && (
            <>
              <button
                onClick={() => navigate("/departments")}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Departments
              </button>
              <button
                onClick={() => navigate("/professors")}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Professors
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Admin
                </button>
              )}
            </>
          )}
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-700">Hi, {user.name}</span>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            !isLandingPage && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Register
                </button>
              </>
            )
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="text-sm text-gray-700 bg-white border-t mt-6">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Built with ❤️ by Bala & Sarvagya
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/about-us" className="hover:underline">
              About
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
            <a href="/pricing" className="hover:underline">
              Pricing
            </a>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="/refund-policy" className="hover:underline">
              Refund Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
