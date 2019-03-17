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
    tableRow.attr('id', tablePos);

    $("#table").append(tableRow);

    //give the table position an id 
    tableRowIdString = "#" + tablePos;

    // append and pull dbMessages into slots
    $(tableRowIdString).append("<td>" + dbMessage.name + "</td>")
    $(tableRowIdString).append("<td>" + dbMessage.destination + "</td>")
    $(tableRowIdString).append("<td>" + dbMessage.first + "</td>")
    $(tableRowIdString).append("<td>" + dbMessage.frequency + "</td>")
    $(tableRowIdString).append("<td> 5 </td>")
    //add another table postion 
    tablePos++
}