import {
  EyeIcon,
  EyeOff,
  ImageUp,
  LockIcon,
  MailIcon,
  User,
} from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import image from "../assets/upload.png";

const RequiterLogin = () => {
  const [state, setState] = useState<string>("Login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] =
    useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (state === "Sign up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
    }
  };
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <form
        onSubmit={handleSubmit}
        className="relative p-10 bg-white rounded-xl text-slate-500"
      >
        <h1 className="text-2xl font-medium text-center text-neutral-700">
          Requiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state === "Sign up" && isTextDataSubmitted ? (
          <>
            {/* extra form to uploading company icon while creating account */}
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img src={image} alt="image" className="w-16 rounded-full" />
                <input type="file" id="image" hidden={true} />
              </label>
              <p>
                Upload Company <br /> logo
              </p>
            </div>
          </>
        ) : (
          <>
            {/* normal form for both  */}
            {state !== "Login" && (
              <div className="relative mt-5">
                <User className="absolute w-5 h-5 top-1/4 left-3" />
                <Input
                  placeholder="Company Name"
                  type="text"
                  required
                  className="pl-10 rounded-full"
                />
              </div>
            )}
            <div className="relative mt-5">
              <MailIcon className="absolute w-5 h-5 top-1/4 left-3" />
              <Input
                placeholder="Email"
                type="text"
                required
                className="pl-10 rounded-full"
              />
            </div>
            <div className="relative mt-5">
              <LockIcon className="absolute w-5 h-5 top-1/4 left-3" />
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                required
                className="pl-10 rounded-full"
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
          </>
        )}

        <p className="my-4 text-sm text-blue-600 cursor-pointer">
          Forgot Password?
        </p>

        {/* button state ternery operator */}
        <Button type="submit" className="w-full rounded-full">
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
