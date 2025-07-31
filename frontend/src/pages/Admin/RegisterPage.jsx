import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthForm from "../../components/layouts/AuthForm";
import LoadingScreen from "../../components/layouts/LoadingScreen"; 
import Loading from "../../components/ui/Loading";

function RegisterPage() {

const { status, mutate, isPending, data } = useAuth(
    import.meta.env.VITE_API_AUTH_REGISTER
  );

  const HandleRegister = (data) => {
    mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
      if (status.success === true) {
        window.location.href = "/admin/dashboard";
      }
    }, [status]);

  return (
    <>
    {isPending && <LoadingScreen text="Registering..." />}
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <AuthForm title="Register" onSubmit={handleSubmit(HandleRegister)}>
        <Input
          id="api_key"
          name="api_key"
          type="password"
          label="Api Key"
          placeholder="Enter the API Key"
          error={errors.api_key?.message}
          {...register("api_key", {
            required: "Api Key is required",
            maxLength: {
              value: 100,
              message: "Api Key must be less than 100 characters",
            },
            minLength: {
              value: 6,
              message: "Api Key must be at least 6 characters",
            },
          })}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
            maxLength: {
              value: 100,
              message: "Email must be less than 100 characters",
            },
            minLength: {
              value: 5,
              message: "Email must be at least 5 characters",
            },
          })}
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            maxLength: {
              value: 100,
              message: "Password must be less than 100 characters",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        <div className="text-white text-sm font-thin h-[50px] text-center flex justify-center items-center">
          {isPending ? <Loading /> : status.message}
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>

        <div className="text-center">
          <span className="text-gray-300">
            Already have an account? Login{" "}
            <a href="/admin/login" className="text-blue-500 hover:underline">
              here
            </a>
            !
          </span>
        </div>
      </AuthForm>
    </div>
    </>
    
  );
}
export default RegisterPage;
