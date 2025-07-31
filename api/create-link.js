export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, eventType } = req.body;

    const response = await fetch("https://api.calendly.com/scheduling_links", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner: eventType,
        max_event_count: 1,
        invitee_email: email,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.status(200).json(data.resource || {});
  } catch (error) {
    console.error('Error in create-link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
