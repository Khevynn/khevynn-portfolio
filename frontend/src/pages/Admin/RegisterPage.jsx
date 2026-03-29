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
    {isPending && <LoadingScreen text="Creating Account..." />}
    <div className="min-h-screen bg-[#050505] relative">
      <AuthForm title="Register Admin" onSubmit={handleSubmit(HandleRegister)}>
        <Input
          id="api_key"
          name="api_key"
          type="password"
          label="Invitation Key"
          placeholder="Enter the security key"
          error={errors.api_key?.message}
          {...register("api_key", {
            required: "Api Key is required",
          })}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        <div className="text-zinc-400 text-sm font-inter h-[40px] text-center flex justify-center items-center">
          {isPending ? <Loading /> : (
            <span className={status.success ? "text-emerald-400" : "text-red-400"}>
              {status.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          Create Account
        </Button>

        <div className="text-center mt-2">
          <p className="text-zinc-500 text-sm font-inter">
            Already have an account?{" "}
            <a href="/admin/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
              Sign In
            </a>
          </p>
        </div>
      </AuthForm>
    </div>
    </>
  );
}
export default RegisterPage;
