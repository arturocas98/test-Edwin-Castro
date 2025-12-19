import { Response } from "express";
import Task from "./task.model";
import Project from "../projects/project.model";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { userHasAccessToProject } from "../projects/project.permissions";

export const createTask = async (req: AuthRequest, res: Response) => {
  const { project, title, description, priority, assignedTo } = req.body;

  const projectData = await userHasAccessToProject(project, req.user.id);
  if (!projectData)
    return res.status(403).json({ message: "No access to project" });

  const task = await Task.create({
    title,
    description,
    priority,
    project,
    assignedTo,
    createdBy: req.user.id,
  });

  res.status(201).json(task);
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  const { status, priority, project, assignedTo, sortBy, order } = req.query;

  // Proyectos donde el usuario tiene acceso
  const userProjects = await Project.find({
    $or: [{ owner: req.user.id }, { collaborators: req.user.id }],
  }).select("_id");

  const filters: any = {
    project: { $in: userProjects.map((p) => p._id) },
  };

  if (status) filters.status = status;
  if (priority) filters.priority = priority;
  if (project) filters.project = project;
  if (assignedTo) filters.assignedTo = assignedTo;

  const tasks = await Task.find(filters)
    .populate("assignedTo", "name email")
    .populate("project", "name")
    .sort({ [(sortBy as string) || "createdAt"]: order === "desc" ? -1 : 1 });

  res.json(tasks);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const projectAccess = await userHasAccessToProject(
    task.project.toString(),
    req.user.id
  );

  if (!projectAccess && task.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  Object.assign(task, req.body);
  await task.save();

  res.json(task);
};


export const deleteTask = async (req: AuthRequest, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const projectAccess = await userHasAccessToProject(
    task.project.toString(),
    req.user.id
  );

  if (!projectAccess && task.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};

