
var friendList = require("../data/friends");


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendList);
  });

  app.post("/api/friends", function(req, res) {

      //Calculate total points for user submission
      var userPoints = 0;
      for(var i = 0; i < req.body.questionData.length; i++){
        userPoints += parseInt(req.body.questionData[i]);
      }


      //Calculate points of matches
      var matchPoints = 0;
      var comparisonArray = [];
      for(var i = 0; i<friendList.length; i++){
        //Grab points array from each potential match
        pointsArray = friendList[i].questionData;
        for(var j = 0; j < pointsArray.length; j++){
        //Calculate total points of each potential match
          matchPoints += parseInt(pointsArray[j]);
        }

        //Calculate absolute value of the diff between user and match points
        var compare = Math.abs(userPoints - matchPoints);
        console.log("Difference between " + req.body.name + " and potential match "+ friendList[i].name+ " is "+ compare + " points");
        //Push each difference value into an array
        comparisonArray.push(compare);
        //Reset match points to zero
        matchPoints = 0;
      }

      //Return the minimum of the comparison array
      Array.min = function(array){
          return Math.min.apply( Math, array );
      };
      var minimum = Array.min(comparisonArray);


      //Find the index number of the minimum value in the comparison array
      var indexNum = comparisonArray.indexOf(minimum);

      //Use indexNum to grab the matching object from the JSON data and fill the response data that will be posted to the survey page
      res.json(friendList[indexNum]);
      friendList.push(req.body);
  });
};
