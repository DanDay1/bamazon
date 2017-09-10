var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    welcomeMenu();
});

// function welcomeMenu() {
//     inquirer.prompt([{
//     		type: "rawlist",
// 			message: "Please hit letter key to select option: a: View Products for Sale, b: View Low Inventory, c: Add to Inventory, d: Add New Product, e: Exit",			
// 			choices: ["a", "b", "c", "d", "e"],
// 			name: "action"
// 		},

// 		inquirer.prompt([{
//     		type: "rawlist",
// 			message: "Please hit number key to select option:",			
// 			choices: ["1) View Products for Sale", "2) View Low Inventory", "3) Add to Inventory", "4) Add New Product", "5) Exit"],
// 			name: "action"
// 		},

// 	])
// 	.then(function (user) {
// 		switch(user.action) {
// 			case "1":
// 				viewProducts();
// 				console.log("A was selected");
// 				break;
// 			case "2":
// 				viewLowInventory();
// 				break;
// 			case "3":
// 				addInventory();
// 				break;
// 			case "4":
// 				addNewProduct();
// 				break;
// 			case "5":
// 				exit();
// 				break;
// 				if user action /= abcd or e, 
// 				consold.log("Invalid entry, try again");
// 		}
// 	});
// }

function welcomeMenu() {
    console.log("");
    inquirer.prompt([{
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "action"
        }, ])
        .then(function(user) {
            switch (user.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "Exit":
                    exit();
                    break;
            }
        });
}


function viewProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;

        //     for (var i = 0; i < res.length; i++) {

        //     console.log("ID" + res[i].item_id + "Product" + res[i].product_name);

        // }

        var table = new Table({
            head: ["Product ID", "Product Name", "Department Name", "Price", "Quantity"],
      colWidths: [13, 20, 20, 13, 13],
    });

   for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }

        console.log(table.toString());

        welcomeMenu();
    });
}

// function viewLowInventory() {
// 	connection.query('SELECT * FROM products', function(err, res) {
// 	    if (err) throw err;

// 		var table = new Table({
// 			head: ["Product ID".cyan, "Product Name".cyan, "Department Name".cyan, "Price".cyan, "Quantity".cyan],
// 			colWidths: [13, 20, 20, 13, 13],
// 		});

// 		for(var i = 0; i < res.length; i++) {
// 			if(res[i].StockQuantity < 5) {		//Will only push products with less than 5 quantity
// 				table.push(
// 			    	[res[i].itemID, res[i].ProductName, res[i].DepartmentName, parseFloat(res[i].Price).toFixed(2), res[i].StockQuantity]
// 				);
// 			}
// 		}

// 		if(table.length > 0) {
// 	    	console.log("\nHere are low quantity products (less than 5):");		
// 			console.log(table.toString());			
// 		} else {
// 			console.log("\nThere are no low quantity products right now!\n");
// 		}

// 		selection();
// 	});
// }

// function addInventory() {
// 	connection.query('SELECT * FROM products', function(err, res) {
// 	    if (err) throw err;

// 		var table = new Table({
// 			head: ["Product ID".cyan, "Product Name".cyan, "Department Name".cyan, "Price".cyan, "Quantity".cyan],
// 			colWidths: [13, 20, 20, 13, 13],
// 		});

// 		for(var i = 0; i < res.length; i++) {
// 			table.push(
// 			    [res[i].itemID, res[i].ProductName, res[i].DepartmentName, parseFloat(res[i].Price).toFixed(2), res[i].StockQuantity]
// 			);
// 		}

// 		console.log(table.toString());
// 		inquirer.prompt([
// 		{
// 			type: "number",
// 			message: "Which product would you like to add to? (the Product ID)",
// 			name: "itemNumber"
// 		},
// 		{
// 			type: "number",
// 			message: "How many more would you like to add?",
// 			name: "howMany"
// 		},
// 		]).then(function (user) {
// 			var newQuantity = parseInt(res[user.itemNumber - 1].StockQuantity) + parseInt(user.howMany);
// 			connection.query("UPDATE products SET ? WHERE ?", [{
//     			StockQuantity: newQuantity
//     		}, {
//     			itemID: user.itemNumber
//     		}], function(error, results) {
//     			if(error) throw error;

// 	    		console.log("\nYour quantity has been updated!\n");
// 	    		selection();
// 		    });

// 		});
// 	});
// }

// function addNewProduct() {
// 	inquirer.prompt([
// 	{
// 		type: "input",
// 		message: "What is the product name?",
// 		name: "itemName"
// 	},
// 	{
// 		type: "input",
// 		message: "What department is it in?",
// 		name: "itemDepartment"
// 	},
// 	{
// 		type: "number",
// 		message: "What is it's price?",
// 		name: "itemPrice"
// 	},
// 	{
// 		type: "number",
// 		message: "How many do we have of this product?",
// 		name: "itemQuantity"
// 	},
// 	]).then(function (user) {
// 		connection.query("INSERT INTO products SET ?", {
// 			ProductName: user.itemName,
// 			DepartmentName: user.itemDepartment,
// 			Price: user.itemPrice,
// 			StockQuantity: user.itemQuantity
// 		}, function(err, res) {
// 			if(err) throw err;

// 			console.log("\nYour product has been added!\n");
// 			selection();
// 		});
// 	});
// }

// function exit() {
// 	connection.end();
// 	console.log("Good Bye!");
// }

// selection();