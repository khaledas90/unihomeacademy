import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import bgImage from "@/assets/blue-background-auth.jpg";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const Token = (await cookies()).get("token")?.value;
  if (Token) {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* Subtle overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40" />
      </div>

      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default AuthLayout;
