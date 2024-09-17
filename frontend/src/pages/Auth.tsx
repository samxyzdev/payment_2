import { useState } from "react";
import axios from "axios";
import { AuthButton } from "../components/AuthButton";
import { InputField } from "../components/InputField";
import { useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload =
      type === "signup" ? { name, email, password } : { email, password };

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/${type}`,
        payload
      );
      const { jwtToken } = await response.data;

      localStorage.setItem("token", jwtToken);

      if (jwtToken) {
        return navigate("/dashboard");
      }

      // handle success (e.g., navigate, show success message)
    } catch (error) {
      console.error("Error during API request:", error);
      // handle error (e.g., show error message)
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[15%]">
        <div className="text-3xl font-semibold flex justify-center pb-5">
          {type === "signup" ? "Create an Account" : "Sign in to Account"}
        </div>
        {type === "signup" && (
          <InputField
            title="First Name"
            placeholder="Enter your first name"
            onChange={(e) => setName(e.target.value)} // Capture name input
          />
        )}
        <InputField
          title="Email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)} // Capture email input
        />
        <InputField
          title="Password"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)} // Capture password input
        />
        <AuthButton type={type} onClick={handleSubmit} />
      </div>
    </div>
  );
};
