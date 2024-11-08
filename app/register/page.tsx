"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import ButtonSmall from "../components/Buttons/ButtonSmall";
import API_URL, { auth_token_name } from "@/hooks/helper/constant";
import Validator, { validateMessagesI } from "@/hooks/validator/Validator";
import { isArrayNotEmpty } from "@/hooks/helper/helper";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [errors, setErrors] = useState<validateMessagesI[]>([]);

  const handleRegister = async (e: any) => {
    try {
      e.preventDefault();
      const validateGetErrors = new Validator()
        .setConfirmPassword1(password)
        .setConfirmPassword2(confirmPassword)
        .confirmPassword()
        .validateGetErrors();
      setErrors(validateGetErrors);
      setTimeout(() => {
        setErrors([]);
      }, 2000);

      if (isArrayNotEmpty(validateGetErrors)) {
        return;
      }
      setLoading(true);
      const response = await fetch(API_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });
      if (response.ok) {
        const { access_token } = await response.json();
        if (!access_token) {
          console.error("token not found, something went wrong..");
          return;
        }
        // Store the token in a cookie
        // setCookie(auth_token_name, token, { maxAge: 86400 });
        router.push("/login");
      } else {
        console.error("Registration failed");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-black h-screen">
      <div className="bg-transparent border  text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              className="block  font-bold mb-2"
              htmlFor="Name"
            >
              Name
            </label>
            <input
              className="text-black appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Name"
              type="text"
              required
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block  font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              className="text-black appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              type="email"
              required
              placeholder="Cool@crew.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block  font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="text-black appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block  font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="text-black appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              required
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-8">
            {errors.map((error) => (
              <div
                key={error.message}
                className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error.message}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <ButtonSmall
              buttonProps={{
                type: "submit",
                disabled: loading,
              }}

              customStylingPrimary={{
                background: "black",
                border: "1px solid gray",
                borderRadius: '0.8rem',
                padding: '0.5rem 1rem',
                color: "white"
              }}

            >
              Register
            </ButtonSmall>
            <a
              className="inline-block align-baseline font-bold text-sm hover:text-gray-300"
              href="/login"
            >
              Already have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
