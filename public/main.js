document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const url = document.getElementById('url').value;
  const output = document.getElementById('output');
  output.innerHTML = '⏳ Scraping in progress...';

  try {
    const res = await fetch('/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.emails && data.emails.length > 0) {
      output.innerHTML = `<h3>✅ ${data.emails.length} emails found:</h3><ul>${data.emails
        .map(e => `<li>${e}</li>`)
        .join('')}</ul>`;
    } else {
      output.innerHTML = '⚠️ No matching emails found.';
    }
  } catch (err) {
    output.innerHTML = '❌ Error scraping. Check the server logs.';
  }
});
