import { SignUp } from "@clerk/nextjs";

export default function Register() {
  return (
    <div className="flex justify-center items-center">
      <SignUp />
    </div>
  );
}
