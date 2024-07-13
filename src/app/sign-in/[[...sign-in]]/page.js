import { SignIn } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <div className="flex justify-center items-center">
      <SignIn />
    </div>
  );
}
