/* eslint-disable @typescript-eslint/no-explicit-any */
// Normalize DB snake_case to camelCase for components
export function normalize(e: any) {
  if (e.fileNo) return e; // already camelCase
  return {
    ...e,
    fileNo: e.file_no, nameEn: e.name_en, classColor: e.class_color,
    statusColor: e.status_color, filedDate: e.filed_date, lastUpdated: e.last_updated,
    firstRecord: e.first_record, estSize: e.est_size, searchAliases: e.search_aliases,
    image: typeof e.image === "string" && e.image.includes(",") ? e.image.split(",") : e.image,
    logs: typeof e.logs === "string" ? JSON.parse(e.logs) : e.logs,
    shopUrl: e.shopUrl || e.shop_url || "",
  };
}

export function normalizeAll(arr: any[]): any[] {
  return arr.map(normalize);
}
