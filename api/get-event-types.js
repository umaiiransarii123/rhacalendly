const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const response = await fetch("https://api.calendly.com/event_types", {
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
    },
  });

  const data = await response.json();
  res.status(200).json(data || {});
};
