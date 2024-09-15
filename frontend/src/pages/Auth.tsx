import { AuthButton } from "../components/AuthButton";
import { InputField } from "../components/InputField";

export const Auth = ({ type }: { type: string }) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[15%]">
        <div className="text-3xl font-semibold flex justify-center pb-5">
          {type === "signup" ? "Create an Account" : "Sign in to Account"}
        </div>
        {type === "signup" && (
          <InputField title="First Name" placeholder="Enter your first name" />
        )}
        <InputField title="Email" placeholder="Enter your email" />
        <InputField title="Password" placeholder="Enter your password" />
        <AuthButton />
      </div>
    </div>
  );
};
