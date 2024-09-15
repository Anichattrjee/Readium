import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { register } from "@/http/api";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const RegisterPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  //using tanstack query
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("User Successfull Registered");
      navigate("/dashboard/home");
    },
  });

  const handleRegister = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //make the api call

    //the data(email,password) will be passed to the mutationFn which in our caste is login

    if (!name || !email || !password) {
      //you can use any diff library here
      return alert("Email and password is required");
    }
    mutation.mutate({ name, email, password });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account <br />
            {mutation.isError && (
              <span className="text-red-500 text-sm">Something Went Wrong</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input ref={nameRef} id="name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input ref={passwordRef} id="password" type="password" />
            </div>
            <Button
              onClick={handleRegister}
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderCircle className="animate-spin" />}
              <span className="ml-2">Create an account</span>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
