$(document).ready(function() {
    let totalMoney = 0;

        // Sample data
    let earningsData = ["Bought Jeans -30", "Watered the plants +5", "Walked the dog +5", "Did the dishes  +3"];
    let choresData =[
        {'chore': 'Sweep the garage', 'points': 3},
        {'chore': 'Make your bed every day', 'points': 3},
        {'chore': 'Walk the dog', 'points': 4},
        {'chore': 'Do the dishes', 'points': 2},
        {'chore': 'Take out the trash', 'points': 1},
    ]

    function populateData(){
         // Populate earnings
        for(let item of earningsData) {
            $('#earningsList').append(`<li>${item}</li>`);
        }

        // Populate chores
        for(let chore of choresData) {        
            
            addLine =  $('<li>').html(chore['chore'] + "<span style='color:green'> +" + chore['points'] + "</span>").click(function() {
                totalMoney += chore['points'];
                $(this).remove();
                updateDisplay()
            }); 

            $('#choresList').append(addLine);
        }
        // updateDisplay()
    };
   

    // Add event listeners for the buttons
    $('#addMoneyButton').click(function() {
        addDollar()
        updateDisplay()
    });

    $('#subtractMoneyButton').click(function() {
        substractDollar()
        updateDisplay()
    });



    // $("#earningsList").on('click', function() {
    //     const moneyToAdd = 5; // You can change this or make it dynamic
    //     totalMoney += moneyToAdd;
    //     updateDisplay();
    // });

    // $("#choresList").on('click', function() {
    //     const moneyToSubtract = 5; // You can change this or make it dynamic
    //     totalMoney -= moneyToSubtract;
    //     updateDisplay();
    // });

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
