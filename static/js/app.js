
var testSubID = d3.select("#selDataset")
d3.json("../data/samples.json").then(function(data) {

    var subjectNames = data.names
    subjectNames.forEach(id => {
        testSubID.append("option").text (id).property("value")
    })
optionChanged(subjectNames[0])
});
	
    // Chart with a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    function optionChanged(userInput) {
        
      d3.json("../data/samples.json").then(function(data) {
        var demoData = data.metadata;
        // console.log(demoData);
        var demoFilter = demoData.filter(mid => mid.id == userInput)
        var firstElement = demoFilter[0]
        var demoInfo = d3.select("#sample-metadata")
        demoInfo.html("")
        Object.entries(firstElement).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key} - ${value}`)

        })
        var samplesFilter = data.samples.filter(sid => sid.id == userInput)
        var firstSample = samplesFilter[0]


        var otuIds = firstSample.otu_ids.slice(0,10).reverse().map(ids=>(`Id:${ids}`));
        var sampleValues = firstSample.sample_values.slice(0,10).reverse();
        var  otuLabels = firstSample.otu_labels.slice(0,10).reverse();
        var trace1 = {
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        }
        var data = [trace1];
    
        var layout = {
          title: "<b>Top 10 OTU Data</b>"
         
        };
    
        Plotly.newPlot("bar", data, layout);

//Bubble Chart
//create trace2 for bubble chart
var trace2 = {
  x: firstSample.otu_ids,
  y: firstSample.sample_values,
  text: firstSample.otu_labels, 
  mode: "markers", 
  marker: {
      color:  firstSample.otu_ids,
      size: firstSample.sample_values
  }
}; 
// layout"
var layout_bubble = {
title: {text: "<b>Belly Button Bubble Chart Sample Values</b>"},

//title for x axis
xaxis:{title:" OTU IDs"},
yaxis:{title:"Sample Values"}


};
//capture the data and create the plot
var bubble_data = [trace2];
Plotly.newPlot("bubble",bubble_data, layout_bubble);


//BONUS: Gauge attempt.... could not get it to work ontime unfortunately
var myGauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: demoData.wfreq,
      title: { text: "<b>Belly Button Washing Frequency</b> <br>Scubs per Week"},
    //   height: 500,
    //   width: 500,
      type: "indicator",
      mode: "gauge+number", 
    //   delta: { reference: 380 },
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: 'rgb(248, 243, 236)' },
		  { range: [1, 2], color: 'rgb(244, 241, 229)' },
		  { range: [2, 3], color: 'rgb(233, 230, 202)' },
		  { range: [3, 4], color: 'rgb(229, 231, 179)' },
		  { range: [4, 5], color: 'rgb(213, 228, 157)' },
		  { range: [5, 6], color: 'rgb(183, 204, 146)' },
		  { range: [6, 7], color: 'rgb(140, 191, 136)' },
		  { range: [7, 8], color: 'rgb(138, 187, 143)' },
		  { range: [8, 9], color: 'rgb(133, 180, 138)' },
        ],
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      hoverinfo: "label"

      }
    }
  ];
  
  var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', myGauge, layout);


});
};