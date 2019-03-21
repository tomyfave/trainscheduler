// Initialize Firebase
var config = {
    apiKey: "AIzaSyAUgBLYuCZEd6xMxvsuLKAgW6GT1qBWrG0",
    authDomain: "train-schedular-b99c8.firebaseapp.com",
    databaseURL: "https://train-schedular-b99c8.firebaseio.com",
    projectId: "train-schedular-b99c8",
    storageBucket: "train-schedular-b99c8.appspot.com",
    messagingSenderId: "79819364773"
  };
  firebase.initializeApp(config);


  // Reference names collection
  var messagesRef = firebase.database().ref('messages');
  let tablePos = 0;
function setup() {
    retrieveMessage();
}

var nowTime = moment().format('dddd, MMMM Do YYYY, hh:mm:ss a');

console.log(nowTime);

//listen for form submit

document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();



    // Get values
    var name = getInputVal('name');
    var destination = getInputVal('destination');
    var first = getInputVal('first');
    var frequency = getInputVal('frequency');

    // Save message
    
    var newMessage = {
    name: name,
    destination: destination,
    first: first,
    frequency: frequency
    }
    saveMessage(newMessage);


    //console.log(name);
    //console.log(destination);
    //console.log(first);
    //console.log(frequency);
}

// Function to get form value
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save message to firebase
function saveMessage(newMessage){
    messagesRef.push(newMessage)

}
//Retrieve message from firebase
function retrieveMessage(){
    messagesRef.on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val())
    //Give the snapshot from the db a variable 
    dbMessage= childSnapshot.val()
    console.log(dbMessage);
    //Pushing info to a new funciton ex.append message
    appendsMessage(dbMessage)
});
}
//start of the new function
function appendsMessage(dbMessage){
    //create a variable for table row 
    let tableRow = $("<tr>")

    // give the table row an attribute
    //tableRow.attr('id', tablePos);

    

    //give the table position an id 
    //tableRowIdString = "#" + tablePos;

    //working with our trains first arrival "2:30" hh:mm
    //work on train frequency
    //Train departure 13:00 frequency is every 45mins. Time now is 17:00
    //How many 45 min intervals have passed since 13:00 until 17:00
    //17:00 subtracted by 13:00 is 240mins. 240mins modulus 45 is 15 and 15 is the minutes since our last train departed.
    //Frequency first frequency45-(diff240mod frequency45)=30 for this example

    var time= "13:00";// This is my first train arrival time
    var time2= "17:00";//This is going to be time now. 
    var frequency= 45;
    //Me turning these strings into workable objects 
    var timeObject= moment(time, 'hh:mm');
    var timeObject2= moment(time2, 'hh:mm');
    var difference= timeObject2.diff(timeObject,"minutes");//how many minutes has passed since the first train arrival until now

    console.log(timeObject, timeObject2, difference);



    // append and pull dbMessages into slots
    tableRow.append("<td>" + dbMessage.name + "</td>")
    tableRow.append("<td>" + dbMessage.destination + "</td>")
    tableRow.append("<td>" + dbMessage.frequency + "</td>")
    tableRow.append("<td>" + dbMessage.first + "</td>")
    tableRow.append("<td> 5 </td>")
    //add another table postion
    $("#table").append(tableRow); 
    tablePos++
}





