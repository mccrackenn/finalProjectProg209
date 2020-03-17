
var express = require('express');
var router = express.Router();

let serverTripArray = []; // our "permanent storage" on the web server

// define a constructor to create movie objects
var ObjectTrip = function(pMountain, pTrail, pDifficulty, pDistance, pElevation){
  this.Mountain = pMountain;
  this.Trail = pTrail;
  this.Difficulty = pDifficulty;
  this.Distance = pDistance;
  this.Elevation = pElevation;
}
// for testing purposes, its nice to preload some data
serverTripArray.push(new ObjectTrip("Crystal","Gold-Run","Green-Circle",6,1000));
serverTripArray.push(new ObjectTrip("Rainer","Silver-Run","Green-Circle",11,1600));
serverTripArray.push(new ObjectTrip("Baker","Bronze-Run","Green-Circle",9,1900));



/* POST to addMovie */
router.post('/addTrip', function(req, res) {
  console.log(req.body);
  serverTripArray.push(req.body);
  console.log(serverTripArray);
  //res.sendStatus(200);
  res.status(200).send(JSON.stringify('success'));
});


/* GET movieList. */
router.get('/tripList', function(req, res) {
  res.json(serverTripArray);
  console.log("received!");
  
 });

 /* DELETE to deleteMovie. */
 router.delete('/deleteTrip/:Trip', function(req, res) {
  let Trip = req.params.Trip;
  Trip = Trip.toLowerCase();  // allow user to be careless about capitalization
  console.log('deleting ID: ' + Trip);
  
   for(let i=0; i < serverTripArray.length; i++) {
     if(Trip == serverTripArray[i].Mountain.toLowerCase()){
       console.log(serverTripArray[i].Mountain+"Here");
     serverTripArray.splice(i,1);
     }else{
      res.status(500).send(JSON.stringify('No such trip'));
     }
   

   }
   
   res.status(200).send(JSON.stringify('deleted successfully'));
});

module.exports = router;
//  router.???('/userlist', function(req, res) {
//  users.update({name: 'foo'}, {name: 'bar'})





