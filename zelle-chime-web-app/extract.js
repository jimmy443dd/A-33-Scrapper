function extractRelevantEmails(text) {
  const emailRegex =
    /\b[A-Za-z0-9._%+-]+@(?:gmail|yahoo|outlook|icloud|protonmail)\.com\b/g;

  const chunks = text
    .toLowerCase()
    .split(/\n{2,}|\.{2,}|-{2,}/g)
    .map(c => c.trim())
    .filter(c => c.length > 20);

  const results = new Set();

  for (const chunk of chunks) {
    if (chunk.includes('zelle') && chunk.includes('chime')) {
      const matches = chunk.match(emailRegex);
      if (matches) {
        matches.forEach(email => results.add(email));
      }
    }
  }

  return [...results];
}

module.exports = { extractRelevantEmails };
