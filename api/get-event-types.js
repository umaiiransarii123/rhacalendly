const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.CALENDLY_API_KEY;

  try {
    // Step 1: Fetch current user info
    const userResponse = await fetch("https://api.calendly.com/users/me", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!userResponse.ok) {
      const error = await userResponse.json();
      return res.status(userResponse.status).json({ error });
    }

    const userData = await userResponse.json();
    const userUri = userData.resource.uri;

    // Step 2: Fetch event types for this user
    const eventResponse = await fetch(
      `https://api.calendly.com/event_types?user=${encodeURIComponent(userUri)}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!eventResponse.ok) {
      const error = await eventResponse.json();
      return res.status(eventResponse.status).json({ error });
    }

    const eventData = await eventResponse.json();
    res.status(200).json(eventData);
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
