"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Signin = () => {

    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const handleSignIn = async () => {
      await authClient.signIn.email({
        email,
        password,
        rememberMe: false
      }, {
        onRequest: (ctx)=> {
          <div className="flex justify-center items-center m-auto min-h-screen">
            <Spinner className="size-8" />
          </div>
        },
        onSuccess: (ctx)=> {
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
        <div className="flex flex-col items-center gap-6 lg:justify-start">
        <h1>Vioset</h1>
          <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
          <h3 className="text-xl font-semibold">Sign In</h3>
            <Input
            onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Email"
              className="text-sm"
              required
            />
            <Input
            onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Password"
              className="text-sm"
              required
            />
            <Button onClick={handleSignIn} className="w-full">
              Sign In
            </Button>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>Need an account?</p>
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin