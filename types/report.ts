export type ReportCategory = "revenue" | "users" | "projects" | "ecommerce";

export interface ReportDefinition {
  id: string;
  name: string;
  description: string;
  category: ReportCategory;
  updatedAt: string;
}

export interface GeneratedReport {
  definition: ReportDefinition;
  range: { from: string; to: string };
  generatedAt: string;
  summary: { label: string; value: string }[];
  rows: Record<string, string | number>[];
}