Template.player.onRendered(function() {
  $("#rightSide").sideNav({
    edge:'right',
    closeOnClick:false
  });
  $('ul.tabs').tabs();



  var audio = new Audio();
  var status = 0; // Song is Not Playing

  $(".playSong").on("click",function(){
    if(!audio.src){
      getSong();
    }
    if(status == 0) // If song Stopped
    {
      audio.play();
      $(".playSong").text('pause_circle_outline');
    }
    else{ // If Song Playing
      audio.pause();
      $(".playSong").text('play_circle_outline');
    }
    status = status == 0 ? 1 : 0 ;


  });
  $(".volumeSong").on("click",function(){
    audio.volume = audio.volume == 0 ? 1 : 0;
    if(audio.volume){
      $(".volumeSong").text("volume_up");
    }else{
      $(".volumeSong").text("volume_off");
    }

  });

  $('.nextSong').on('click',function(){
    audio.currentTime = audio.duration;
  });

  audio.addEventListener("loadedmetadata",function(){
    $(".duration").attr("max",audio.duration);
    $(".full").text(formatToSec(audio.duration));
    $("#songName").text(audio.name);
    $("#songArtist").text(audio.artist);
    $(".songImage").attr('src',audio.image)

  });

  audio.addEventListener("timeupdate",function(){
    var current = formatToSec(audio.currentTime);
    $(".current").text(current);
    var w = audio.currentTime / audio.duration * 100;
    $(".fancythumb").css({
        width : w + '%',
    });
  });

  audio.addEventListener("ended",function(){
    var list = Session.get("queue");
    if(list.length > 0 )
    {
      getSong();
      audio.currentTime = 0;
      audio.play();
    }else{
      audio.pause();
      $(".playSong").text('play_circle_outline');
      status = 0 ;
      audio.currentTime = 0;
    }

  });

  function getSong(){
    var list = Session.get('queue');
    if(list.length > 0)
    {
      var music = list.shift();
      Session.set('queue',list);
      audio.src = music.preview;
      audio.name = music.name;
      audio.artist = music.artist;
      audio.image = music.image;
    }
    else{
      Materialize.toast("You Should Add Music To Queue",2500);
      return 0 ;
    }
  }

  $("div#bigScreenPlayer input[type=range] , div#rightSlide input[type=range]").on("click",function(){
    var time = $(this).val();
    audio.currentTime = time;
  });

  function formatToSec(secs) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (min < 10){
      min = "0" + min;
    }
    if (sec < 10){
      sec  = "0" + sec;
    }
    return min + ':' + sec;
  }

  Tracker.autorun(function(){
    var music = Session.get('playSong');
    if(music){
      audio.src = music.preview;
      audio.name = music.name;
      audio.artist = music.artist;
      audio.image = music.image;
      audio.status = 0 ;
      if(Session.get('playSongStatus') == 1 )
      {
        audio.play();
        $(".playSong").text('pause_circle_outline');
      }
    }

  });

});

Template.player.helpers({
});
