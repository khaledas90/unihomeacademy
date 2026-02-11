"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useLogin } from "@/store/api/useAuth";
import { Icon } from "@iconify/react";

interface SignInFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const { mutateAsync: loginUser, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    setError("");

    try {
      await loginUser(data);
      router.push(`/${locale}/dashboard`);
    } catch (error: any) {
      console.error(error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-xl bg-white/60 dark:bg-black/60 backdrop-blur-xl shadow-md animate-in fade-in slide-in-from-left-10 duration-700 border border-white/20 ">
      <CardHeader className="space-y-4 pb-2">
        <div className="flex justify-center mb-2">
          <div className="relative w-40 h-16 transition-transform duration-300 hover:scale-105">
            <Image
              src={logo}
              alt="BrandLogo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center font-light text-base text-gray-600 dark:text-gray-300">
          Sign in to access your professional dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {error && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium ml-1">Email Address</Label>
            <Input
              id="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address.",
                },
              })}
              type="email"
              placeholder="name@company.com"
              className={`h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm border-gray-200 dark:border-gray-800 focus:bg-white dark:focus:bg-black transition-all duration-300 ${errors.email ? "border-red-500 ring-1 ring-red-500" : "hover:border-gray-400 dark:hover:border-gray-600"
                }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 ml-1 mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-medium ml-1">Password</Label>
            </div>

            <div className="relative group">
              <Input
                id="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long.",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm border-gray-200 dark:border-gray-800 pr-10 focus:bg-white dark:focus:bg-black transition-all duration-300 ${errors.password ? "border-red-500 ring-1 ring-red-500" : "hover:border-gray-400 dark:hover:border-gray-600"
                  }`}
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 ml-1 mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-white hover:opacity-90 active:scale-[0.98]"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Wait...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-gray-400 dark:via-gray-700 dark:to-gray-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 whitespace-nowrap select-none">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-300 to-gray-400 dark:via-gray-700 dark:to-gray-600" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-black transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Icon icon="logos:google-icon" width="20" height="20" />
            <span className="font-medium">Sign In with Google</span>
          </Button>

          <div className="text-center text-sm mt-4">
            <span className="text-muted-foreground font-light">Don't have an account? </span>
            <Link
              href={`/${locale}/register`}
              className="font-medium text-primary hover:text-primary/80 transition-colors ml-1"
            >
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
