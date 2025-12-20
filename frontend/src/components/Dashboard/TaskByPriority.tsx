
import type { DashboardStats } from "../../api/dashboard.api";

interface Props {
  stats: DashboardStats;
  priorityColors : {
    [key: string]: {
      bg: string;
      text: string;
      accent: string;
    };
  };
}

export default function TaskByPriority({ stats, priorityColors }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Tasks by Priority
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(stats.tasksByPriority).map(([priority, count]) => (
          <div
            key={priority}
            className={`rounded-lg p-4 border ${
              priorityColors[priority as keyof typeof priorityColors].bg
            } ${priorityColors[priority as keyof typeof priorityColors]}`}>
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${
                  priorityColors[priority as keyof typeof priorityColors].text
                }`}>
                {priority}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  priorityColors[priority as keyof typeof priorityColors].accent
                }`}></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{count}</p>
            <p className="text-xs text-gray-500 mt-1">tasks</p>
          </div>
        ))}
      </div>
    </div>
  );
}
