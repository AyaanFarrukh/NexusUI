/** Trigger a browser download for arbitrary content. */
export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Convert an array of flat objects into a CSV string. */
export function toCSV(rows: Record<string, unknown>[], columns?: string[]): string {
  const headers = columns ?? (rows.length > 0 ? Object.keys(rows[0]) : []);

  const escape = (value: unknown) => {
    const str = value == null ? "" : String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const lines = [headers.map(escape).join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => escape(row[header])).join(","));
  }
  return lines.join("\n");
}

export function exportCSV(filename: string, rows: Record<string, unknown>[]) {
  downloadFile(filename, toCSV(rows), "text/csv;charset=utf-8;");
}

export function exportJSON(filename: string, data: unknown) {
  downloadFile(filename, JSON.stringify(data, null, 2), "application/json;charset=utf-8;");
}

interface PrintPayload {
  title: string;
  subtitle: string;
  summary: { label: string; value: string }[];
  rows: Record<string, string | number>[];
}

/** Open a clean, print-optimized window for the given report. */
export function printReport(payload: PrintPayload) {
  const headers = payload.rows.length > 0 ? Object.keys(payload.rows[0]) : [];

  const summaryHtml = payload.summary
    .map(
      (s) =>
        `<div style="flex:1;min-width:140px;border:1px solid #ddd;border-radius:8px;padding:10px 14px;">
           <div style="font-size:12px;color:#666;">${s.label}</div>
           <div style="font-size:16px;font-weight:700;">${s.value}</div>
         </div>`
    )
    .join("");

  const rowsHtml = payload.rows
    .map((row) => `<tr>${headers.map((h) => `<td style="border:1px solid #ddd;padding:6px 10px;">${row[h]}</td>`).join("")}</tr>`)
    .join("");

  const html = `<!doctype html>
<html>
<head>
<title>${payload.title}</title>
</head>
<body style="font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; color:#111; padding:32px;">
  <h1 style="font-size:22px;margin:0 0 4px;">${payload.title}</h1>
  <p style="color:#666;font-size:12px;margin:0 0 20px;">${payload.subtitle}</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">${summaryHtml}</div>
  <table style="border-collapse:collapse;width:100%;font-size:12px;">
    <thead>
      <tr>${headers.map((h) => `<th style="border:1px solid #ddd;background:#f5f5f5;padding:6px 10px;text-align:left;">${h}</th>`).join("")}</tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <script>window.addEventListener('load', function () { window.focus(); window.print(); });<\/script>
</body>
</html>`;

  const win = window.open("", "_blank", "width=960,height=720");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}