const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const userResponse = await fetch("https://api.calendly.com/users/me", {
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
    },
  });

  const userData = await userResponse.json();
  const userUri = userData.resource.uri;

  const eventTypesResponse = await fetch(`https://api.calendly.com/event_types?user=${userUri}`, {
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
    },
  });

  const eventTypesData = await eventTypesResponse.json();

  res.status(200).json(eventTypesData.collection);
};
