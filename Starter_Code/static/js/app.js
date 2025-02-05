const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    console.log(data);
    let names = data.names
    let dropdown = d3.select("#selDataset")
    for (let i = 0; i < names.length; i++) {
      dropdown
        .append("option")
        .text(names[i])
        .property("value", names[i]);
    };
    demoInfoBox(names[0])
    buildCharts(names[0])
  });

function demoInfoBox(id) {
    d3.json(url).then(function(data) {
        console.log(data);
        let metaData = data.metadata
        let resultArray = metaData.filter(sampleObj => sampleObj.id == id);
        let result = resultArray[0];
        let demoInfo = d3.select("#sample-metadata")
        demoInfo.html("") 
        for (key in result) {
            demoInfo.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
          };
    })
};
 
function optionChanged(id) {
         demoInfoBox(id)
         buildCharts(id)};

function buildCharts(id) {
    d3.json(url).then(function(data)  {
      console.log(data);
        samplesData = data.samples;
        let resultArray = samplesData.filter(sampleObj => sampleObj.id == id);
        let result = resultArray[0];
        let otuIds = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;
        let barTrace = {
            x: sampleValues.slice(0,10).reverse(),
            y: otuIds.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
            };       
        let barLayout = {
            title: "Bar Chart",
            height: 430, 
            width: 500
        };
        let data1 = [barTrace];
        let layout = barLayout;
        Plotly.newPlot("bar", data1, layout); 
    let bubbleTrace = {
        x: otuIds,
        y: sampleValues,
        marker: {size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
              },
        text: otuLabels,
        mode: "markers"
    };
    let bubbleLayout = {
        title: "Bubble Chart",
        xaxis: {title: "OTU IDs"},
        yaxis: {title: "Sample Values"}
    };
    let data2 = [bubbleTrace];
    let layout2 = bubbleLayout;
    Plotly.newPlot("bubble", data2, layout2);
    });
};


