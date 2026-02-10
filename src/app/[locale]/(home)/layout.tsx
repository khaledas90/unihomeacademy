import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/Layout/header/header";
import Footer from "@/components/Layout/footer/footer";
const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const Token = (await cookies()).get("token")?.value;
    if (Token) {
        redirect("/admin");
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default AuthLayout;
