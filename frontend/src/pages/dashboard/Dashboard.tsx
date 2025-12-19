import MainLayout from "../../components/layout/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="text-gray-600">
        Welcome to your project management dashboard.
      </p>
    </MainLayout>
  );
}
