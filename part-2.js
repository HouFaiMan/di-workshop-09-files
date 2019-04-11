var fs = require('fs');
var fileContent = fs.readFileSync('shopping-basket.json', 'utf-8');
var data = JSON.parse(fileContent);
var total = 0;

for (var item of data.basket) {
    if (item.name === 'Candles') {
        item.quantity = 10;
    }
    
    var result = item.price * item.quantity;
    total += result;
    console.log(`${item.name}: ${result}`);
}

data.total = total;

var jsonString = JSON.stringify(data, null, 2);

fs.writeFileSync('new-basket.json', jsonString, 'utf-8');