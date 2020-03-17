let tripArray = [];
let selectDiff='not selected';



let TripObject = function(pMountain, pTrail, pDifficulty, pDistance, pElevation){
  this.Mountain = pMountain;
  this.Trail = pTrail;
  this.Difficulty = pDifficulty;
  this.Distance = pDistance;
  this.Elevation = pElevation;
}

document.addEventListener("DOMContentLoaded", function () {

  //user object constructor


//trip object constructor
document.getElementById("addTripBtn").addEventListener("click", function(){
  let newTrip=(new TripObject(document.getElementById("where").value, 
  
  document.getElementById("trail").value, 
  document.getElementById("select-difficulty").value,
  document.getElementById("distance").value, 
  document.getElementById("elevation").value));
  addTrip(newTrip);
  
});

//clear input fields
document.getElementById("clearBtn").addEventListener("click", function () {
  clearUserInput();
});
// document.getElementById("buttonAdd").addEventListener("click", function () {
//   let newMovie = new MovieObject(document.getElementById("title").value, document.getElementById("year").value,
//      selectedGenre, document.getElementById("man").value, document.getElementById("woman").value);
//      addNewMoive(newMovie); // now post new movie object to node server
//   });

// custom user header addTripPage
$(document).on("pagebeforeshow", "#addTripPage", function(event) {
  // let currentUser = document.getElementById("name").value;
  // chosenPlayer.name = currentUser;
  // document.getElementById("userNameHeader").innerHTML = "Welcome " +chosenPlayer.name;
});
// $(document).on("pagebeforeshow", "#page2", function (event) {   // have to use jQuery 
//  // document.getElementById("IDparmHere").innerHTML = "";
//   createList();
// });

$(document).on("change", "#select-difficulty", function (event, ui) {
  selectedDiff = $('#select-difficulty').val();
});
// clears fields so input doesn't remain after leaving and then returning to page 3
 $(document).on("pagebeforeshow", "#addTripPage", function (Event) {
  clearUserInput();
 });

 function clearUserInput() {
  document.getElementById("where").value = "";
  document.getElementById("trail").value = "";
  document.getElementById("select-difficulty").value = "Green-Circle";
  document.getElementById("distance").value = "";
  document.getElementById("elevation").value = "";
 };

 document.getElementById("buttonDelete").addEventListener("click", function () {
  FillArrayFromServer();
  let deleteTrip = document.getElementById("deleteTrip").value;
  // doing the call to the server right here
  fetch('users/deleteTrip/'+deleteTrip , {
  // users/deleteMovie/Moonstruck   for example, this is what the URL looks like sent over the network
      method: 'DELETE'
  })  
  // now wait for 1st promise, saying server was happy with request or not
  .then(responsePromise1 => responsePromise1.text()) // ask for 2nd promise when server is node
  .then(responsePromise2 =>  console.log(responsePromise2), document.location.href = "index.html#refreshPage")  // wait for data from server to be valid
  // force jump off of same page to refresh the data after delete
  .catch(function (err) {
      console.log(err);
      alert(err);
     });

 
});
$(document).on("pagebeforeshow", "#listTripsPage", function(event) {
  FillArrayFromServer();
})
$(document).on("pagebeforeshow", "#refreshPage", function (event) {   
  document.location.href = "index.html#listTripsPage";
});

$(document).on("pagebeforeshow", "#detailsPage", function (event) {   // have to use jQuery 
  let localTitle =  document.getElementById("IDparmHere").innerHTML;
  console.log(localTitle);
  for(let i=0; i < tripArray.length; i++) {   
    if(localTitle==tripArray[i].Trail){
  document.getElementById("aWhere").innerHTML = "The region was: " + tripArray[i].Mountain;
  document.getElementById("aTrail").innerHTML = "The trail was: " + tripArray[i].Trail;
  document.getElementById("aDifficulty").innerHTML = "Difficulty level was: " + tripArray[i].Difficulty;
  document.getElementById("aDistance").innerHTML = "The distance was: " + tripArray[i].Distance+" miles";
  document.getElementById("aElevation").innerHTML = "The elevation was: " + tripArray[i].Elevation +" feet";
    }
  }
 });

document.getElementById('distanceButton').addEventListener("click", function(){
    tripArray.sort(function(a,b){
      let milesA=a.Distance;
      let milesB=b.Distance;
      if(milesA < milesB){
        return 1;
      }else{
        return -1;
      }
    })
    createList();
})
document.getElementById('totalMileageButton').addEventListener("click", function(){
  myDistanceTotal=0;
  myDistanceTotal=0;
  myDistanceTotal=tripArray.reduce(function(a,b) {
       return  Number(a)+Number(b.Distance);
},myDistanceTotal);
  myElevationTotal=tripArray.reduce(function(a,b){
      return Number(a)+Number(b.Elevation);
  },0);
 console.log(myDistanceTotal);
 console.log(myElevationTotal);
 totalMileage=document.querySelector('#totalMileage');
 totalMileage.style.value='block';
 totalMileage.innerHTML=`Distance Total: ${myDistanceTotal}---------Elevation Total:${myElevationTotal}`;
})

// $(document).on("pagebeforeshow", "#page4", function(event) {
//   if (tripArray = null) {
//     document.getElementById("userTripList").innerHTML = "No trips recorced";
//   }
// });


// To Do List
// 1. when fields are empty, have statements that say so.
// 2. create list on page 4

});

