import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About the Cryptid Research Foundation project.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-4">About Cryptid Research Foundation</h1>
      <p className="max-w-2xl">
        Cryptid Research Foundation is a comprehensive resource for learning about
        unidentified mysterious animals (UMAs) and mythical creatures from
        around the world.
      </p>
    </div>
  );
}
