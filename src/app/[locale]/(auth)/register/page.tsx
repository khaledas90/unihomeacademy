import React from "react";
import RegisterForm from "./_components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center md:justify-start px-4 md:pl-20 lg:pl-32 py-12 sm:px-6 lg:px-8">
            <RegisterForm />
        </div>
    );
}
