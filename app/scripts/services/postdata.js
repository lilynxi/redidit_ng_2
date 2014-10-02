'use strict';

/**
 * @ngdoc service
 * @name rediditApp.postdata
 * @description
 * # postdata
 * Factory in the rediditApp.
 */
angular.module('rediditApp')
  .factory('Postdata', function ($firebase, FIREBASE_URL) {

    // var postdata = [
    //   { id: 1, title:'first title', upvotes:0, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }] },
    //   { id: 2, title:'second title', upvotes:20, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }]  },
    //   { id: 3, title:'third title', upvotes:0, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }]  }
    // ];


    var ref = new Firebase(FIREBASE_URL + undefined);
    var postdata = $firebase(ref).$asArray();    // all posts as an array



    // Public API here
    return {
      all: postdata,
      find: function (postId) {     // backup
        return $firebase(ref.child(postId)).$asObject();
      },
      getPost: function(postId){
        return $firebase(ref.child(postId)).$asObject();
      },
      createPost: function(post){
        return postdata.$add(post);
      },
      deletePost: function(post){
        return postdata.$remove(post);
      },
      updateUpvotes: function(postId,upvote){ 
        var tempPost = $firebase(ref.child(postId));
        return tempPost.$update({ upvotes : upvote });
      },
      createComment: function(comment, postId){
        var tempComment = $firebase(ref.child(postId).child("comments")).$asArray();
        return tempComment.$add(comment);
        // TODO
      },
      deleteComment: function(comment, postId){
        var tempComment = $firebase(ref.child(postId).child("comments")).$asArray();
        return tempComment.$remove(comment);
        // TODO
      },
      updateCommentUpvotes: function(postId,commentindex, commentupvotes){ 
        var tempComment = $firebase(ref.child(postId).child("comments").child(commentindex));
        return tempComment.$update({ commentupvotes: commentupvotes });
        // TODO
      },
      updateViews: function(postId,views){
        var tempPost = $firebase(ref.child(postId));
        return tempPost.$update({ views : views });

      }

    }; // end public





    // STATIC /////////////////
    // return {
    //   all: postdata,
    //   getPost: function(postId){
    //     return postdata[postId-1];
    //   },
    //   createPost: function(post){
    //     return postdata.push( post );
    //   },
    //   deletePost: function(index){
    //     return postdata.splice(index,1);
    //   },
    //   createComment: function(comment, postId){
    //     return postdata[postId-1].comments.push(comment);
    //   },
    //   deleteComment: function(postId, commentindex){
    //     return postdata[postId-1].comments.splice(commentindex,1);
    //   },
    //   updateUpvotes: function(upvotes,index){ 
    //     postdata[index].upvotes = upvotes;
    //     return postdata[index].upvotes;
    //   },
    //   updateCommentUpvotes: function(postId,commentindex, commentupvotes){ 
    //     postdata[postId-1].comments[commentindex].commentupvotes = commentupvotes;
    //     return postdata[postId-1].comments[commentindex].commentupvotes;
    //   }
    // }; // end public
    // STATIC /////////////////




  });






