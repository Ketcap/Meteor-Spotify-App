Template.playlist.onRendered(function (){
});
Template.playlist.onDestroyed(function () {
  Session.set('playSong',0);
});
Template.playlist.helpers({
  playlistInfo:function(){
    Session.set('loading','loading');
    Session.set('song','');
    var param_user = Router.current().params['user'];
    var param_list = Router.current().params['playlistId'];
    var playlist = Meteor.call('playlistInfo',param_user,param_list,function(err,response){
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
  image:function(track){
    var image = track.album.images[0].url
    if(image)
    {
      return image;

    }else{
      return '404';
    }
  },
});
Template.playlist.events({
  'click .addQueue , click .preview':function(event){
    var parentTr = event.currentTarget.parentNode.parentNode;
    var previewLink = event.currentTarget.id;
    var name = $(parentTr).children(".song").text();
    var artist = $(parentTr).children(".artist").text();
    var id = $(parentTr).children(".songId").attr('data-song-id');
    var image = $(parentTr).children('.songId').attr('image');
    if(!previewLink)
    {
      Materialize.toast("<i class='material-icons left'>clear</i>Preview Is Not Avaliable",2500);
      return 0;
    }
    var list = Session.get('queue');
    if(!list)
    {
      var list = new Array();
    }
    var song = {
      id:id,
      name:name,
      artist:artist,
      preview:previewLink,
      image:image
    }
    if($(event.currentTarget).hasClass("preview"))
    {
      Session.setTemp('playSong',song);
      Session.setTemp('playSongStatus',1);
    }else{
      list.push(song);
      Session.setPersistent('queue',list);
    }

  },
});
