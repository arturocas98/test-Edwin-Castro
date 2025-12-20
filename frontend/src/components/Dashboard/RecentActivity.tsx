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

export default function RecentActivity({ stats, statusColors }: Props) {
    return (
        <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
                </h3>
            </div>
            </div>

            <div className="divide-y divide-gray-100">
            {stats.recentTasks.map((task) => (
                <div
                key={task._id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 line-clamp-2 flex-1">
                    {task.title}
                    </h4>
                    <span
                    className={`ml-2 text-xs font-medium px-2 py-1 rounded-full capitalize ${
                        statusColors[task.status].bg
                    } ${statusColors[task.status].text}`}>
                    {task.status.replace("_", " ")}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                    {new Date(task.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                    </span>
                    <span className="text-gray-400">
                    {new Date(task.updatedAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    </span>
                </div>
                </div>
            ))}
            </div>

            {stats.recentTasks.length === 0 && (
            <div className="p-8 text-center">
                <svg
                className="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.801 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.801 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
                </svg>
                <p className="text-gray-500">No recent activity</p>
            </div>
            )}
        </div>
        </div>
    );
}
