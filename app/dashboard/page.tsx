
import { Navbar } from "../components/navbar";
import DashboardClient from "./DashboardClient";    




export default async function DashboardPage() {


  return (
    <div className="bg-gray-100 min-h-screen bg-dashboard-bg font-prompt">
      <Navbar />
      <DashboardClient />
    </div>
  );
}
