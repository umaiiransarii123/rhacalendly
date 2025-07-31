export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { start_time, end_time, timezone, event_type } = req.query;

  if (!start_time || !end_time || !timezone || !event_type) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const calendlyRes = await fetch(
      `https://api.calendly.com/availability?event_type=${encodeURIComponent(event_type)}&start_time=${encodeURIComponent(start_time)}&end_time=${encodeURIComponent(end_time)}&timezone=${encodeURIComponent(timezone)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!calendlyRes.ok) {
      const errorText = await calendlyRes.text();
      return res.status(calendlyRes.status).json({ error: errorText });
    }

    const data = await calendlyRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Calendly availability API error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
