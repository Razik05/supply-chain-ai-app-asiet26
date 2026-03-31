"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DUMMY_EMAIL = "captain@gmail.com";
const DUMMY_PASSWORD = "captain123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const captainData = localStorage.getItem("captainData");
    if (captainData) router.push("/dashboard");
  }, []);

  const handleLogin = () => {
    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      localStorage.setItem("userEmail", email);
      const captainData = localStorage.getItem("captainData");
      if (captainData) {
        router.push("/dashboard");
      } else {
        router.push("/register");
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-1">⚓ Global Fleet AI</h1>
          <p className="text-gray-400 text-sm">Maritime Command Platform</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Gmail Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="captain@gmail.com"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <p className="text-gray-600 text-xs">Use: captain@gmail.com / captain123</p>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
