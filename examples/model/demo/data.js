Ext.require([
		'Ext.data.Model'
	]);
var fruitObj = {};
fruitObj.apple = Ext.create('Ews.model.grid.Fruit', {
		name: 'Apple',
		nick: 'apple',
		color: 'green',
		weight: '2.5',
		amount: '1'
	});
fruitObj.banana = Ext.create('Ews.model.grid.Fruit', {
		name: 'Banana',
		nick: 'banana',
		color: 'yellow',
		weight: '2.5',
		amount: '1'
	});

function checkFieldValid(oField) {
	if (oField.isValid()) {
		console && console.log(oField.getData().name + ' is OK.');
	} else {
		var errors = oField.validate();
		errors.each(function(error) {
				console && console.log(error.field, error.message);
			});
		console && console.log({
				oField: oField
			});
	}
}
checkFieldValid(fruitObj.apple);
checkFieldValid(fruitObj.banana);
