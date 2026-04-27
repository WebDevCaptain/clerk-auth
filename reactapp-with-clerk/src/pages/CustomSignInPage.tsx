import { SignIn } from "@clerk/react";

export default function CustomSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Staff Portal</h1>
          <p className="text-slate-400 mt-2">
            Secure access for medical professionals
          </p>
        </div>

        {/* Native rendering bounded to our custom route */}
        <SignIn
          routing="path"
          path="/sign-in"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              card: "bg-white shadow-xl rounded-xl",
            },
          }}
        />
      </div>
    </div>
  );
}
