import RiskBadge from "@/components/shared/RiskBadge";
import { MoreVertical } from "lucide-react";

interface PatientCardProps {
  name: string;
  village: string;
  risk: "low" | "medium" | "high";
}

export default function PatientCard({
  name,
  village,
  risk,
}: PatientCardProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-[#c7e6c7]" />

        <div>
          <h3 className="font-semibold text-[#1f2a44]">
            {name}
          </h3>

          <p className="text-sm text-gray-500">
            {village}
          </p>
        </div>

      </div>

       <div className="flex items-center gap-3">

        <RiskBadge level={risk} />

        <button>
          <MoreVertical size={18} className="text-gray-500" />
        </button>

      </div>
    </div>
  );
}