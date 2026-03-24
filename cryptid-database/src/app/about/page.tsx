import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Cryptid Research Foundation — our mission, classification system, and the team behind the research.",
};

export default function AboutPage() {
  return <AboutContent />;
}
