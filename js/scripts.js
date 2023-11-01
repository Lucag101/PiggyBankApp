$(document).ready(function() {
    
    let totalMoney = 0;

        // Sample data
    let earningsData = ["Bought Jeans -30", "Watered the plants +5", "Walked the dog +5", "Did the dishes  +3"];
    let choresData =[
        {'chore': 'Sweep the garage', 'points': 3, 'continual': true},
        {'chore': 'Make your bed every day', 'points': 3 , 'continual': false},
        {'chore': 'Walk the dog', 'points': 4, 'continual': false},
        {'chore': 'Do the dishes', 'points': 2, 'continual': true},
        {'chore': 'Take out the trash', 'points': 1, 'continual': false},
        {'chore': 'Clean your room', 'points': 5, 'continual': true},
        {'chore': 'Do your homework', 'points': 5, 'continual': true},
        {'chore': 'Wash the car', 'points': 10, 'continual': false}
    ]

//_____________________EVENT LISTENERS___________________________

    // Add event listeners for the buttons
    $('#addMoneyButton').click(function() {
        addDollar()
        updateDisplay()
    });

    $('#subtractMoneyButton').click(function() {
        substractDollar()
        updateDisplay()
    });

    $('#choreAdder').click(function() {
        $("#parentToolModal").removeClass('invisible')
    });




//_____________________FUNCTIONS___________________________

    function populateData(){
         // Populate earnings
        for(let item of earningsData) {
            $('#earningsList').append(`<li>${item}</li>`);
        }

        // Populate chores
        for(let chore of choresData) {        
            addLine =  $('<li>').html(chore['chore'] + "<span style='color:green'> +" + chore['points'] + "</span>")
            if (chore['continual'] == false){
               addLine.click(function() {
                    totalMoney += chore['points'];
                    $(this).remove();
                    updateDisplay()
                }); 
            } else {
                //append onto the html a new span
                addLine.prepend("<span style='color:blue'> (Weekly) </span>")
                    .click(function() {
                        totalMoney += chore['points'];
                        updateDisplay()
                    });
            }

            $('#choresList').append(addLine);
        }
        // updateDisplay()
    };
   
    function substractDollar() {
        totalMoney -= 1;
    }

    function addDollar() {
        totalMoney += 1;
    }

    function updateDisplay() {
        $('#totalMoney').text(totalMoney);
        const percentage = Math.min((totalMoney / 100) * 100, 100);
        $('#piggyContent').css({
            width: percentage + '%',
            height: percentage + '%'
        });
    }

    
    updateDisplay()
    populateData()
});
