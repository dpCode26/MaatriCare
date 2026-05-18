interface RiskBadgeProps {
  level: "low" | "medium" | "high";
}

export default function RiskBadge({ level }: RiskBadgeProps) {

  const styles = {
    low: "bg-green-200 text-green-900",
    medium: "bg-yellow-200 text-yellow-900",
    high: "bg-red-200 text-red-900",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm text-center font-medium ${styles[level]}`}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}