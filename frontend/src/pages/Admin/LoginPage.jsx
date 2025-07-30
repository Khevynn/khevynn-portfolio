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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <AuthForm onSubmit={handleSubmit(HandleLogin)} title="Login">
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
          Login
        </Button>

        <div className="text-center">
          <span className="text-gray-300 justify-center">
            Don't have an account? Register{" "}
            <a href="/admin/register" className="text-blue-500 hover:underline">
              here
            </a>
            !
          </span>
        </div>
      </AuthForm>
    </div>
  );
}

export default LoginPage;
