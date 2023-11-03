$(document).ready(function() {
      // Sample data
    let earningsData = [
        {"transaction": "Bought Jeans", "cost": -10},
        {"transaction": "Watered the plants", "cost": 15},
        {"transaction": "Walked the dog", "cost": 15},
        {"transaction": "Walked the dog", "cost": 15},
        {"transaction": "Bought earphones", "cost": -10},
    ];

    let totalMoney = 0;
    for(tran in earningsData){
        totalMoney += earningsData[tran]['cost']

    }
    
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

    $('#cancelChore').click(function() {
        hideModals()
    });

    $('#addChore').click(function() {
        addNewChore()
        populateData()
        hideModals()
    });



//_____________________FUNCTIONS___________________________

    function hideModals() {
        $("#parentToolModal").addClass('invisible')
        $("#goalSetModal").addClass('invisible')
    }

    function addNewChore() {
        chore = $('#choreName').val()
        $('#choreName').val('') //clear the input
        
        price = Number($('#newChorePrice').val())
        $('#newChorePrice').val('') //clear the input
        
        continual = $('#newChoreReaccuring').is(':checked')
        
        choresData.push({'chore': chore, 'points': price, 'continual': continual})
        updateDisplay()
    }

    function populateData(){
         // Populate earnings
        $('#earningsList').empty();
        for(count in earningsData) {
            console.log(count)
            console.log(earningsData[count])
            var item = earningsData[count]
            addLine =  $('<li>').html(item['transaction'])
            if (item['cost'] < 0) {
                addLine.append("<span style='color:red'> " + item['cost'] + "</span>")
            } else {
                addLine.append("<span style='color:green'> +" + item['cost'] + "</span>")
            }
            $('#earningsList').append(addLine);
        }

        // Populate chores
        $('#choresList').empty();
        for(var i = 0; i < choresData.length; i++) {  
            
            (function(index){
                var chore = choresData[index];
                var addLine = $('<li>').html(chore['chore'] + "<span style='color:green'> +" + chore['points'] + "</span>");
                
                if (!chore['continual']){
                    addLine.click(function() {
                        totalMoney += chore['points'];
                        earningsData.push({'transaction': chore['chore'], 'cost': chore['points']});
                        choresData.splice(index, 1); // remove chore using the current index
                        updateDisplay()
                        populateData();
                    }); 
                } else {
                    addLine.prepend("<span style='color:blue'> (Weekly) </span>")
                        .click(function() {
                            totalMoney += chore['points'];
                            earningsData.push({'transaction': chore['chore'], 'cost': chore['points']});
                            updateDisplay()
                            populateData();
                        });
                }

                $('#choresList').append(addLine);
            })(i);
        


            // $('#choresList').append(addLine);
        };
        // updateDisplay()
    };
   
    function substractDollar() {
        totalMoney -= 1;
    }

    function addDollar() {
        totalMoney += 1;
    }

    function updateDisplay() {
        console.log(totalMoney)
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
