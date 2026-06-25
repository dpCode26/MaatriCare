import DashboardHero from "@/components/asha/dashboard/DashboardHero";
import Stats from "@/components/asha/dashboard/Stats";
import PatientList from "@/components/asha/patients/PatientList";
import QuickActions from "@/components/asha/dashboard/QuickActions";
import HighRiskPanel from "@/components/asha/dashboard/HighRiskPanel";

export default function AshaDashboardPage() {
  return (
    <div className="space-y-6">

      <DashboardHero />

      <Stats />

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <PatientList />
        </div>

        <div className="space-y-6">
          <HighRiskPanel />
          <QuickActions />
        </div>

      </div>

    </div>
  );
}