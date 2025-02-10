import { EyeIcon, EyeOff, LockIcon, MailIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import image from "../assets/upload.png";
import { requiterFormData, requiterFormSchema } from "../lib/validator";

const RequiterLogin = () => {
  const [state, setState] = useState<string>("Login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<requiterFormData | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isTextDataSubmitted, setIsTextDataSubmitted] =
    useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    clearErrors,
  } = useForm<requiterFormData>({
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      companyLogo: null,
    },
    resolver: zodResolver(requiterFormSchema),
    shouldUnregister: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      //set file for form validation
      setValue("companyLogo", files, { shouldValidate: true });

      //Generate previewUrl
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      console.log("file selected:", files[0]);
    }
  };

  const onSubmit: SubmitHandler<requiterFormData> = async (data) => {
    console.log("Form Data Before Processing:", { state, data });
    if (state === "Sign up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
      setFormValues(data);
      console.log("Proceeding to Step 2 (File Upload)");
      return;
    }

    if (state === "Sign up" && isTextDataSubmitted) {
      if (!data.companyLogo || data.companyLogo.length === 0) {
        setError("companyLogo", { message: "Company Logo is required" });

        return;
      }

      const file = data.companyLogo[0];
      console.log("Uploaded File:", file);
      if (file.size > 5000000) {
        setError("companyLogo", { message: "File size must be less than 5MB" });
        return;
      }

      if (!["image/jpg", "image/png", "image/jpeg"].includes(file.type)) {
        setError("companyLogo", { message: "Invalid file formate" });
        return;
      }

      console.log("final submission:", data);
    } else if (state === "Login") {
      clearErrors("companyName");
      console.log("Login SUbmission:", data);
    }
  };

  useEffect(() => {
    if (isTextDataSubmitted && formValues) {
      setValue("companyName", formValues.companyName);
      setValue("email", formValues.email);
      setValue("password", formValues.password);
    }
  }, [isTextDataSubmitted, formValues, setValue]);

  useEffect(() => {
    console.log("⚠️ Form Errors:", errors);
  }, [errors]);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative p-10 bg-white rounded-xl text-slate-500"
      >
        <h1 className="text-2xl font-medium text-center text-neutral-700">
          Requiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state === "Sign up" && isTextDataSubmitted ? (
          <>
            {/* extra form to uploading company icon while creating account */}
            <div className="flex flex-col my-10">
              <div className="flex items-center gap-4">
                <label htmlFor="image">
                  <img
                    src={previewImage || image}
                    alt="image"
                    className="w-16 rounded-full"
                  />
                  <input
                    type="file"
                    id="image"
                    hidden={true}
                    onChange={handleFileChange}
                  />
                </label>
                <p>
                  Upload Company <br /> logo
                </p>
              </div>

              {errors.companyLogo &&
                typeof errors.companyLogo.message === "string" && (
                  <p className="text-xs text-red-500">
                    {errors.companyLogo.message}
                  </p>
                )}
            </div>
          </>
        ) : (
          <>
            {/* normal form for both  */}
            {state !== "Login" && (
              <div>
                <div className="relative mt-5">
                  <User className="absolute w-5 h-5 top-1/4 left-3" />
                  <Input
                    {...(state === "Sign up" ? register("companyName") : {})}
                    placeholder="Company Name"
                    type="text"
                    className={`pl-10 rounded-full ${
                      errors.companyName &&
                      "border-red-500 focus-visible:ring-red-500"
                    }`}
                  />
                </div>
                {errors.companyName && (
                  <p className="text-xs text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
            )}
            <div>
              <div className="relative mt-5">
                <MailIcon className="absolute w-5 h-5 top-1/4 left-3" />
                <Input
                  {...register("email")}
                  placeholder="Email"
                  type="text"
                  className={`pl-10 rounded-full ${
                    errors.email && "border-red-500 focus-visible:ring-red-500"
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <div className="relative mt-5">
                <LockIcon className="absolute w-5 h-5 top-1/4 left-3" />
                <Input
                  {...register("password")}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 rounded-full"
                  required
                />
                {/* state to show and hide password */}
                {showPassword ? (
                  <EyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute w-5 h-5 cursor-pointer top-1/4 right-3"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute w-5 h-5 cursor-pointer top-1/4 right-3"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </>
        )}

        <p className="my-4 text-sm text-blue-600 cursor-pointer">
          Forgot Password?
        </p>

        {/* button state ternery operator */}
        <Button
          type="submit"
          className="w-full rounded-full"
          onClick={() => console.log("button clicked state: ", state)}
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </Button>

        {/* changing state by login or sign up  */}
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-blue-600 cursor-pointer"
            >
              Signup
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RequiterLogin;
