Template.search.onRendered(function() {

  $(".searchText").on("click",function(){
    Router.go('/result');
  });

});
