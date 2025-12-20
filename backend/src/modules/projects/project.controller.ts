import { Response } from "express";
import Project from "./project.model";
import User from "../users/user.model";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { isProjectOwner, userHasAccessToProject } from "./project.permissions";

export const createProject = async (req: AuthRequest, res: Response) => {
  const project = await Project.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.user.id,
  });

  res.status(201).json(project);
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, search } = req.query;

  const filters: any = {
    $or: [{ owner: req.user.id }, { collaborators: req.user.id }],
  };

  if (search) {
    filters.name = { $regex: search, $options: "i" };
  }

  const projects = await Project.find(filters)
    .populate("owner", "name email")
    .populate("collaborators", "name email")
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .sort({ createdAt: -1 });

  const total = await Project.countDocuments(filters);

  res.json({
    data: projects,
    meta: {
      total,
      page: +page,
      limit: +limit,
    },
  });
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
  const project = await userHasAccessToProject(req.params.id, req.user.id);

  if (!project)
    return res.status(404).json({ message: "Project not found or no access" });

  res.json(project);
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const project = await isProjectOwner(req.params.id, req.user.id);

  if (!project)
    return res.status(403).json({ message: "Only owner can edit project" });

  Object.assign(project, req.body);
  await project.save();

  res.json(project);
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  const project = await isProjectOwner(req.params.id, req.user.id);

  if (!project)
    return res.status(403).json({ message: "Only owner can delete project" });

  await project.deleteOne();
  res.json({ message: "Project deleted" });
};

export const addCollaborator = async (req: AuthRequest, res: Response) => {
  const { userId } = req.body;

  const project = await isProjectOwner(req.params.id, req.user.id);
  if (!project)
    return res
      .status(403)
      .json({ message: "Only owner can add collaborators" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (project.collaborators.includes(user._id))
    return res.status(400).json({ message: "User already collaborator" });

  project.collaborators.push(user._id);
  await project.save();

  res.json(project);
};

export const removeCollaborator = async (req: AuthRequest, res: Response) => {
  const project = await isProjectOwner(req.params.id, req.user.id);
  if (!project)
    return res
      .status(403)
      .json({ message: "Only owner can remove collaborators" });

  project.collaborators = project.collaborators.filter(
    (id) => id.toString() !== req.params.userId
  );

  await project.save();
  res.json(project);
};
