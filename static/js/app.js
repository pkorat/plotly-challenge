
var indiviuals_names = d3.json('samples.json').then(function(data) { 
    return data.names
})

var indiviual_metadata = d3.json('samples.json').then(function(data) {
    return data.metadata
})

var individual_samples = d3.json('samples.json').then(function(data) {
    return data.samples
})


indiviuals_names.then(function(data) {
    
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
    indiviual_metadata.then(function(data) {

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

    // promise.then() to get the data
    individual_samples.then(function(data) {

        // find the element in the data array that is selected
        indiviual = data.find(element => element.id == dataset)
        keys = Object.keys(indiviual)
        values = Object.values(indiviual)

        // create data variable with x and y axis with hovertext (bar chart)
        var data = {
            x: values[2].slice(0, 10),
            y: values[1].slice(0, 10).map(element => 'OTU ' + element),
            type: 'bar',
            text: values[3].slice(0, 10),
            orientation: 'h'
        }

        // create layout variable to reverse the bar chart at the y axis (bar chart)
        var layout = {
            yaxis: {
                autorange:'reversed'
            }
        }

        // create a new plot at each new selection (bar chart)
        Plotly.newPlot('bar', [data], layout)

        // create data variable for x and y axis with hovertext (bubble chart)
        var data = {
            x: values[1],
            y: values[2],
            mode: 'markers',
            text: values[3],
            marker: {
                size: values[2].map(element => element / 1.3),
                color: values[1]
            }
        }

        // create a new plot at each new selection (bubble chart)
        Plotly.newPlot('bubble', [data])
    })
}