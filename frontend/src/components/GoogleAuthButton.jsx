import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { googleSignIn } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";

const GoogleAuthButton = ({ isLogin = true }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send token to backend to verify and create/login user
      const response = await googleSignIn({ 
        idToken, 
        displayName: result.user.displayName || result.user.email.split("@")[0]
      });

      if (response.success && response.user) {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        toast.success(
          response.message || (isLogin ? "Signed in successfully" : "Account created successfully")
        );

        // Redirect based on onboarding status
        if (response.user.isOnboarded) {
          navigate("/");
        } else {
          navigate("/onboarding");
        }
      } else {
        toast.error(response.message || "Failed to sign in with Google");
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      
      // Handle specific Firebase errors
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Sign in cancelled");
      } else if (error.code === "auth/popup-blocked") {
        toast.error("Popup blocked - please allow popups for this site");
      } else if (error.code === "auth/unauthorized-domain") {
        toast.error("This domain is not authorized for Google sign-in");
      } else {
        toast.error(error.message || "Failed to sign in with Google");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="btn btn-outline w-full gap-2"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth_providers/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      {isLogin ? "Sign in with Google" : "Sign up with Google"}
    </button>
  );
};

export default GoogleAuthButton;
