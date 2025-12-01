import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen w-full flex flex-row bg-gradient-to-br from-blue-100 via-blue-200 to-primary/30">
      {/* IMAGE SECTION LEFT */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-primary/80 to-secondary/80">
        <div className="flex flex-col items-center justify-center w-full h-full p-12">
          <img src="/i.png" alt="Language connection illustration" className="w-4/5 max-w-lg rounded-2xl shadow-2xl border-4 border-white/30" />
          <div className="text-center space-y-4 mt-10">
            <h2 className="text-3xl font-bold text-white drop-shadow">Connect with language partners worldwide</h2>
            <p className="text-lg text-white/80">Practice conversations, make friends, and improve your language skills together</p>
          </div>
        </div>
      </div>
      {/* LOGIN FORM RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-base-100">
        <div className="w-full max-w-md p-8 sm:p-12 bg-white/90 rounded-2xl shadow-2xl border border-primary/10">
          {/* LOGO */}
          <div className="mb-8 flex items-center gap-3 justify-center">
            <ShipWheelIcon className="size-10 text-primary drop-shadow" />
            <span className="text-4xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              SpeakMate
            </span>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">Sign in to your account to continue your language journey</p>
          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="input input-bordered w-full"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-base font-semibold shadow-md hover:scale-[1.02] transition-transform duration-150"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <div className="text-center mt-2">
              <p className="text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
