Template.playlist.onRendered(function (){
});
Template.playlist.onDestroyed(function () {
  Session.set('song','');
});
Template.playlist.helpers({
  playlistInfo:function(){
    var param_user = Router.current().params['user'];
    var param_list = Router.current().params['playlistId'];
    var playlist = Meteor.call('playlistInfo',param_user,param_list,function(err,response){
      console.log(response);
      Session.set('playlistImage',response.images[0].url);
      Session.set('playlistName',response.name);
      Session.set('playlistDescription',response.description);
      Session.set('playlistFollowers',response.followers.total);
      Session.set('song',response.tracks.items);



    });
  }
});
