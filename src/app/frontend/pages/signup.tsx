// src/app/frontend/pages/signup.tsx
import AuthForm from "../components/AuthForm";

export default function SignUpPage() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Signup</h1>
      <AuthForm />
    </div>
  );
}
