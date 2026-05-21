"use client";

import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

const SignUp = () => {
  const onSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  const result = Object.fromEntries(form.entries());

  try {
    const { error } = await authClient.signUp.email({
      name: result.name,
      email: result.email,
      password: result.password,
      image: result.image
    });

    if (error) {
      toast.error(error.message || "Signup failed!");
      return;
    }

    const { error: signInError } = await authClient.signIn.email({
      email: result.email,
      password: result.password,
    });

    if (signInError) {
      toast.error("Account created! Please login manually.");
      window.location.href = "/login";
      return;
    }

    toast.success("Account created successfully!");
    window.location.href = "/";

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong!");
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10">

      <Form
        className="w-full max-w-md rounded-2xl border bg-white/5 p-8 shadow-2xl backdrop-blur-md"
        onSubmit={onSubmit}
      >
        <Fieldset>
          <Fieldset.Legend className="text-3xl font-bold text-white text-center">
            Create Account
          </Fieldset.Legend>

          <Description className="text-gray-500 text-center mt-2">
            Sign up to get started
          </Description>

          <FieldGroup className="mt-8 space-y-5">

            <TextField isRequired name="name">
              <Label className="text-white">Full Name</Label>
              <Input
                placeholder="Abid Hasan"
                className="bg-white/10 text-white placeholder:text-gray-400"
              />
              <FieldError className="text-red-400" />
            </TextField>

            <TextField isRequired name="email" type="email">
              <Label className="text-white">Email Address</Label>
              <Input
                placeholder="you@example.com"
                className="bg-white/10 text-white placeholder:text-gray-400"
              />
              <FieldError className="text-red-400" />
            </TextField>

            <TextField isRequired name="password" type="password">
              <Label className="text-white">Password</Label>
              <Input
                placeholder="••••••••"
                className="bg-white/10 text-white placeholder:text-gray-400"
              />
              <FieldError className="text-red-400" />
            </TextField>

            <TextField name="image">
              <Label className="text-white">Profile Picture URL (Optional)</Label>
              <Input
                placeholder="https://example.com/photo.jpg"
                className="bg-white/10 text-white placeholder:text-gray-400"
              />
              <FieldError className="text-red-400" />
            </TextField>

          </FieldGroup>

          <Fieldset.Actions className="mt-8">
            <Button
              type="submit"
              className="w-full rounded-xl bg-green-500 py-3.5 font-bold text-black hover:bg-green-400 transition-all"
            >
              <FloppyDisk />
              <span className="ml-2">Create Account</span>
            </Button>
          </Fieldset.Actions>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline font-medium">
              Login here
            </a>
          </p>
        </Fieldset>
      </Form>
    </div>
  );
};

export default SignUp;