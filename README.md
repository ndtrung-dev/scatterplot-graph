# scatterplot-graph

This is a project to fulfiled _Data Visualization_ Course provided by freeCodeCamp.

Goals: Build an app that is functionally similar to this https://scatterplot-graph.freecodecamp.rocks using the following [database](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json).

In this project, the tech stack was used ReactJS, d3.js and CSS. Vite was used to built instead of the conventional ones, CRA.<br>
Check out the live demo [here](https://ndtrung-dev.github.io/scatterplot-graph).

## Requirements:

### User story:

> 1. I can see a title element that has a corresponding _id="title"_.
>
> 1. I can see an x-axis that has a corresponding _id="x-axis"_.
>
> 1. I can see a y-axis that has a corresponding _id="y-axis"_.
>
> 1. I can see dots, that each have a class of dot, which represent the data being plotted.
>
> 1. Each dot should have the properties data-xvalue and data-yvalue containing their corresponding x and y values.
>
> 1. The data-xvalue and data-yvalue of each dot should be within the range of the actual data and in the correct data format. For data-xvalue, integers (full years) or Date objects are acceptable for test evaluation. For data-yvalue (minutes), use Date objects.
>
> 1. The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.
>
> 1. The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.
>
> 1. I can see multiple tick labels on the y-axis with <code>%M:%S</code> time format.
>
> 1. I can see multiple tick labels on the x-axis that show the year.
>
> 1. I can see that the range of the x-axis labels are within the range of the actual x-axis data.
>
> 1. I can see that the range of the y-axis labels are within the range of the actual y-axis data.
>
> 1. I can see a legend containing descriptive text that has _id="legend"_.
>
> 1. I can mouse over an area and see a tooltip with a corresponding _id="tooltip"_ which displays more information about the area.
>
> 1. My tooltip should have a data-year property that corresponds to the data-xvalue of the active area.

### Testing tools

<em>FCC Testing CDN</em> (https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js) is provided by freeCodeCamp

## Result

All checkpoint passed!

Source code uploaded to [github](https://github.com/ndtrung-dev/scatterplot-graph).

[Live demo](https://ndtrung-dev.github.io/scatterplot-graph) is uploaded to github using <code>gh-pages</code>. <em>FCC Testing CDN</em> was embedded. Select <code>D3: Scatter Plot</code> option from dropdown menu to verify the result.
