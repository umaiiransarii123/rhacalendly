const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { start_time, end_time, timezone, event_type } = req.query;

  const response = await fetch(
    `https://api.calendly.com/availability?event_type=${event_type}&start_time=${start_time}&end_time=${end_time}&timezone=${timezone}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  res.status(200).json(data);
};
