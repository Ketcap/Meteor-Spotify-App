Template.side.onRendered(function () {
  $("#leftSide").sideNav({
    edge:'left',
    closeOnClick:false
  });


});
Template.side.events({
  'click .login-spotify':function(){
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email','playlist-read-private', 'playlist-read-collaborative'] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      if(!err)
      {
        Meteor.call('userPlaylist', function(err, response) {
          Session.set('currentPlaylists',response);
          console.log(response);
          $('.collapsible').collapsible({
              accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
          });
        });
      }
    });
  },
  'click .logout':function(){
    Meteor.logout();
  },
});

Template.side.helpers({
  profilePicture:function(){
    return Meteor.user().profile.images[0].url;
  },
  username:function(){
    return Meteor.user().profile.display_name;
  },

});
