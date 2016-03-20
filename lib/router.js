Router.configure({
  layoutTemplate:"layout"
});
Router.route('/', function () {
  this.render('home',{to:'main_content'});
});
Router.route('/result', function () {
  this.render('result',{to:'main_content'});
});
