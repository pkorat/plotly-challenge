
var indiviuals = d3.json('samples.json').then(function(data) { 
    return data.names
})

indiviuals.then(function(data) {
    
    for (var i = 0; i < data.length; i++) {
        var elmt = document.createElement('option')
        elmt.appendChild(document.createTextNode(data[i]))
        document.getElementById('selDataset').appendChild(elmt)
    }
})



function optionChanged(val) {

}