
var indiviuals = d3.json('samples.json').then(function(data) { 
    return data.names
})

var indiviual_descrs = d3.json('samples.json').then(function(data) {
    return data.metadata
})

indiviuals.then(function(data) {
    
    for (var i=0; i<data.length; i++) {
        var elmt = document.createElement('option')
        elmt.appendChild(document.createTextNode(data[i]))
        document.getElementById('selDataset').appendChild(elmt)
    }
})



function optionChanged(val) {

    // clear demographic info information
    var redo = document.getElementById('sample-metadata')
    redo.innerText = ''

    // select the dropdown menu id and get the current value
    var dropdownMenu = d3.select('#selDataset')
    var dataset = dropdownMenu.property('value')

    // promise.then() to get the data
    indiviual_descrs.then(function(data) {

        // find the element in the data array that is selected
        description = data.find(element => element.id == dataset)
        keys = Object.keys(description)
        values = Object.values(description)

        // for loop to add in the element keys and values for the individual in the demographic info table
        for (var i=0; i<keys.length; i++) {
            var elmt = document.createElement('p')
            elmt.appendChild(document.createTextNode(keys[i] + ': ' + values[i]))
            document.getElementById('sample-metadata').appendChild(elmt)
        }
    })
}