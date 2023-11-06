$(document).ready(function () {
    // Sample data
    const fillRect = document.getElementById("fillUp");
    // let earningsData = [];

    let earningsData = [
        {"transaction": "Bought Jeans", "cost": -10},
        {"transaction": "Watered the plants", "cost": 15},
        {"transaction": "Walked the dog", "cost": 15},
        {"transaction": "Walked the dog", "cost": 15},
        {"transaction": "Bought earphones", "cost": -10},
    ];

    var savingsGoal = 100.0;

    var GoalAmount = 100;
    let totalMoney = 0;
    for (tran in earningsData) {
        totalMoney += earningsData[tran]["cost"];
    }

    let choresData = [
        { chore: "Sweep the garage", points: 3.0, continual: true },
        { chore: "Make your bed every day", points: 3.0, continual: false },
        { chore: "Walk the dog", points: 4.0, continual: false },
        { chore: "Do the dishes", points: 2.0, continual: true },
        { chore: "Take out the trash", points: 1.0, continual: false },
        { chore: "Clean your room", points: 5.0, continual: true },
        { chore: "Do your homework", points: 5.0, continual: true },
        { chore: "Wash the car", points: 10.0, continual: false },
    ];

    //_____________________EVENT LISTENERS___________________________

    // Add event listeners for the buttons
    $("#updateGoalModalOpen").click(function () {
        $("#goalSetModal").removeClass("invisible");
    });
    
    $("#addMoneyButton").click(function () {
        addDollar();
        updateDisplay();
    });

    $("#subtractMoneyButton").click(function () {
        substractDollar();
        updateDisplay();
    });

    $("#choreAdder").click(function () {
        $("#parentToolModal").removeClass("invisible");
    });

    $("#cancelChore, #cancelGoal").click(function () {
        hideModals();
    });

    $("#addChore").click(function () {
        addNewChore();
        populateData();
        hideModals();
    });

    //_____________________FUNCTIONS___________________________

    function hideModals() {
        $("#parentToolModal").addClass("invisible");
        $("#goalSetModal").addClass("invisible");
    }

    function addNewChore() {
        chore = $("#choreName").val();
        $("#choreName").val(""); //clear the input

        price = Number($("#newChorePrice").val());
        $("#newChorePrice").val(""); //clear the input

        continual = $("#newChoreReaccuring").is(":checked");

        choresData.push({ chore: chore, points: price, continual: continual });
        updateDisplay();
    }

    function populateData() {
        // Populate earnings
        $("#earningsList").empty();
        // Loop through earningsData in reverse order
        for (var i = earningsData.length - 1; i >= 0; i--) {
            var item = earningsData[i];
            var formattedCost = item["cost"].toFixed(2); // Format to two decimal places
            var addLine = $("<li>").html(item["transaction"]);

            if (item["cost"] < 0) {
                addLine.append(
                    "<span style='color:red'> $" + formattedCost + "</span>"
                );
            } else {
                addLine.append(
                    "<span style='color:green'> +$" + formattedCost + "</span>"
                );
            }
            $("#earningsList").append(addLine);
        }
        // Populate chores
        $("#choresList").empty();
        for (var i = 0; i < choresData.length; i++) {
            (function (index) {
                var chore = choresData[index];
                var formattedPoints = chore["points"].toFixed(2); // Format to two decimal places

                var addLine = $("<li>").html(
                    chore["chore"] +
                        "<span style='color:green'> +$" +
                        formattedPoints +
                        "</span>"
                );

                if (!chore["continual"]) {
                    addLine.click(function () {
                        totalMoney += chore["points"];
                        earningsData.push({
                            transaction: chore["chore"],
                            cost: chore["points"],
                        });
                        choresData.splice(index, 1); // remove chore using the current index
                        updateDisplay();
                        populateData();
                    });
                } else {
                    addLine
                        .prepend("<span style='color:blue'> (Weekly) </span>")
                        .click(function () {
                            totalMoney += chore["points"];
                            earningsData.push({
                                transaction: chore["chore"],
                                cost: chore["points"],
                            });
                            updateDisplay();
                            populateData();
                        });
                }

                $("#choresList").append(addLine);
            })(i);

            // $('#choresList').append(addLine);
        }
        // updateDisplay()
        updateFillUp();
    }

    function substractDollar() {
        totalMoney -= 1;
        updateFillUp();
    }

    function addDollar() {
        totalMoney += 1;
        updateFillUp();
    }

    // Update the display function to include the savings goal
    function updateDisplay() {
        var formattedTotal = totalMoney.toFixed(2);
        $("#totalMoney").text("$" + formattedTotal);

        // Display the savings goal
        $("#savingsGoal").text("$" + savingsGoal);

        const percentage = Math.min((totalMoney / savingsGoal) * 100, 100);
        $("#piggyContent").css({
            width: percentage + "%",
            height: percentage + "%",
        });
    }

    // Update the fill up function to use the savings goal
    function updateFillUp() {
        if (savingsGoal > totalMoney) {
            let goalPercentage = (totalMoney / savingsGoal) * 100;
            let fillHeight = 65 - goalPercentage * 0.65 + 12; // Corrected calculation
            fillRect.setAttribute("y", fillHeight);
        }
    }

    $("#subtractBalanceButton").click(function () {
        subtractBalance();
        updateDisplay();
    });

    // Create a function to subtract balance
    function subtractBalance() {
        let balance = parseFloat(
            prompt("Enter the amount to subtract from the bank:")
        );
        if (!isNaN(balance)) {
            totalMoney -= balance;
            // Display as a negative value in chores list
            earningsData.push({
                transaction: "Subtracted from bank",
                cost: -balance,
            });
            updateDisplay();
            populateData();
        } else {
            alert("Please enter a valid number.");
        }
    }

    function updateSavingsGoalDisplay() {
        $("#savingsGoalDisplay").text(
            "Savings Goal: $" + savingsGoal.toFixed(2)
        );
    }

    function updateSavingsGoal(newGoal) {
        savingsGoal = newGoal;
        updateSavingsGoalDisplay();
        updateFillUp(); // Update the fill up progress based on the new goal
    }

    $("#updateSavingsGoalButton").click(function () {
        var newGoal = parseFloat($("#newSavingsGoal").val());
        if (!isNaN(newGoal)) {
            updateSavingsGoal(newGoal);
        } else {
            alert("Please enter a valid number.");
        }
        hideModals();
    });

    updateSavingsGoalDisplay();
    updateDisplay();
    populateData();
    updateFillUp();
});
