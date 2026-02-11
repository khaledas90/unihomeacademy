import React from "react";
import LoginForm from "./_components/LoginForm";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center md:justify-start px-4 md:pl-20 lg:pl-32">
      <LoginForm />
    </div>
  );
}
