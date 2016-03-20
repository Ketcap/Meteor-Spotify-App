ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      "clientId": "fe902a4695f945639d3d0f162586d971",
      "secret": "e22d5cc7a4f741859fbfa52deb6c5dd4"
    }
  },
  { upsert: true }
);
Meteor.methods({
  
});
