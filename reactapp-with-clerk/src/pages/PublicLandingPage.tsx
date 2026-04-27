import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";

export default function PublicLandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
        Enterprise Clinic Scheduler
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mb-10">
        A secure, multi-tenant booking platform built for modern healthcare
        providers. Manage your clinic, staff, and patients with zero friction.
      </p>
      <div className="flex gap-4">
        {isSignedIn ? (
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/sign-in"
            className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition shadow-sm"
          >
            Staff Login
          </Link>
        )}
      </div>
    </div>
  );
}
