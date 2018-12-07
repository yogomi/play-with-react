'use strict'

import React from "react";
import ReactDOM from "react-dom";

import * as d3 from 'd3';

class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph();
  }

  componentDidUpdate() {
    this.createGraph();
  }

  createGraph() {
    let width = 500;
    let height = 300;
    let margin = 20;

    let x = d3.scaleLinear()
      .domain([0, 10])
      .range([margin, width - margin]);
    let y = d3.scaleLinear()
      .domain([0, 10])
      .range([height - margin, margin]);

    let line = d3.line()
      .x((d) => {return x(d.x);})
      .y((d) => {return y(d.y);});

    let area = d3.area()
      .x((d) => {return x(d.x);})
      .y0(height - margin)
      .y1((d) => {return y(d.y);});


    var svg = d3.select(this.node);
    svg.attr("height", height)
      .attr("width", width);

    svg.append('path')
      .data(this.props.data)
      .attr("class", "area")
      .attr("d", function(d) {
        return area(d);
      });

    svg.append('path')
      .data(this.props.data)
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d);
      });

    function xStart(){ return margin;}
    function yStart(){ return height - margin;}
    function xEnd(){ return width - margin;}
    function yEnd(){ return margin;}
    function quadrantWidth(){ return width - 2 * margin;}
    function quadrantHeight(){ return height - 2 * margin;}

    function renderAxes(svg) {
      let xAxis = d3.axisBottom()
        .scale(x.range([0, quadrantWidth()]))
        .scale(x);
      let yAxis = d3.axisLeft()
        .scale(y.range([quadrantHeight(), 0]))
        .scale(y);

      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', function() {
          return 'translate(' + xStart()
            + ',' + yStart() + ')';
        })
        .call(xAxis);
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', function() {
          return 'translate(' + xStart()
            + ',' + yEnd() + ')';
        })
        .call(yAxis);
    }

    renderAxes(svg);
  }

  render() {
    return <svg ref={node => this.node = node} />;
  }
}

class App extends React.Component {
  render() {
    const data = [[
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3},
      {x: 4, y: 4},
      {x: 5, y: 1},
    ]];
    const network_data = [[
      {x: 0, y: 1.23},
      {x: 1, y: 2.2},
      {x: 2, y: 1.83},
      {x: 3, y: 1.23},
      {x: 4, y: 2.31},
      {x: 5, y: 2.12},
    ]];
    return (
      <div>
        <NetworkGraph data={network_data}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
