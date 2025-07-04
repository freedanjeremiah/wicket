// src/app/signup/page.tsx
import AuthForm from "./frontend/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Signup</h1>
      <AuthForm />
    </div>
  );
}