function createList()
{
  // clear prior data
  var userTripList = document.getElementById("userTripList");
  while (userTripList.firstChild) {    // remove any old data so don't get duplicates
      userTripList.removeChild(userTripList.firstChild);
  };

  var ul = document.createElement('ul');  
  tripArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = `<a data-transition='pop' class='oneTrip' data-parm=${element.Trail} href='#home'>Get Details</a> Trip:${element.Mountain}, Distance: ${element.Distance} miles`;
    ul.appendChild(li);
  });
  userTripList.appendChild(ul)

  // li.innerHTML = "<a data-transition='pop' class='oneMovie' data-parm=" + element.Title + "  href='#home'>Get Details </a> "  + element.Title + "  " + element.Genre;
    // ok, this is weird.  If I set the href in the <a  anchor to detailPage, it messes up the success of
    // the button event that I add in the loop below.  By setting it to home, it jumps to home for a second
    // but then the button event sends it correctly to the detail page and the value of data-parm is valid.

    // set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("oneTrip");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
              
            
            var parm = this.getAttribute("data-parm"); //passing in the hidden recording parm
            document.getElementById("IDparmHere").innerHTML = parm;
            console.log(parm);
            document.location.href = "index.html#detailsPage";
        });
    });
  } ;


// code to exchange data with node server

function FillArrayFromServer(){
    // using fetch call to communicate with node server to get all data
    fetch('/users/tripList')
    .then(function (theResonsePromise) {  // wait for reply.  Note this one uses a normal function, not an => function
        return theResonsePromise.json();
    })
    .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
    console.log(serverData);
    tripArray.length = 0;  // clear array
    tripArray = serverData;   // use our server json data which matches our objects in the array perfectly
    createList();  // placing this here will make it wait for data from server to be complete before re-doing the list
    })
    .catch(function (err) {
     console.log(err);
    });
};


// using fetch to push an object up to server
function addTrip(newTrip){
   
    // the required post body data is our movie object passed in, newMovie
    
    // create request object
    const request = new Request('/users/addTrip', {
        method: 'POST',
        body: JSON.stringify(newTrip),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    
    // pass that request object we just created into the fetch()
    fetch(request)
        // wait for frist server promise response of "200" success (can name these returned promise objects anything you like)
        // Note this one uses an => function, not a normal function, just to show you can do either 
        .then(theResonsePromise => theResonsePromise.json())    // the .json sets up 2nd promise
        // wait for the .json promise, which is when the data is back
        .then(theResonsePromiseJson =>console.log(theResonsePromiseJson), document.location.href = "#listTripsPage" )
        // that client console log will write out the message I added to the Repsonse on the server
        .catch(function (err) {
            console.log(err);
        });
    
}; // end of addNewUser
    
