var pirateManager = (function(){

  return {
    getComments: getComments,
      postComment : postComment
  };

  function getComments(){
    return fetch("https://pirates-b74f7.firebaseio.com/commentList.json")
        .then(function(response){
          response.json();
        }).then(function(data){
          this.commentList = data;
          return this.commentList;
        })
  }

  function postComment() {

    return localforage.getItem('comment').then(function(val){
      var d = new Date();
      var data = {
        commentText : val,
          date :  (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
      };

      return fetch("https://pirates-b74f7.firebaseio.com/commentList.json",
          {
            method: "POST",
              body: JSON.stringify(data)
          }).then(function(){
            localforage.removeItem('comment');
            return data;
      })

    });

  }

})();