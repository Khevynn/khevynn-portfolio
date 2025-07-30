import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthForm from "../../components/layouts/AuthForm";

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <AuthForm title="Register" onSubmit={console.log("Register")}>
        <Input
          id="apiRegisterPassword"
          name="apiRegisterPassword"
          type="password"
          label="Api Register Password"
          placeholder="Enter the API register password"
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
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
  );
}
export default RegisterPage;
