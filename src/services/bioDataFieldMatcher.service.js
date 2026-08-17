// Field Definitions - kaunse "labels" milne pe kaunsa Profile field bharna hai
const FIELD_DEFINITIONS = [
  { field: 'height', aliases: ['height', 'ht'], type: 'number' },
  {
    field: 'maritalStatus',
    aliases: ['marital status', 'marital'],
    type: 'enum',
    enumValues: ['never_married', 'divorced', 'widowed', 'awaiting_divorce']
  },
  { field: 'motherTongue', aliases: ['mother tongue'], type: 'string' },
  { field: 'religion', aliases: ['religion'], type: 'string' },
  { field: 'caste', aliases: ['caste'], type: 'string' },
  { field: 'education', aliases: ['education', 'qualification'], type: 'string' },
  { field: 'occupation', aliases: ['occupation', 'profession', 'job'], type: 'string' },
  { field: 'annualIncome', aliases: ['annual income', 'income'], type: 'number' },
  { field: 'city', aliases: ['city', 'location'], type: 'string' },
  { field: 'state', aliases: ['state'], type: 'string' },
  { field: 'bio', aliases: ['about', 'bio', 'about me'], type: 'string' }
];

// Label ko "saaf" karna taaki comparison sahi ho (case, spaces ka farak na pade)
function normalizeLabel(str) {
  return str.toLowerCase().trim().replace(/[:\-]/g, '').trim();
}

// Value ko field ke "type" ke hisaab se saaf karna
function cleanValue(value, fieldDef) {
  if (fieldDef.type === 'number') {
    const match = value.match(/\d+(\.\d+)?/);
    return match ? Number(match[0]) : undefined;
  }

  if (fieldDef.type === 'enum') {
    const normalized = value.toLowerCase().trim().replace(/\s+/g, '_');
    return fieldDef.enumValues.includes(normalized) ? normalized : undefined;
  }

  return value.trim();
}

// EXCEL/CSV ROWS SE EXTRACT KARNA
function extractFromRows(rows) {
  const extracted = {};

  rows.forEach((row) => {
    if (!row || row.length < 2) return;

    const label = normalizeLabel(String(row[0] || ''));
    const value = String(row[1] || '').trim();
    if (!label || !value) return;

    const fieldDef = FIELD_DEFINITIONS.find((f) => f.aliases.includes(label));
    if (fieldDef) {
      const cleaned = cleanValue(value, fieldDef);
      if (cleaned !== undefined) {
        extracted[fieldDef.field] = cleaned;
      }
    }
  });

  return extracted;
}

// WORD/PDF PLAIN TEXT SE EXTRACT KARNA
function extractFromText(text) {
  const extracted = {};

  FIELD_DEFINITIONS.forEach((fieldDef) => {
    for (const alias of fieldDef.aliases) {
      const regex = new RegExp(`${alias}\\s*[:\\-]\\s*(.+)`, 'i');
      const match = text.match(regex);

      if (match) {
        const rawValue = match[1].split('\n')[0].trim();
        const cleaned = cleanValue(rawValue, fieldDef);
        if (cleaned !== undefined) {
          extracted[fieldDef.field] = cleaned;
        }
        break; // is field ke liye match mil gaya, agla alias check karne ki zaroorat nahi
      }
    }
  });

  return extracted;
}

// MASTER FUNCTION
function extractProfileFields(parsedData) {
  if (parsedData.type === 'rows') {
    return extractFromRows(parsedData.rows);
  }
  return extractFromText(parsedData.text);
}

module.exports = { extractProfileFields, FIELD_DEFINITIONS };