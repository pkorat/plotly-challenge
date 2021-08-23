
var indiviuals = d3.json('samples.json').then(function(data) { 
    return data.names
})

var names = indiviuals.then(data => console.log(data))

console.log(names)