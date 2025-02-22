import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <nav className="p-4 flex justify-between items-center border-b-2">
      <h1 className="text-lg font-bold">AI Lesson Planner</h1>
      <ThemeToggle />
    </nav>
  );
}
