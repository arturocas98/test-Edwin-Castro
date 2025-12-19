import Project from "./project.model";

export const userHasAccessToProject = async (
  projectId: string,
  userId: string
) => {
  const project = await Project.findOne({
    _id: projectId,
    $or: [{ owner: userId }, { collaborators: userId }],
  });

  return project;
};

export const isProjectOwner = async (projectId: string, userId: string) => {
  return Project.findOne({ _id: projectId, owner: userId });
};
