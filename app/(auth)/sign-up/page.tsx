"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const  Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = async () => {
    await authClient.signUp.email({
      email,
      password,
      name: email.split("@")[0]
    }, {
      onRequest: ()=> {
      <div className="flex justify-center items-center m-auto min-h-screen">
        <Spinner className="size-8" />
      </div>
      },
      onSuccess: ()=> {
        router.push("/dashboard")
        setEmail("")
        setPassword("")
      },
      onError: (ctx)=> {
        alert(ctx.error.message)
      }
    })
  }

  return (
    <section className={cn("h-screen bg-muted")}>
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
        <h1>Vioset</h1>
          <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
          <h1 className="text-xl font-semibold">Sign Up</h1>
            <Input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="text-sm"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm"
              required
            />
            <Button onClick={handleSignUp} className="w-full cursor-pointer">
              Create Account
            </Button>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>Already a user?</p>
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
