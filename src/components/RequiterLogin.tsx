import { LockIcon, MailIcon, User } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const RequiterLogin = () => {
  const [state, setState] = useState("Login");
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Requiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        <>
          {state !== "Login" && (
            <div className="relative mt-5">
              <User className="absolute top-1/4 left-3 w-5 h-5" />
              <Input
                placeholder="Company Name"
                type="text"
                required
                className="pl-10 rounded-full"
              />
            </div>
          )}
          <div className="relative mt-5">
            <MailIcon className="absolute top-1/4 left-3 w-5 h-5" />
            <Input
              placeholder="Email"
              type="text"
              required
              className="pl-10 rounded-full"
            />
          </div>
          <div className="relative mt-5">
            <LockIcon className="absolute top-1/4 left-3 w-5 h-5" />
            <Input
              placeholder="Password"
              type="password"
              required
              className="pl-10 rounded-full"
            />
          </div>
        </>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>
        <Button className="w-full rounded-full">
          {state === "Login" ? "Login" : "Register"}
        </Button>
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
