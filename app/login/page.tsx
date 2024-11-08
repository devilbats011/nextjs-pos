"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import ButtonSmall from "../components/Buttons/ButtonSmall";
import Header1 from "../components/Headers/Header1";
import { fetchWithAuth } from "@/hooks/helper/helper";
import API_URL, { auth_token_name } from "@/hooks/helper/constant";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Make a login request to the API
      const response = await fetchWithAuth(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { access_token } = await response.json();
        setCookie(auth_token_name, access_token, { maxAge: 86400 });
        router.push("/user/sales?message=login!");
      } else {
        setError("Login failed");
        console.error("Login failed");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Ops, Something Wrong");
      console.error(error);
    }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div
        className="bg-transparent border rounded py-4 px-2.5 gap-4 flex-col flex justify-center items-center"
        style={{
          height: "50%",
          minHeight: "450px",
          width: "400px",
          color: 'white'
        }}
      >
        <form onSubmit={handleLogin} className="w-10/12">
          <Header1
            style={{
              padding: "4rem 0 2rem 0",
              width: "100%",
              textAlign: "left",
            }}
          >
            Login POS
          </Header1>
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
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
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

          {error && error != "" ? (
            <div
              key={error}
              className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          ) : null}

          <div className="flex items-center gap-4 my-10 pb-10">
            <ButtonSmall
              color="primary"
              buttonProps={{

                disabled: loading,
                type: "submit",
              }}
              customStylingPrimary={{
                background: "black",
                border: "1px solid gray",
                borderRadius: '0.8rem',
                padding: '0.5rem 1rem',
              }}
            >
              <span className="text-white">

              Login
              </span>
            </ButtonSmall>

            <a

              className="inline-block align-baseline font-bold text-white  hover:text-gray-300"
              href="/register"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
