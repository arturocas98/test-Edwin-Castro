export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
  onClick,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "purple";
  onClick?: () => void;
}) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "hover:bg-blue-50",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      hover: "hover:bg-green-50",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      hover: "hover:bg-yellow-50",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "hover:bg-purple-50",
    },
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all hover:shadow-md ${
        onClick ? colorClasses[color].hover : ""
      }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color].bg}`}>
          <div className={colorClasses[color].text}>{icon}</div>
        </div>

        {onClick && (
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>

      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}
