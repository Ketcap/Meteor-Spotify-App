ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      "clientId": "fe902a4695f945639d3d0f162586d971",
      "secret": "e22d5cc7a4f741859fbfa52deb6c5dd4"
    }
  },
  { upsert: true }
);
Meteor.methods({
  refreshAccess : function(access){
    var clientId = "fe902a4695f945639d3d0f162586d971";
    var url = "https://accounts.spotify.com/api/token"
    var token = HTTP.post(url,{
      params:{
        access_token: access,
        token_type:'Bearer',
        expires_in:'36000',
        refresh_token:access,
      },
    },function(error,response){
      console.log(error);
      console.log(response)
    });

  },
  me:function(access){
    var url = 'https://api.spotify.com/v1/me';
    var me = HTTP.get(url,{
      headers:{
        'Authorization':' Bearer '+access,
      },
    },function(error,response){
      if(error){
        console.log(error);
      }
      else {
        console.log(response);
      }
    });
  }
});
