Template.side.onRendered(function () {

  $("#leftSide").sideNav({
    edge:'left',
    closeOnClick:false
  });
  $(".login-spotify").on('click',function(){
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email'] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || "Success Login");
    });

  });
  $(".logout").on('click',function(){
    Meteor.logout();
  });
});
Template.side.helpers({
  profilePicture:function(){
    return Meteor.user().profile.images[0].url;
  },
  username:function(){
    return Meteor.user().profile.display_name;
  }
});
