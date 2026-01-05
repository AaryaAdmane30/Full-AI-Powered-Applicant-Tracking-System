import React from "react";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "Resumind | Auth" },
    { name: "description", content: "Log in to access your Resumind account" },
  ];
};

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const { signIn, signOut, isAuthenticated} = auth;

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
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : isAuthenticated ? (
              <button className="auth-button" onClick={signOut}>
                <p>Log Out</p>
              </button>
            ) : (
              <button className="auth-button" onClick={signIn}>
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
