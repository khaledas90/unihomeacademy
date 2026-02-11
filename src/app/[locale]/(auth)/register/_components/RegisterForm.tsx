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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRegister } from "@/store/api/useAuth";
import { TermsAndConditionsContent } from "./TermsAndConditions";

interface RegisterFormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
    gender: string;
    whats: string;
    country: string;
    timezone: string;
    source: string;
    accept_terms: boolean;
    type: string;
}

export default function RegisterForm() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState<"Student" | "Teacher">("Student");
    const router = useRouter();
    const params = useParams();
    const locale = params?.locale || "en";
    const { mutateAsync: registerUser, isPending } = useRegister();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        defaultValues: {
            type: "Student",
            accept_terms: false,
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setError("");

        if (!data.accept_terms) {
            setError("You must accept the terms and conditions.");
            return;
        }

        try {
            await registerUser({
                email: data.email,
                password: data.password,
                name: `${data.firstname} ${data.lastname}`,
                // Note: The current useRegister hook only takes email, password, name.
                // If the backend expects more, the hook should be updated.
            });
            router.push(`/${locale}/dashboard`);
        } catch (err: any) {
            console.error(err);
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <Card className="w-full max-w-xl bg-white/60 dark:bg-black/60 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-left-10 duration-700 border border-white/20 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5">
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
                    Create Account
                </CardTitle>
                <CardDescription className="text-center font-light text-base text-gray-600 dark:text-gray-300">
                    Join Unihome Academy to start your learning journey
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {error && (
                    <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-center space-x-4 mb-4">
                    <span className={`text-sm font-medium ${userType === "Student" ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>Student</span>
                    <button
                        onClick={() => {
                            const nextType = userType === "Student" ? "Teacher" : "Student";
                            setUserType(nextType);
                            setValue("type", nextType);
                        }}
                        type="button"
                        className="relative w-12 h-6 rounded-full bg-primary transition-colors duration-200 focus:outline-none"
                    >
                        <div
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${userType === "Teacher" ? "translate-x-6" : ""
                                }`}
                        />
                    </button>
                    <span className={`text-sm font-medium ${userType === "Teacher" ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>Teacher</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstname">First Name</Label>
                            <Input
                                id="firstname"
                                {...register("firstname", { required: "First name is required." })}
                                placeholder="First Name"
                                className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm"
                            />
                            {errors.firstname && <p className="text-xs text-red-500">{errors.firstname.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input
                                id="lastname"
                                {...register("lastname", { required: "Last name is required." })}
                                placeholder="Last Name"
                                className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm"
                            />
                            {errors.lastname && <p className="text-xs text-red-500">{errors.lastname.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                }
                            })}
                            type="email"
                            placeholder="name@example.com"
                            className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm"
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required.",
                                        minLength: { value: 8, message: "Min 8 characters" }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm_password">Confirm Password</Label>
                            <div className="relative group">
                                <Input
                                    id="confirm_password"
                                    {...register("confirm_password", {
                                        required: "Required",
                                        validate: (val) => val === watch("password") || "Passwords don't match"
                                    })}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm"
                                    className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.confirm_password && <p className="text-xs text-red-500">{errors.confirm_password.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <Select onValueChange={(val) => setValue("gender", val)}>
                                <SelectTrigger className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm w-full">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Country</Label>
                            <Select onValueChange={(val) => setValue("country", val)}>
                                <SelectTrigger className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm w-full">
                                    <SelectValue placeholder="Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="eg">Egypt</SelectItem>
                                    <SelectItem value="sa">Saudi Arabia</SelectItem>
                                    <SelectItem value="ae">UAE</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Timezone</Label>
                            <Select onValueChange={(val) => setValue("timezone", val)}>
                                <SelectTrigger className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm w-full text-left">
                                    <SelectValue placeholder="GMT+2" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GMT+2">GMT+2 (Cairo)</SelectItem>
                                    <SelectItem value="GMT+3">GMT+3 (Riyadh)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Source</Label>
                            <Select onValueChange={(val) => setValue("source", val)}>
                                <SelectTrigger className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm w-full">
                                    <SelectValue placeholder="Source" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="facebook">Facebook</SelectItem>
                                    <SelectItem value="google">Google</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whats">WhatsApp Number</Label>
                        <Input
                            id="whats"
                            {...register("whats", { required: "Required" })}
                            placeholder="WhatsApp Number"
                            className="h-11 bg-white/50 dark:bg-black/30 backdrop-blur-sm"
                        />
                    </div>

                    <div className="flex items-center space-x-2 py-2">
                        <input
                            type="checkbox"
                            id="terms"
                            {...register("accept_terms")}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer flex items-center gap-1">
                            I accept the
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button type="button" className="text-primary hover:underline font-medium">
                                        Terms & Conditions
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl bg-white/90 backdrop-blur-xl border-white/20">
                                    <DialogHeader>
                                        <DialogTitle>Terms & Conditions</DialogTitle>
                                    </DialogHeader>
                                    <TermsAndConditionsContent />
                                </DialogContent>
                            </Dialog>
                        </label>
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
                            "Sign Up"
                        )}
                    </Button>

                    <div className="text-center text-sm mt-4">
                        <span className="text-muted-foreground font-light">Already have an account? </span>
                        <Link
                            href={`/${locale}/login`}
                            className="font-medium text-primary hover:text-primary/80 transition-colors ml-1"
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
