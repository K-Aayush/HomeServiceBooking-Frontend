import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Trash2, Edit, Eye, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

interface Business {
  id: string;
  name: string;
  about: string;
  address: string;
  category: string;
  amount: number;
  images: { url: string }[];
  requiterId: string;
}

const ManageService = () => {
  const { backendUrl, requiterToken } = useContext(AppContext);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  // Fetch business data
  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!requiterToken) return;

      try {
        setLoading(true);
        const { data } = await axios.get(
          `${backendUrl}/api/requiter/getBusinessData`,
          {
            headers: { Authorization: requiterToken },
          }
        );

        if (data.success) {
          setBusinesses(data.businessData || []);
        } else {
          toast.error("Failed to fetch business data");
        }
      } catch (error: any) {
        console.error("Error fetching business data:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch business data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [backendUrl, requiterToken]);

  // Handle delete business
  const handleDeleteBusiness = async (businessId: string) => {
    if (!requiterToken) return;

    try {
      setDeleteLoading(businessId);
      // This is a placeholder - you'll need to implement the delete endpoint in your API
      const { data } = await axios.delete(
        `${backendUrl}/api/requiter/deleteBusiness/${businessId}`,
        {
          headers: { Authorization: requiterToken },
        }
      );

      if (data.success) {
        toast.success("Business deleted successfully");
        // Remove the deleted business from the state
        setBusinesses((prev) =>
          prev.filter((business) => business.id !== businessId)
        );
      } else {
        toast.error(data.message || "Failed to delete business");
      }
    } catch (error: any) {
      console.error("Error deleting business:", error);
      toast.error(error.response?.data?.message || "Failed to delete business");
    } finally {
      setDeleteLoading(null);
      setDeleteDialogOpen(false);
    }
  };

  // Handle edit business
  const handleEditBusiness = (businessId: string) => {
    navigate(`/requiterDashboard/edit-service/${businessId}`);
  };

  // Handle view business
  const handleViewBusiness = (businessId: string) => {
    navigate(`/requiterDashboard/view-service/${businessId}`);
  };

  // Open delete dialog
  const openDeleteDialog = (businessId: string) => {
    setSelectedBusinessId(businessId);
    setDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="container p-4 mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Manage Services</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="w-full h-48" />
              <CardContent className="p-4">
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-1/2 h-4 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-2/3 h-4" />
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Skeleton className="w-24 h-10" />
                <Skeleton className="w-24 h-10" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Manage Services</h1>

      {businesses.length === 0 ? (
        <div className="p-8 text-center border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="mb-2 text-xl font-semibold">No services found</h2>
          <p className="mb-4 text-gray-600">
            You haven't added any services yet.
          </p>
          <Button onClick={() => navigate("/requiterDashboard/add-service")}>
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <Card key={business.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                {business.images && business.images.length > 0 ? (
                  <img
                    src={business.images[0].url || "/placeholder.svg"}
                    alt={business.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{business.name}</h3>
                  <Badge
                    variant="outline"
                    className="text-green-800 bg-green-100 border-green-200"
                  >
                    ${business.amount.toFixed(2)}/hr
                  </Badge>
                </div>
                <Badge className="mb-2">{business.category}</Badge>
                <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                  {business.address}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {business.about}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewBusiness(business.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" /> View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditBusiness(business.id)}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => openDeleteDialog(business.id)}
                  disabled={deleteLoading === business.id}
                >
                  {deleteLoading === business.id ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 mr-1" />
                  )}
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this service?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              service and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                selectedBusinessId && handleDeleteBusiness(selectedBusinessId)
              }
              disabled={deleteLoading !== null}
            >
              {deleteLoading !== null ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageService;
