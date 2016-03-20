Template.player.onRendered(function() {
  $("#rightSide").sideNav({
    edge:'right',
    closeOnClick:false
  });

  var audio = new Audio();
  var status = 0; // Song is Not Playing
  audio.volume = 1;
  audio.src = "https://p.scdn.co/mp3-preview/b326e03624cb098d8387e17aa46669edac0d025a";

  $(".playSong").on("click",function(){
    if(audio.src){
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
    }

  });
  $(".volumeSong").on("click",function(){
    audio.volume = audio.volume == 0 ? 1 : 0;
    if(audio.volume){
      $(".volumeSong").text("volume_up");
    }else{
      $(".volumeSong").text("volume_off");
    }

  });

  audio.addEventListener("loadedmetadata",function(){
    $(".duration").attr("max",audio.duration);
    $(".full").text(formatToSec(audio.duration));

  });

  audio.addEventListener("timeupdate",function(){
    var current = formatToSec(audio.currentTime);
    $(".current").text(current);
    var w = audio.currentTime / audio.duration * 100;
    $(".fancythumb").css({
        width : w + '%',
    });
    if(audio.currentTime == audio.duration)
    {
      audio.pause();
      audio.currentTime = 0;
      $(".playSong").text('play_circle_outline');
      status = 0 ;
    }

  });

  $("div#bigScreenPlayer input[type=range] , div#rightSlide input[type=range]").on("change",function(){
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

});
