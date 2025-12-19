import ProjectList from "../../components/projects/ProjectList";

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Project
        </button>
      </div>

      <ProjectList />
    </div>
  );
}
