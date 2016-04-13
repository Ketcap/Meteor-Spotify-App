Template.playlist.onRendered(function (){
});
Template.playlist.onDestroyed(function () {
  Session.set('song','');
});
Template.playlist.helpers({
  playlistInfo:function(){
    Session.set('loading','loading');
    Session.set('song','');
    var param_user = Router.current().params['user'];
    var param_list = Router.current().params['playlistId'];
    var playlist = Meteor.call('playlistInfo',param_user,param_list,function(err,response){
      console.log(response);
      Session.set('playlistImage',response.images[0].url);
      Session.set('playlistName',response.name);
      Session.set('playlistDescription',response.description);
      Session.set('playlistFollowers',response.followers.total);
      Session.set('totalTrack',response.tracks.total);
      Session.set('song',response.tracks.items);

      var user = response.owner.id;
      var owner = Meteor.call('userInfo',user,function(err,response){
        $('.preview,.addQueue').each(function(){
          $(this).tooltip();
        });
        Session.set('owner',response.display_name);

        if(!response.display_name)
        {
          Session.set('owner',response.id);
        }
        
        Session.set('loading','');

      });

    });
  },
});
Template.playlist.events({
  'click .preview':function(event){
    var previewLink = event.currentTarget.id;
  },
});
