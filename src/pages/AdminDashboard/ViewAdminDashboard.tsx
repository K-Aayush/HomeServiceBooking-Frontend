import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ViewUserCard from "../../components/adminDashboard/ViewUserCard";

const ViewAdminDashboard = () => {
  const { isLoading, totalUsers } = useContext(AppContext);

  return (
    <div className="grid grid-cols-1 gap-3 mx-4 md:grid-cols-2 lg:grid-cols-3">
      <ViewUserCard totalUsers={totalUsers.total} title="Total Users" />
      <ViewUserCard totalUsers={totalUsers.user} title="Total Customers" />
      <ViewUserCard totalUsers={totalUsers.requiter} title="Total Recruiters" />
    </div>
  );
};

export default ViewAdminDashboard;
