import { Routes, Route } from "react-router-dom";
import { Show, RedirectToSignIn } from "@clerk/react";
import PublicLandingPage from "./pages/PublicLandingPage";
import ClinicDashboard from "./pages/ClinicDashboard";
import CustomSignInPage from "./pages/CustomSignInPage";

export default function App() {
  return (
    <Routes>
      {/* Public Unauthenticated Route (Patients/Consumers) */}
      <Route path="/" element={<PublicLandingPage />} />

      {/* Custom Auth Routes */}
      <Route path="/sign-in/*" element={<CustomSignInPage />} />

      {/* Protected Multi-Tenant Dashboard (Staff/Admins) */}
      <Route
        path="/dashboard/*"
        element={
          <>
            <Show when="signed-in">
              <ClinicDashboard />
            </Show>
            <Show when="signed-out">
              <RedirectToSignIn />
            </Show>
          </>
        }
      />
    </Routes>
  );
}
