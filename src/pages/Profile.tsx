import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Edit, Save, Settings } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import {
  requiterProfileSchema,
  requiterProfileSchemaData,
} from "../lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const Profile = () => {
  const {
    setRequiterData,
    isLoading,
    backendUrl,
    requiterData,
    requiterToken,
  } = useContext(AppContext);

  // State variables to manage input and editing mode
  const [isEditing, setIsEditing] = useState({
    name: false,
    password: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<requiterProfileSchemaData>({
    resolver: zodResolver(requiterProfileSchema),
    defaultValues: {
      firstName: requiterData?.firstName || "",
      lastName: requiterData?.lastName || "",
      oldPassword: "",
      newPassword: "",
      requiterProfileImage: "",
    },
    mode: "onChange",
  });

  // Update form values when requiterData changes
  useEffect(() => {
    if (requiterData) {
      setValue("firstName", requiterData.firstName || "");
      setValue("lastName", requiterData.lastName || "");
    }
  }, [requiterData, setValue]);

  // Handle Save action
  const onSubmit = async (requiter: requiterProfileSchemaData) => {
    console.log(requiter);
    try {
      const formData = new FormData();
      // Append profile image if exists
      if (
        requiter.requiterProfileImage &&
        requiter.requiterProfileImage instanceof FileList &&
        requiter.requiterProfileImage.length > 0
      ) {
        formData.append("userProfileImage", requiter.requiterProfileImage[0]);
      }

      // Only append if the value exists

      formData.append("firstName", requiter.firstName || "");
      formData.append("lastName", requiter.lastName || "");

      // Only append passwords if editing password
      if (isEditing.password) {
        formData.append("oldPassword", requiter.oldPassword || "");
        formData.append("newPassword", requiter.newPassword || "");
      }

      const { data } = await axios.put(
        `${backendUrl}/api/requiter/updateRequiterProfile`,
        formData,
        {
          headers: {
            Authorization: requiterToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setRequiterData(data.requiter);

        reset({
          firstName: data.requiter.firstName || "",
          lastName: data.requiter.lastName || "",
          oldPassword: "",
          newPassword: "",
          requiterProfileImage: "",
        });
        setIsEditing({ name: false, password: false });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        toast.error(error.response.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message || "Error while updating data");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this Account?")) {
        const { data } = await axios.delete(
          `${backendUrl}/api/user/deleteRequiterData`,
          {
            headers: {
              Authorization: requiterToken,
            },
          }
        );

        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        toast.error(error.response.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message || "Error while deleting user");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen ">
      <form>
        <div className="flex flex-col justify-center px-6 py-16 space-y-6 md:mx-16">
          <div className="relative w-32 h-32">
            <img
              src={requiterData?.requiterProfileImage}
              alt="profile"
              className="object-cover w-full h-full border rounded-full"
            />
            <Input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              {...register("requiterProfileImage")}
            />
          </div>

          <div className="max-w-screen-lg space-y-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold md:text-3xl">
              <Settings className="w-6 h-6 md:w-10 md:h-10" />
              Account Settings
            </h2>

            <div className="items-center justify-between w-full pb-6 border-b md:flex">
              <Label className="text-lg min-w-max">Email</Label>
              <div className="flex items-center w-full max-w-md gap-6 mt-2">
                <Input
                  className="w-full"
                  placeholder={requiterData?.email}
                  disabled
                />
                <div className="w-[110px]"></div>
              </div>
            </div>

            {/* full name Section */}
            <div className="items-center justify-between w-full pb-6 border-b md:flex">
              <Label className="text-lg min-w-max">Full Name</Label>
              <div className="flex items-center w-full max-w-md gap-6 mt-2">
                {isEditing.name ? (
                  <>
                    <div className="flex gap-2">
                      <div className="w-full">
                        <Input
                          type="text"
                          className="w-full"
                          {...register("firstName")}
                        />
                        {errors.firstName && (
                          <p className="text-red-500">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <Input
                          type="text"
                          className="w-full"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <p className="text-red-500">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        handleSubmit((data) => {
                          onSubmit({
                            ...data,
                            oldPassword: "",
                            newPassword: "",
                          });
                        })();
                        setIsEditing((prev) => ({ ...prev, name: false }));
                      }}
                    >
                      <Save /> Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Input
                      className="w-full"
                      placeholder={`${requiterData?.firstName} ${requiterData?.lastName}`}
                      disabled
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing((prev) => ({ ...prev, name: true }));
                      }}
                    >
                      <Edit /> Edit
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Password Section */}
            <div className="items-center justify-between w-full pb-6 border-b md:flex">
              <Label className="text-lg min-w-max">Password</Label>
              <div className="flex items-center w-full max-w-md gap-6 mt-2">
                {isEditing.password ? (
                  <>
                    <div className="flex flex-col w-full">
                      <div className="w-full">
                        <Input
                          type="password"
                          className="w-full"
                          placeholder="Current password"
                          {...register("oldPassword")}
                        />
                        {errors.oldPassword && (
                          <p className="text-red-500">
                            {errors.oldPassword.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full mt-2">
                        <Input
                          type="password"
                          className="w-full"
                          placeholder="New password"
                          {...register("newPassword")}
                        />
                        {errors.newPassword && (
                          <p className="text-red-500">
                            {errors.newPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        handleSubmit((data) => {
                          onSubmit(data);
                        })();
                        setIsEditing((prev) => ({ ...prev, password: false }));
                      }}
                    >
                      <Save /> Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Input
                      className="w-full"
                      placeholder="***********"
                      disabled
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing((prev) => ({ ...prev, password: true }));
                        reset({ oldPassword: "", newPassword: "" });
                      }}
                    >
                      <Edit /> Edit
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="items-center justify-between w-full py-6 border-b md:flex">
              <div className="flex flex-col ">
                <h2 className="text-lg min-w-max">Delete Account</h2>
                <p className="max-w-xs text-xs">
                  Please note: This action cannot be undone and will permanently
                  delete your account.
                </p>
              </div>
              <div className="flex items-center w-full max-w-md gap-6">
                <Button
                  onClick={handleDelete}
                  className="mt-2"
                  variant={"destructive"}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
