import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import GoogleLogin from "../GoogleOauth";
import Button from "../../../component/atoms/Button";
import { useLogin } from "../../../hooks/useAuth";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AuthLayout from "..";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk menentukan apakah password terlihat atau tidak
  const { loading, action } = useLogin();

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-white">Login</h1>
        <input
          className="px-4 py-2 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="relative">
          <input
            className=" w-full px-4 py-2 rounded-lg"
            placeholder="Password"
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash} 
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)} 
          />
        </div>
        <Button
          className="py-2"
          variant="primary"
          loading={loading}
          onClick={() => {
            action(email, password);
          }}
        >
          Sign In
        </Button>
        <hr />
        <GoogleLogin buttonText="Sign in with Google" />
        <span className="text-center text-white">
          or not have account?{" "}
          <Link to="/register" className="text-blue-500">
            Register Now
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
}
