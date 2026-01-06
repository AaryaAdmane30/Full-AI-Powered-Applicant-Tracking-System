import React, { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";

export const meta = () => {
  return [
    { title: "Resumind | Auth" },
    { name: "description", content: "Log in to access your Resumind account" },
  ];
};

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const { signIn, signOut, isAuthenticated } = auth;

  const navigate = useNavigate();

  // This effect handles redirect AFTER auth state is confirmed
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/";
      navigate(next, { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]); // navigate is safe here (stable ref)

  // Simple handler — just trigger signIn, let the effect handle redirect
  const handleSignIn = async () => {


    //  Sign in directly from puter js bcoz Puter.js provides cloud-based file storage, AI, and key-value services. 
    // Signing in ensures that whatever you do—reading files, writing files, running AI tasks—is tied to your user account. Without signing in, it doesn’t know who you are, and you can’t securely access or modify your data.
    try {
      await signIn(); // This internally calls checkAuthStatus() → updates isAuthenticated
      // NO manual navigate here — the useEffect above will catch the state change
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Optional: handle sign out (you already have signOut in store)
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <main className='bg-[url("/images/bg-auth.svg")] bg-cover min-h-screen flex items-center justify-center'>
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log in To Continue Your Job Journey</h2>
          </div>

          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse" disabled>
                <p>Signing you in...</p>
              </button>
            ) : isAuthenticated ? (
              <button className="auth-button" onClick={handleSignOut}>
                <p>Log Out</p>
              </button>
            ) : (
              <button className="auth-button" onClick={handleSignIn}>
                <p>Log In</p>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;