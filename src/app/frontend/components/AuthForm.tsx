// src/app/frontend/components/AuthForm.tsx
"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification } from "firebase/auth";
import { auth } from "../../backend/firebase";
import { iswicketEmail } from "../../backend/authUtils";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check for valid wicket email
    if (!iswicketEmail(email)) {
      setError("Only @wicket.ac.in emails are allowed.");
      return;
    }

    try {
      // Check if email already exists
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError("This email is already registered. Please log in instead.");
        return;
      }

      // Create the user and send email verification
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      setSuccess("Registration successful! A verification email has been sent to your wicket email.");
      // Optional: redirect to login or homepage after registration

    } catch (err: any) {
      // Handle Firebase errors
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Try logging in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Something went wrong. Please try again.");
        console.error("Firebase Auth Error:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded-md shadow">
      <input
        type="email"
        placeholder="wicket Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Sign Up
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
}
