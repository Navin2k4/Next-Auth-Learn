import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import HomePage from "./home/HomePage";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto">
        <HomePage />
      </main>
    </div>
  );
}
