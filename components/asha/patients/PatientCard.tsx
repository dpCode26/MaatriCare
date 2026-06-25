import RiskBadge from "@/components/shared/RiskBadge";
import { MoreVertical, MapPin } from "lucide-react";
import Link from "next/link";

interface PatientCardProps {
  id: string;
  name: string;
  village: string;
  risk: "low" | "medium" | "high" | "critical";
}

export default function PatientCard({
  id,
  name,
  village,
  risk,
}: PatientCardProps) {
  return (
    <Link
      href={`/asha/patients/${id}`}
      className="
        block
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-4
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              flex h-14 w-14 items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#e76f7a]
              to-[#f4a261]
              text-lg
              font-bold
              text-white
            "
          >
            {name.charAt(0)}
          </div>

          <div>

            <h3 className="text-lg font-bold text-[#1f2a44]">
              {name}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={14} />
              {village}
            </div>

          </div>
        </div>

        <div className="flex items-center gap-3">

          <RiskBadge level={risk} />

          <button>
            <MoreVertical
              size={18}
              className="text-slate-400"
            />
          </button>

        </div>

      </div>
    </Link>
  );
}