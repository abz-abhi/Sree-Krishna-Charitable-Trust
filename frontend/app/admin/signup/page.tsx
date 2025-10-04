"use client";
import { useState } from "react";

export default function AdminSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Sign Up:", { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 rounded-2xl shadow-[7px_9px_42px_21px_#B5EEE79A]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Logo */}
          <img
            src="/favicon.ico"
            alt="Sree Krishna Charitable Trust"
            className="mx-auto h-10 w-auto"
          />
          {/* Heading */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#1f4d40]">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-green-400/80"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-green-400/80"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-green-400/80"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm/6 font-medium text-green-400/80"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1f4d40] px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-[#16382f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already have an account?{" "}
            <a
              href="/admin/signin/" 
              className="font-semibold text-green-600 hover:text-[#1f4d40]"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
