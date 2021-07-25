// create array with nine empty values
var eventsArr = [" "," "," "," "," "," "," "," "," "];

// get current date using moment() 
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// function to set color code of each time block
var colorCodeTimeBlock = function() {   
    for (var i = 9; i < 18; i++){
        var timeBlock = "#" + i;

        // check if time block is past, future, or present time
        if (moment().hour() < i){
            $(timeBlock).removeClass("past present");
            $(timeBlock).addClass("future");
        }
        else if (moment().hour() > i){
            $(timeBlock).removeClass("future present");
            $(timeBlock).addClass("past");
        }
        else if (moment().hour() === i){
            $(timeBlock).removeClass("future present");
            $(timeBlock).addClass("present");
        }
    }
};

// function to update color code of each time block
var refreshTimeBlock = function() {
    colorCodeTimeBlock();
    
    // milliseconds left before the change of hour
    var millisecondsLeft = 3600000 - ((moment().minute() * 60000) + (moment().second() * 1000) + moment().milliseconds());

    // execute function when the hour has change
    setTimeout(
        function(){
            colorCodeTimeBlock();
            
            // execute function every hour
            setInterval(colorCodeTimeBlock, 3600000);
        }, 
    millisecondsLeft);
};

// function to save events to localStorage when the save button is clicked
var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
};

// function to load events from localStorage
var loadEvents = function() {
    tempEventsArr = JSON.parse(localStorage.getItem("events")); 

    if (tempEventsArr){
        eventsArr = tempEventsArr;

        for (var i = 0; i < 9; i++){
            var tempTextAreaID = "#" + (i + 9);
            $(tempTextAreaID).text(eventsArr[i]);
        }
    }
};

// save the event of the time block in the localStorage
$(".saveBtn").on("click", function() {
    for (var i = 0; i < 9; i++){
        var tempTextAreaID = "#" + (i + 9);
        var tempBtnID = "btn" + (i + 9);
        if ($(this).attr("id") === tempBtnID){
            eventsArr[i] = $(tempTextAreaID).val();
        }
    }
    saveEvents();
    loadEvents();
});

loadEvents();
refreshTimeBlock();