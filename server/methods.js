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
  spotify:function(){
  },
  userPlaylist:function(me){
    var me = Meteor.user().services.spotify.id;
    var spotifyApi = new SpotifyWebApi();
    console.log(spotifyApi)
    var response = spotifyApi.getUserPlaylists(me, {});

    if (response.error) {
      spotifyApi.refreshAndUpdateAccessToken();
      response = spotifyApi.getUserPlaylists(me, {});
    }

    return response.data.body.items;
  }
});
