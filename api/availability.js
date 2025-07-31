const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }
  req.body = JSON.parse(body || '{}');

  const { email } = req.body;

  const response = await fetch("https://api.calendly.com/event_types", {
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
    },
  });

  const data = await response.json();
  res.status(200).json(data || {});
};
