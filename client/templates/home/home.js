Template.home.events({
  'click .button':function(){
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email','user-read-birthdate'] // Spotify access scopes.
    };
    Spotify.requestCredential(function(accessToken) {
      console.log(accessToken);
      Session.set("spotifyAccess",accessToken);
      Meteor.call('me',accessToken);
    });
  },
});
