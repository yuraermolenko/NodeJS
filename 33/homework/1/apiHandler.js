var path = require('path');

var todos = [
    { id: 1, name: 'Work', description: 'Stuff to do' }, { id: 2, name: 'Walk the dog', description: 'Need to get up early' },
    { id: 3, name: 'Finish project', description: 'An important task' }, { id: 4, name: 'Earn a lot of money', description: 'As soon as possible' },
    { id: 5, name: 'Go to sleep', description: 'late at night' }
];
module.exports = {

    loadItems: (req, res) => {
        res.json(todos)
    },
    createItem: (req, res) => {
        var data = req.body;
        var newItemId = todos.length + 1;
        todos.push({
            id: newItemId,
            name: data.name,
            description: data.description
        });
        res.send('item created');
            console.log('Item Added!')
    },
    updateItem: (req, res) => {
        var id = req.params.id;
        var data = req.body;
        todos[id-1].name = data.name;
        todos[id-1].description = data.description;
        res.send('item updated');
        console.log('item updated');
    },
    removeItem: (req, res) => {
        var delId = req.params.id;
        todos.splice(delId-1, 1);
        res.send('item deleted');
        console.log('item deleted');
    }
}