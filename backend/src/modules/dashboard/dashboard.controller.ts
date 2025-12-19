import Project from "../projects/project.model";
import Task from "../tasks/task.model";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { Response } from "express";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  // Proyectos del usuario
  const projects = await Project.find({
    $or: [{ owner: userId }, { collaborators: userId }],
  }).select("_id");

  const projectIds = projects.map((p) => p._id);

  // Métricas
  const totalProjects = projectIds.length;

  const totalTasks = await Task.countDocuments({
    project: { $in: projectIds },
  });

  const tasksByStatus = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const tasksByPriority = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
      },
    },
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({
    totalProjects,
    totalTasks,
    tasksByStatus,
    tasksByPriority,
  });
};
