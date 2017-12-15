(function () {

  document.addEventListener('DOMContentLoaded', init, false);

  function init() {
    registerServiceWorker();
    addListeners();
    pirateManager.getComments().then(function(commentList) {
      renderComments(commentList);
    })
  }

  function registerServiceWorker() {

    if('serviceWorker' in navigator) {
      window.addEventListener('load', function(){
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration){
              console.log("SW Registered! " + registration );
            }).catch(function(error){
              console.log("an error happened!" + error);
        });
      });
    } else {
      console.log("No ServiceWorker Support in this browser");
    }

  }

  function postComment(comment) {
    const data = setupCommentData(comment);
    if(navigator.serviceWorker) {

      navigator.serviceWorker.ready.then(function(sw){
        return sw.sync.register(comment)
            .then(function(args){
              appendComment(document.getElementById('comments'), data);
            }).catch(function(error){
              console.log(error);
            })
      })

    } else {
      pirateManager.postComment(data).then(function(){
          appendComment(document.getElementById('comments'), data);
      });
    }
  }

  function addListeners() {
    document.getElementById('arrghBtn').addEventListener('click', function(){
      postComment('Arrrgh!');
    });

      document.getElementById('ahoyBtn').addEventListener('click', function(){
          postComment('ahoy!');
      });
  }

  function resetElements(){
    var comments = document.getElementById('comments');
    comments.innerHTML = "";
  }

  function renderComments(commentList) {
    resetElements();
    var comments = document.getElementById('comments');
    Object.keys(commentList).forEach(function(key){
      var comment = commentList[key];
      appendComment(comments, comment);
    });
  }

  function appendComment(commentsEl, comment){
    var commentElement = document.createElement('p');
    commentElement.innerHTML = comment.commentText + " - " + comment.date;
    commentsEl.appendChild(commentElement);
    var hrElement = document.createElement('hr');
    commentsEl.appendChild(hrElement);
  }

})();