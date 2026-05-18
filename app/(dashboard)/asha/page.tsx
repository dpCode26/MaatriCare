import PatientList from "@/components/asha/patients/PatientList";
import Stats from "@/components/asha/dashboard/Stats";
import SymptomLogger from "@/components/asha/dashboard/SymptomLogger";
import Records from "@/components/asha/dashboard/Records";
import RegisterButton from "@/components/asha/dashboard/RegisterButton";

export default function AshaDashboardPage() {
  return (
    <div className="space-y-1 ">

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="xl:col-span-1">
          <PatientList />
          </div>

        {/* RIGHT SECTION */}
        <div className="xl:col-span-2 space-y-6">

          {/* TOP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Stats />
            <SymptomLogger />
          </div>
        
          {/* CHART SECTION */}
          <Records />

        </div>
      </div>

      <RegisterButton />

    </div>
  );
}