import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ViewUserCard from "../../components/adminDashboard/ViewUserCard";

const ViewAdminDashboard = () => {
  const { error, isLoading, totalUsers } = useContext(AppContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isLoading ? <p>Loading...</p> : <ViewUserCard totalUsers={totalUsers} />}
    </div>
  );
};

export default ViewAdminDashboard;
