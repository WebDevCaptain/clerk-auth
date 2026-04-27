import {
  OrganizationSwitcher,
  UserButton,
  Show,
  useOrganization,
} from "@clerk/react";

export default function ClinicDashboard() {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-400 font-medium">
          Loading tenant context...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Clinic OS
          </h1>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <OrganizationSwitcher
            hidePersonal={true}
            appearance={{
              elements: {
                organizationSwitcherTrigger:
                  "border border-slate-200 rounded-md px-3 py-1.5 hover:bg-slate-50 transition",
              },
            }}
          />
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {!organization ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center border-2 border-dashed border-slate-200 rounded-2xl p-12 bg-white">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              No Active Clinic
            </h2>
            <p className="text-slate-500 mb-6 max-w-md">
              Select a clinic context from the top navigation menu to view
              schedules and patients.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {organization.name} Workspace
              </h2>
              <p className="text-slate-500 mt-1">
                Manage your daily schedule and administrative tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Standard Card: Clinician Access */}
              <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-xl hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-slate-900">
                    Daily Appointments
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    8 Today
                  </span>
                </div>
                <p className="text-slate-600 mb-6">
                  View and manage today's patient pipeline and medical notes.
                </p>
                <button className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition">
                  View Schedule
                </button>
              </div>

              {/* RBAC Card: Admin Access Only via v6 <Show> */}
              <Show
                when={{ permission: "org:billing:manage" }}
                fallback={
                  <div className="p-6 bg-slate-100 border border-slate-200 border-dashed rounded-xl flex flex-col justify-center items-center text-center opacity-70">
                    <svg
                      className="w-8 h-8 text-slate-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <h3 className="font-medium text-slate-700">
                      Restricted Access
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Billing access requires Clinic Admin privileges.
                    </p>
                  </div>
                }
              >
                <div className="p-6 bg-white border border-red-100 shadow-sm rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-red-700">
                      Billing & Settings
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                      Admin
                    </span>
                  </div>
                  <p className="text-slate-600 mb-6">
                    Manage subscription tiers, invoices, and organization
                    payment methods.
                  </p>
                  <button className="w-full px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-medium hover:bg-red-100 transition">
                    Manage Billing
                  </button>
                </div>
              </Show>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
