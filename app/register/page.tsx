"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [captainName, setCaptainName] = useState("");
  const [company, setCompany] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [vesselName, setVesselName] = useState("");

  const handleSubmit = () => {
    if (!captainName || !company || !cargoType || !vesselName) return;
    localStorage.setItem("captainData", JSON.stringify({
      captainName, company, cargoType, vesselName
    }));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">⚓ Captain Registration</h1>
          <p className="text-gray-400 text-sm">Enter your vessel details</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Captain Name</label>
            <input type="text" value={captainName} onChange={(e) => setCaptainName(e.target.value)}
              placeholder="Capt. John Smith"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Vessel Name</label>
            <input type="text" value={vesselName} onChange={(e) => setVesselName(e.target.value)}
              placeholder="MV Ocean Star"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Company</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
              placeholder="Maersk Shipping Co."
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Cargo Type</label>
            <select value={cargoType} onChange={(e) => setCargoType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500">
              <option value="">Select cargo type</option>
              <option value="Containers">Containers</option>
              <option value="Bulk Cargo">Bulk Cargo</option>
              <option value="Liquid Cargo">Liquid Cargo (Tanker)</option>
              <option value="Perishables">Perishables</option>
              <option value="Hazardous Materials">Hazardous Materials</option>
              <option value="Vehicles">Vehicles (RoRo)</option>
            </select>
          </div>
          <button onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2">
            Enter Command Center
          </button>
        </div>
      </div>
    </div>
  );
}
