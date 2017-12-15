(function(){

    document.addEventListener('DOMContentLoaded', init, false);

    var offlineTimeout;

    function init () {
        registerServiceWorker();
        addListeners();
        getComments().then(function(commentList){
            renderComments(commentList)
        });
    }

    function registerServiceWorker() {
        if('serviceWorker' in navigator) {
            window.addEventListener('load', function(){
                navigator.serviceWorker.register('service-worker.js').then(function(reg){
                    console.log("SW " + reg);
                }).catch(function(err) {
                    console.log("ERROR" + err);
                })
            })
        } else {
            console.log("No SW support in this browser");
        }
    }

    function getComments() {
        return pirateManager.getComments()
            .then(function(commentList){
              return  commentList;
            })
    }

    function postComment() {
        document.getElementById('commentsBtn').innerHTML = "Posting..."
        localforage.setItem('comment', document.getElementById('comment-text').value)
            .then(function(){
                return submitPost();
            })
    }

    function submitPost() {
        if( navigator.serviceWorker ) {

            navigator.serviceWorker.ready.then(function(sw) {
                return sw.sync.register('post-comment')
                    .then(function(args) {
                        offlineTimeout = setTimeout(function(){
                            localforage.getItem('comment').then(function(val) {
                                document.getElementById('no-connection-message').style.display = "block";
                                document.getElementById('commentBtn').innerHTML = "Leave a comment";
                                document.getElementById('comment-text').value = "";
                            })
                        }, 3000)
                    })
            }).catch(function(err){
                console.log(err);
            });

        } else {
            pirateManager.postComment().then(function (data) {
                document.getElementById('comment-text').value = "";
                document.getElementById('commentBtn').innerHTML = "Leave a comment";
                document.getElementById('no-connection-message').style.display = "none";
                appendComment(document.getElementById('comments'), data);
            });
        }
    }

    function addListeners() {
        document.getElementById('commentBtn').addEventListener('click', function (ev) { postComment(); })

        navigator.serviceWorker.addEventListener('message', function(event) {
            clearTimeout(offlineTimeout);
            clearTimeout(offlineTimeout);
            document.getElementById('comment-text').value = "";
            document.getElementById('commentBtn').innerHTML = "Leave a comment";
            document.getElementById('no-connection-message').style.display = "none";
            appendComment(document.getElementById('comments'), event.data);
        })

    }

    function resetElements() {
        var comments = document.getElementById('comments');
        comments.innerHTML = "";
    }

    function renderComments(commentList) {
        resetElements();
        let comments = document.getElementById('comments');
        Object.keys(commentList).forEach((key) => {
            let comment = commentList[key];
        appendComment(comments, comment);
    });
    }

    function appendComment(commentsEl, comment) {
        var commentElement = document.createElement('p');
        commentElement.innerHTML = comment.commentText + " - " + comment.date;
        commentsEl.appendChild(commentElement);
        var hrElement = document.createElement('hr');
        commentsEl.appendChild(hrElement);
    }

})();