import fetch from "node-fetch";

export default async function handler(req, res) {
  const { start_time, end_time, event_type } = req.query;

  if (!start_time || !end_time || !event_type) {
    return res.status(400).json({
      error: "Missing required query parameters: start_time, end_time, event_type"
    });
  }

  try {
    const response = await fetch(
      `https://api.calendly.com/availability?event_type=${encodeURIComponent(event_type)}&start_time=${encodeURIComponent(start_time)}&end_time=${encodeURIComponent(end_time)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json(err);
    }

    const data = await response.json();

    // Return only slots collection for easier frontend handling
    return res.status(200).json({ collection: data.collection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
