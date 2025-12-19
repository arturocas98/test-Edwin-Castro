import { useState } from "react";
import CreateProjectModal from "../../components/projects/CreateProjectModal";
import ProjectList from "../../components/projects/ProjectList";
import type { Project } from "../../types/project";

export default function ProjectsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleProjectCreated = (newProject: Project) => {
    setShowCreateModal(false);
    console.log(newProject);
    
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-2">
              Manage and organize your projects and tasks
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            New Project
          </button>
        </div>
      </div>

      <ProjectList onProjectCreated={handleProjectCreated} />

      <CreateProjectModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}
