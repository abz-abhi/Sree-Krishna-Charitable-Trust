// app/signin/page.tsx
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 rounded-2xl shadow-[7px_9px_42px_21px_#B5EEE79A]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src="/favicon.ico"
            alt="Sree Krishna Charitable Trust"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#1f4d40]">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
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
                  name="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-green-400/80"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-green-400/70 hover:text-black"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1f4d40] px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-[#16382f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <a
              href="signup"
              className="font-semibold text-green-600 hover:text-[#1f4d40]"
            >
              SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
