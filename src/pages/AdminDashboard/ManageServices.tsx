import { useState } from "react";
import { Search, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useNotifications } from "../../context/NotificationContext";

// Mock service data
const mockServices = [
  {
    id: "1",
    name: "House Cleaning",
    category: "Cleaning",
    amount: 50,
    requiterName: "Jane Doe",
    requiterId: "req123",
    status: "active",
    created: "2023-05-15T10:30:00.000Z",
  },
  {
    id: "2",
    name: "Lawn Mowing",
    category: "Gardening",
    amount: 35,
    requiterName: "John Smith",
    requiterId: "req456",
    status: "pending",
    created: "2023-05-18T14:20:00.000Z",
  },
  {
    id: "3",
    name: "Computer Repair",
    category: "Tech Support",
    amount: 75,
    requiterName: "Mike Johnson",
    requiterId: "req789",
    status: "rejected",
    created: "2023-05-10T09:15:00.000Z",
  },
  {
    id: "4",
    name: "Dog Walking",
    category: "Pet Care",
    amount: 25,
    requiterName: "Lisa Chen",
    requiterId: "req101",
    status: "active",
    created: "2023-05-12T16:45:00.000Z",
  },
  {
    id: "5",
    name: "Plumbing Services",
    category: "Home Repair",
    amount: 85,
    requiterName: "Robert Davis",
    requiterId: "req202",
    status: "pending",
    created: "2023-05-19T11:30:00.000Z",
  },
];

const ManageServices = () => {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const { addNotification } = useNotifications();

  const handleApproveService = (
    serviceId: string,
    serviceName: string,
    requiterId: string
  ) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, status: "active" } : service
      )
    );

    addNotification({
      message: `Service approved: ${serviceName}`,
      isRead: false,
      type: "success",
      requiterId,
    });
  };

  const handleRejectService = (
    serviceId: string,
    serviceName: string,
    requiterId: string
  ) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, status: "rejected" } : service
      )
    );

    addNotification({
      message: `Service rejected: ${serviceName}`,
      isRead: false,
      type: "warning",
      requiterId,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.requiterName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || filter === service.status;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center flex-1 px-3 py-2 bg-white border rounded-md min-w-[260px]">
          <Search className="w-5 h-5 mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            className="flex-1 text-sm bg-transparent border-0 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="px-3 py-2 text-sm bg-white border rounded-md cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Services</option>
            <option value="active">Active</option>
            <option value="pending">Pending Approval</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-hidden bg-white border rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Service
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Requiter
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {service.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {service.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {service.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${service.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {service.requiterName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(service.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {service.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleApproveService(
                                  service.id,
                                  service.name,
                                  service.requiterId
                                )
                              }
                              className="p-1 text-green-600 rounded hover:bg-green-50"
                              title="Approve"
                            >
                              <ThumbsUp className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleRejectService(
                                  service.id,
                                  service.name,
                                  service.requiterId
                                )
                              }
                              className="p-1 text-red-600 rounded hover:bg-red-50"
                              title="Reject"
                            >
                              <ThumbsDown className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button className="p-1 text-gray-600 rounded hover:bg-gray-100">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500 whitespace-nowrap"
                  >
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredServices.length}</span>{" "}
                of{" "}
                <span className="font-medium">{filteredServices.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-gray-300 bg-indigo-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
