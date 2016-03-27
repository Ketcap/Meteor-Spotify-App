Router.configure({
  loadingTemplate: "loading",
  layoutTemplate:"layout",
});
Router.route('/', function () {
  this.render('home',{to:'main_content'});
});
Router.route('/result', function () {
  this.render('result',{to:'main_content'});
});
Router.route('/:user/playlist/:playlistId',function () {
  this.render('playlist',{to:'main_content'});
},{
  name:'myPlaylist'
});
