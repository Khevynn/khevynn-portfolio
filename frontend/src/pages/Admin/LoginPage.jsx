import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthForm from "../../components/layouts/AuthForm";
import Loading from "../../components/ui/Loading";

function LoginPage() {
  const { status, mutate, isPending, data } = useAuth(
    import.meta.env.VITE_API_AUTH_LOGIN
  );

  const HandleLogin = (data) => {
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
    <div className="min-h-screen bg-[#050505] relative">
      <AuthForm onSubmit={handleSubmit(HandleLogin)} title="Admin Login">
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
          placeholder="Enter your password"
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
          Sign In
        </Button>

        <div className="text-center mt-2">
          <p className="text-zinc-500 text-sm font-inter">
            Don't have an account?{" "}
            <a href="/admin/register" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
              Create one
            </a>
          </p>
        </div>
      </AuthForm>
    </div>
  );
}

export default LoginPage;
