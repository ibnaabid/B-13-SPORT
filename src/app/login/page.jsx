"use client"
import {
  Button, Description, FieldError, FieldGroup,
  Fieldset, Form, Input, Label, TextField,
} from "@heroui/react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

const Loginpage = () => {
        
  const googlehandler=async()=>{
      const data = await authClient.signIn.social({
    provider: "google",
  });
  }



  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const result = Object.fromEntries(form.entries());


    const { error } = await authClient.signIn.email({
      email: result.email,
      password: result.password,
      rememberMe: true,
    });

    if (error) {
      toast.error(error.message || "Login failed!");
      return;
    }

    toast.success("Login successful!");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10">
      <Form
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md"
        onSubmit={onSubmit}
      >
        <Fieldset>
          <Fieldset.Legend className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400 tracking-tight">
            Welcome Back
          </Fieldset.Legend>
          <Description className="text-gray-400 text-sm mt-1">
            Log in to manage and book your sports facilities.
          </Description>

          <FieldGroup className="mt-6 space-y-5">
            <TextField isRequired name="email" type="email" className="w-full">
              <Label className="text-gray-300 text-sm font-medium mb-1.5 block">Email Address</Label>
              <Input
                placeholder="you@example.com"
                className="bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 h-11"
              />
              <FieldError className="text-red-400" />
            </TextField>

            <TextField isRequired name="password" type="password" className="w-full">
            <Label className="text-gray-300 text-sm font-medium mb-1.5 block">Password</Label>
              <Input
                placeholder="••••••••"
                className="bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 h-11"
              />
              <FieldError className="text-red-400" />
            </TextField>
          </FieldGroup>

          <Button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-950 font-bold h-11 rounded-xl hover:scale-[1.01] transition-all duration-200"
          >
            Sign In
          </Button>

          <p className="text-blue-300 text-center font-bold text-xl">Or Login With?</p>
          <Button
          onClick={googlehandler}
          
          className="w-full mt-6 btn bg-amber-200  text-slate-950 font-bold h-11 rounded-xl hover:scale-[1.01] transition-all duration-200">Google</Button>

         <p className="text-center text-sm text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-emerald-400 hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </Fieldset>
      </Form>
    </div>
  );
};

export default Loginpage;