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
  userPlaylist:function(me){
    var me = Meteor.user().services.spotify.id;
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getUserPlaylists(me, {});

    if (response.error) {
      spotifyApi.refreshAndUpdateAccessToken();
      response = spotifyApi.getUserPlaylists(me, {});
    }
    return response.data.body.items;
  },
  playlistSongs:function(userid,playlistId){
    if(userid == "me")
    {
      userid = Meteor.user().services.spotify.id;
    }
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getPlaylistTracks(userid,playlistId,{});

    if(response.error){
      spotifyApi.refreshAndUpdateAccessToken();
      response = spotifyApi.getPlaylistTracks(userid,playlistId,{});
    }
    return response.data.body.items;
  },
  playlistInfo:function(userid,playlistId){
    if(userid == "me")
    {
      userid = Meteor.user().services.spotify.id;
    }
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getPlaylist(userid,playlistId,{});

    if(response.error){
      spotifyApi.refreshAndUpdateAccessToken();
      response = spotifyApi.getPlaylist(userid,playlistId,{});
    }
    return response.data.body;
  },
  userInfo:function(userId){
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getUser(userId);

    if(response.error){
      spotifyApi.refreshAndUpdateAccessToken();
      response = spotifyApi.getUser(userId);
    }
    return response.data.body;
  }

});
