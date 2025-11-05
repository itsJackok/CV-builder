import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function sanitizeFilename(name) {
  return String(name || 'CV')
    .replace(/[\\/:"*?<>|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function exportPdf(filename) {
  const el = document.getElementById('resume');
  const canvas = await html2canvas(el, { scale: 3, backgroundColor: '#ffffff', useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 24;
  const imgWidth = pageWidth - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const heightAvailable = pageHeight - margin * 2;
  if (imgHeight > heightAvailable) {
    const scale = heightAvailable / imgHeight;
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth * scale, imgHeight * scale, undefined, 'FAST');
  } else {
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight, undefined, 'FAST');
  }

  const safe = sanitizeFilename(filename);
  pdf.save(`${safe}.pdf`);
}
