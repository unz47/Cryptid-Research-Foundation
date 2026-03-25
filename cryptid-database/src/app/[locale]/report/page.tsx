import ReportForm from "@/components/report/ReportForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Investigation Request — CRF" };

export default function ReportPage() {
  return <ReportForm />;
}
