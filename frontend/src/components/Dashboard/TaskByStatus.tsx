import type { DashboardStats } from "../../api/dashboard.api";

interface Props {
  stats: DashboardStats;
  statusColors : {
    [key: string]: {
      bg: string;
      text: string;
      border: string;
      accent: string;
    };
  };
}


export default function TaskByStatus({ stats, statusColors }: Props) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Tasks by Status
          </h3>
          <span className="text-sm text-gray-500">
            Total: {stats.totalTasks}
          </span>
        </div>

        <div className="space-y-4">
          {Object.entries(stats.tasksByStatus).map(([status, count]) => (
            <div key={status} className="flex items-center">
              <div className="w-24">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {status.replace("_", " ")}
                </span>
              </div>
              <div className="flex-1 ml-4">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        statusColors[status as keyof typeof statusColors].accent
                      }`}
                      style={{
                        width: `${(count / stats.totalTasks) * 100}%`,
                      }}></div>
                  </div>
                  <span className="ml-3 text-sm font-semibold text-gray-900 min-w-10 text-right">
                    {count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

}
