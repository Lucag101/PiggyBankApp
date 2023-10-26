$(document).ready(function() {
    let totalMoney = 0;

        // Sample data
    let earningsData = ["Bought Jeans -30", "Watered the plants +5", "Walked the dog +5", "Did the dishes  +3"];
    let choresData = ["Sweep the garage +3", "Make your bed every day +3", "Walk the dog +2"];

    // Populate earnings
    for(let item of earningsData) {
        $('#earningsList').append(`<li>${item}</li>`);
    }

    // Populate chores
    for(let chore of choresData) {
        $('#choresList').append(`<li>${chore}</li>`);
    }

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
});
