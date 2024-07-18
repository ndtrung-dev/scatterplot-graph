import { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import "./App.css";

const DATAURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 500;
const SVG_PADDING = 40;
const LEGEND_COLOR = ["#9f9", "#f99"];
const LEGEND = [
  "Riders with doping allegations",
  "Riders without doping allegations",
];

const parseTime = (time) => {
  const [minute, seccond] = time.split(":");
  return new Date(2000, 0, 1, 0, minute, seccond);
};

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch(DATAURL)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useMemo(() => {
    if (data && !document.querySelector("#chart")) {
      console.log(data);
      const svg = d3
        .select("#chart-wrapper")
        .append("svg")
        .attr("id", "chart")
        .attr("width", SVG_WIDTH + 2 * SVG_PADDING + "px")
        .attr("height", SVG_HEIGHT + 2 * SVG_PADDING + "px")
        .style("position", "relative")
        .style("z-index", "0");
      //set scale horizontal
      const scaleX = d3
        .scaleLinear()
        .range([0, SVG_WIDTH])
        .domain([
          d3.min(data, (d) => d.Year - 1),
          d3.max(data, (d) => d.Year + 1),
        ]);
      //set scale vertical
      const scaleY = d3
        .scaleTime()
        .range([0, SVG_HEIGHT])
        .domain([
          d3.min(data, (d) => parseTime(d.Time)),
          d3.max(data, (d) => parseTime(d.Time)),
        ]);

      //set horizontal axis
      svg
        .append("g")
        .attr("id", "x-axis")
        .call(
          d3
            .axisBottom(scaleX)
            .tickFormat((d) => d3.format("d")(d))
            .ticks(16)
        )
        .attr(
          "transform",
          `translate(${SVG_PADDING},${SVG_PADDING + SVG_HEIGHT})`
        );
      svg
        .append("g")
        .attr("id", "y-axis")
        .style("z-index", 0)
        .call(d3.axisLeft(scaleY).tickFormat(d3.timeFormat("%M:%S")))
        .attr("transform", `translate(${SVG_PADDING},${SVG_PADDING})`);

      //data
      const cir = svg
        .selectAll()
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", (d) => d.Year)
        .attr("data-yvalue", (d) => new Date(parseTime(d.Time)))
        .attr("id", (d) => d.Place)
        .attr("r", 6)
        .attr("cx", (d) => SVG_PADDING + scaleX(d.Year))
        .attr("cy", (d) => SVG_PADDING + scaleY(parseTime(d.Time)))
        .style("fill", (d) =>
          d.Doping == "" ? LEGEND_COLOR[0] : LEGEND_COLOR[1]
        )
        .style("stroke", "black")
        .style("position", "relative")
        .style("z-index", 10);

      //legend
      const legend = svg.append("g").attr("id", "legend");
      //legend text
      legend
        .selectAll()
        .data(LEGEND)
        .enter()
        .append("text")
        .attr("id", (d, i) => "legend-" + i + "-text")
        .attr("x", (d) => SVG_WIDTH + SVG_PADDING - 20 - 6 * d.length)
        .attr("y", (d, i) => i * 20 + 8 + SVG_HEIGHT / 2 + SVG_PADDING)
        .attr("fill", "black")
        .style("font-size", "0.6rem")
        .html((d) => d);
      //legend box
      legend
        .selectAll()
        .data(LEGEND_COLOR)
        .enter()
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("id", (d, i) => "legend-" + i)
        .attr("x", SVG_WIDTH + SVG_PADDING)
        .style("stroke", "black")
        .attr("y", (d, i) => i * 20 + SVG_HEIGHT / 2 + SVG_PADDING)
        .style("fill", (d) => d)
        .on("mouseover", (e) => {
          legend
            .select(`#${e.target.id}-text`)
            .style("font-size", "0.8rem")
            .attr("x", (d) => SVG_WIDTH + SVG_PADDING - 20 - 8 * d.length);
        })
        .on("mouseleave", (e) => {
          legend
            .select(`#${e.target.id}-text`)
            .style("font-size", "0.6rem")
            .attr("x", (d) => SVG_WIDTH + SVG_PADDING - 20 - 6 * d.length);
        });

      const tooltip = d3
        .select("#chart-wrapper")
        .append("div")
        .attr("id", "tooltip")
        .style("display", "none")
        .style("padding", "0.2rem 0.6rem")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("color", "black");

      const tooltipContent = (info) => {
        return `
          <span>
            <strong style="font-size:1.1rem">${info.Name}</strong>
            <span style="font-size:0.6rem">[${info.Nationality}]</span>
          </span>
          <br/>
          <span style="font-size:0.8rem">
            Year: ${info.Year} - Time: ${info.Time}
          </span><br/>
          ${
            info.Doping
              ? '<a style="font-size:0.9rem; line-height: 1.2rem;" target="_blank" href="' +
                info.URL +
                '">' +
                info.Doping +
                "</a>"
              : ""
          }
        `;
      };

      cir
        .on("mouseover", function (e) {
          e.preventDefault();
          console.log(e);
          tooltip
            .html(tooltipContent(data[e.target.id - 1]))
            .attr("data-year", e.target.dataset.xvalue);
        })
        .on("mousemove", function (e) {
          e.preventDefault();
          tooltip
            .style("top", e.clientY + "px")
            .style("left", e.clientX + "px")
            .style("display", "block");
        })
        .on("mouseout", (e) => {
          e.preventDefault();
          tooltip.style("display", "none");
        });
    }
  }, [data]);

  return (
    <div className="screen">
      <div className="main">
        <h1 id="title">Doping in Professional Bicycle Racing</h1>
        <div id="chart-wrapper"></div>
      </div>
    </div>
  );
}

export default App;
