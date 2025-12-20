import Project from "../projects/project.model";
import Task from "../tasks/task.model";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { Response } from "express";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  const projects = await Project.find({
    $or: [{ owner: userId }, { collaborators: userId }],
  }).select("_id");

  const projectIds = projects.map((p) => p._id);

  const totalProjects = projectIds.length;

  const totalTasks = await Task.countDocuments({
    project: { $in: projectIds },
  });

  const tasksByStatusAgg = await Task.aggregate([
    { $match: { project: { $in: projectIds } } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const tasksByStatus = {
    pending: 0,
    in_progress: 0,
    completed: 0,
  };

  tasksByStatusAgg.forEach((item) => {
    tasksByStatus[item._id as keyof typeof tasksByStatus] = item.count;
  });

  const tasksByPriorityAgg = await Task.aggregate([
    { $match: { project: { $in: projectIds } } },
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]);

  const tasksByPriority = {
    low: 0,
    medium: 0,
    high: 0,
  };

  tasksByPriorityAgg.forEach((item) => {
    tasksByPriority[item._id as keyof typeof tasksByPriority] = item.count;
  });

  const recentTasks = await Task.find({
    project: { $in: projectIds },
  })
    .sort({ updatedAt: -1 })
    .limit(5)
    .select("title status updatedAt");

  res.json({
    totalProjects,
    totalTasks,
    tasksByStatus,
    tasksByPriority,
    recentTasks,
  });
};
