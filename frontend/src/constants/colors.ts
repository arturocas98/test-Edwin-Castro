export const statusColors = {
  pending: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    accent: "bg-blue-500",
  },
  in_progress: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    accent: "bg-yellow-500",
  },
  completed: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    accent: "bg-green-500",
  },
} as const;

export type StatusType = keyof typeof statusColors;

export const priorityColors = {
  low: {
    bg: "bg-green-100",
    text: "text-green-800",
    accent: "bg-green-500",
  },
  medium: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    accent: "bg-yellow-500",
  },
  high: {
    bg: "bg-red-100",
    text: "text-red-800",
    accent: "bg-red-500",
  },
} as const;

export type PriorityType = keyof typeof priorityColors;

export const cardColors = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", hover: "hover:bg-blue-50" },
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
} as const;

export type CardColorType = keyof typeof cardColors;
