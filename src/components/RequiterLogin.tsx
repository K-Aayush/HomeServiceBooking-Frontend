import { LockIcon, MailIcon, User } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const RequiterLogin = () => {
  const [state, setState] = useState("Login");
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form>
        <h1>Requiter {state}</h1>
        <p>Welcome back! Please sign in to continue</p>
        <>
          <div>
            <User className="w-6 h-6" />
            <Input placeholder="Company Name" type="text" required />
          </div>
          <div>
            <MailIcon className="w-6 h-6" />
            <Input placeholder="Email" type="text" required />
          </div>
          <div>
            <LockIcon className="w-6 h-6" />
            <Input placeholder="Password" type="password" required />
          </div>
        </>
        <Button>{state === "Login" ? "Login" : "Register"}</Button>
      </form>
    </div>
  );
};

export default RequiterLogin;
