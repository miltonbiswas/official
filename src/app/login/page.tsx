"use client";

// IMPORTS FOR REACT 19 / NEXT 15
import { useActionState } from "react"; 
import { authenticate } from "@/actions/authActions";
import { LayoutDashboard, AlertCircle } from "lucide-react";

export default function LoginPage() {
  // Signature: [state, formAction, isPending]
  // Provide a permissive generic to avoid strict type mismatch with server action FormData
  const [errorMessage, formAction, isPending] = useActionState<any>(authenticate, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-200">
             <LayoutDashboard size={24} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Access your MBD Command Center</p>
        </div>
        
        <form action={formAction} className="flex flex-col gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">Email</label>
            <input 
              name="email" 
              type="email" 
              className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition font-medium" 
              required 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">Password</label>
            <input 
              name="password" 
              type="password" 
              className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition font-medium" 
              required 
            />
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm text-center font-bold flex items-center gap-2 justify-center">
              <AlertCircle size={16} /> {errorMessage}
            </div>
          )}
          
          <button 
            disabled={isPending}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition mt-4 shadow-xl shadow-blue-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isPending ? "Authenticating..." : "Enter Dashboard"}
          </button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400">Secure Environment • Authorized Personnel Only</p>
        </div>
      </div>
    </main>
  );
}