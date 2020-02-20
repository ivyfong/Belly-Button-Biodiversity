
// Add test subject id #s to dropdown
d3.json("./static/data/samples.json").then(function(data){
	
	// Save data in variables
	var names = data.names;
	
	// Select dropdown
	var dropdown = d3.select("#selDataset");
	
	// Add test subject id #s to dropdown
	names.forEach(id=>dropdown.append("option").text(id));

});

// Create function init
function init(){
	
	// Get data from json file
	d3.json("./static/data/samples.json").then(function(data){
		
		// Save data in variables
			// Define init id
		var init_id = data.names[0];
		
			// Define init metadata values
		var init_metadata_values = Object.values(data.metadata[0]);
		
			// Define init metadata labels
		var init_metadata_labels = Object.keys(data.metadata[0]).map(label=>label[0].toUpperCase()+label.slice(1));
		
			// Define init otu ids
		var init_otu_ids = data.samples[0].otu_ids;
		
			// Define init otu labels
		var init_otu_labels = data.samples[0].otu_labels;
		
			// Define init sample values
		var init_sample_values = data.samples[0].sample_values;
		
		// Print data
		console.log(init_metadata_values);
		console.log(init_metadata_labels);
		console.log(init_otu_ids);
		console.log(init_otu_labels);
		console.log(init_sample_values);
		
		// Add demographic info
		var demographics = d3.select("#sample-metadata").append("p");
			demographics.html(`<strong>${init_metadata_labels[0]}:</strong> ${init_metadata_values[0]}</br>
				<strong>${init_metadata_labels[1]}:</strong> ${init_metadata_values[1]}</br>
				<strong>${init_metadata_labels[2]}:</strong> ${init_metadata_values[2]}</br>
				<strong>${init_metadata_labels[3]}:</strong> ${init_metadata_values[3]}</br>
				<strong>${init_metadata_labels[4]}:</strong> ${init_metadata_values[4]}</br>
				<strong>${init_metadata_labels[5]}:</strong> ${init_metadata_values[5]}</br>
				<strong>${init_metadata_labels[6]}:</strong> ${init_metadata_values[6]}`);
			
		// Create horizontal bar chart
			// Define data
		var bar_data = [{
		  type: "bar",
		  orientation: 'h',
		  x: init_sample_values.slice(0,10).reverse(),
		  y: init_otu_ids.slice(0,10).reverse().map(init_otu_id=>`OTU ${init_otu_id}`),
		  text: init_otu_labels.slice(0,10).reverse()
		}];
		
			// Define layout
		var bar_layout = {
		  title: "Top 10 OTUs",
		  xaxis: {title: "Value"},
		  yaxis: {title: "OTU ID"}
		};
		
			// Plot graph
		Plotly.newPlot("bar",bar_data,bar_layout);
		
		
		// Create bubble chart
			// Define data
		var bubble_data = [{
			x: init_otu_ids,
			y: init_sample_values,
			mode: 'markers',
			marker: {size: init_sample_values, color: init_otu_ids},
			text: init_otu_labels
		}];
	
			// Define layout
		var bubble_layout = {
		  title: "All OTUs",
		  xaxis: {title: "OTU ID"},
		  yaxis: {title: "Value"}
		};
		
			// Plot graph
		Plotly.newPlot("bubble",bubble_data,bubble_layout);
		
	
		// Create gauge chart
			// Define data
		var gauage_data = [{
			domain: {x: [0, 1], y: [0, 1]},
			value: init_metadata_values[6],
			gauge: {axis: {range: [0, 9]},
				bar: { color: "#428bca" }},
			title: {text: "Scrubs Per Week"},
			type: "indicator",
			mode: "gauge+number",
		}];
		
			// Define layout
		var gauge_layout = {
		  title: "Belly Button Washing Frequency"
		};
		
			// Plot graph
		Plotly.newPlot("gauge",gauage_data,gauge_layout);
		
	});
		
};

// Call function init
init();

// Create optionChanged function - Referenced in HTML file
function optionChanged(){
	
	// Define data
	d3.json("./static/data/samples.json").then(function(data){
	
		// Save dropdown value in variable
		var current_id = d3.select("#selDataset").property("value");
		
		// Filter data based on current_id
			// Filter current metadata
		var current_metadata = data.metadata.filter(metadata => 
			metadata.id == current_id);
				
			// Define current metadata values
		var current_metadata_values = Object.values(current_metadata[0]);
			
			// Define current metadata labels
		var current_metadata_labels = Object.keys(current_metadata[0]).map(label=>label[0].toUpperCase()+label.slice(1));
			
			// Filter current samples data
		var current_samples = data.samples.filter(samples => 
			samples.id == current_id);
			
			// Define current otu ids
		var current_otu_ids = current_samples[0].otu_ids;
		
			// Define current otu labels
		var current_otu_labels = current_samples[0].otu_labels;
		
			// Define current sample values
		var current_sample_values = current_samples[0].sample_values;		
		
		// Update demographic info
		var demographics = d3.select("#sample-metadata").select("p");
			demographics.html(`<strong>${current_metadata_labels[0]}:</strong> ${current_metadata_values[0]}</br>
				<strong>${current_metadata_labels[1]}:</strong> ${current_metadata_values[1]}</br>
				<strong>${current_metadata_labels[2]}:</strong> ${current_metadata_values[2]}</br>
				<strong>${current_metadata_labels[3]}:</strong> ${current_metadata_values[3]}</br>
				<strong>${current_metadata_labels[4]}:</strong> ${current_metadata_values[4]}</br>
				<strong>${current_metadata_labels[5]}:</strong> ${current_metadata_values[5]}</br>
				<strong>${current_metadata_labels[6]}:</strong> ${current_metadata_values[6]}`);
			
		// Update horizontal bar chart
			// Define data
		var bar_x = current_sample_values.slice(0,10).reverse();
		var bar_y = current_otu_ids.slice(0,10).reverse().map(current_otu_id=>`OTU ${current_otu_id}`);
		var bar_text = current_otu_labels.slice(0,10).reverse();
		
			// Retyle graph
		Plotly.restyle("bar","x",[bar_x]);
		Plotly.restyle("bar","y",[bar_y]);
		Plotly.restyle("bar","text",[bar_text]);
		
		// Update bubble chart
			// Define data
		var bubble_x = current_otu_ids;
		var bubble_y = current_sample_values;
		var bubble_size = current_sample_values;
		var bubble_color = current_otu_ids;
		var bubble_text = current_otu_labels;
		
			// Retyle graph
		Plotly.restyle("bubble","x",[bubble_x]);
		Plotly.restyle("bubble","y",[bubble_y]);
		Plotly.restyle("bubble","marker.size",[bubble_size]);
		Plotly.restyle("bubble","marker.color",[bubble_color]);
		Plotly.restyle("bubble","text",[bubble_text]);
		
		// Update gauge chart
			// Define data
		var current_gauge_value = current_metadata_values[6];
		
			// Retyle graph
		Plotly.restyle("gauge","value",[current_gauge_value]);
		
		// Print data
		console.log(current_id);
		console.log(current_metadata_values);
		console.log(current_metadata_labels);
		console.log(current_otu_ids);
		console.log(current_otu_labels);
		console.log(current_sample_values);	
	
	});
	
};
