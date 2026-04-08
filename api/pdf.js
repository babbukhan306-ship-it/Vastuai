import PDFDocument from "pdfkit";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { text } = req.body;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  doc.fontSize(18).text("Vastu Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(text);

  doc.end();
}
