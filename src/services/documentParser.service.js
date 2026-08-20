const XLSX = require('xlsx');
const Papa = require('papaparse');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');

// EXCEL PARSE KARNA
function parseExcel(buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  return { type: 'rows', rows };
}

// CSV PARSE KARNA
function parseCsv(buffer) {
  const text = buffer.toString('utf-8');
  const parsed = Papa.parse(text, { skipEmptyLines: true });

  return { type: 'rows', rows: parsed.data };
}

// WORD (.docx) PARSE KARNA
async function parseWord(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return { type: 'text', text: result.value };
}

// PDF PARSE KARNA
async function parsePdf(buffer) {
  const result = await pdfParse(buffer);
  return { type: 'text', text: result.text };
}

// MASTER FUNCTION - file type dekhkar sahi parser bulao
async function parseDocument(buffer, fileType) {
  switch (fileType) {
    case 'xlsx':
    case 'xls':
      return parseExcel(buffer);
    case 'csv':
      return parseCsv(buffer);
    case 'docx':
      return parseWord(buffer);
    case 'pdf':
      return parsePdf(buffer);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}

module.exports = { parseDocument };