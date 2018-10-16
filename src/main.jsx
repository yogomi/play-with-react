'use strict'

import React from "react";
import ReactDOM from "react-dom";

import * as d3 from 'd3';

class D3Graph extends React.Component {
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
    let height = 500;
    let margin = 50;
    let x = d3.scaleLinear()
      .domain([0, 10])
      .range([margin, width - margin]);
    let y = d3.scaleLinear()
      .domain([0, 10])
      .range([height - margin, margin]);

    // d3.range(10).map(function(i){
    //   return {x: i, y: Math.sin(i) + 5};
    // });

    let line = d3.line()
      .x((d) => {return x(d.x);})
      .y((d) => {return y(d.y);});

    var svg = d3.select(this.node);
    svg.attr("height", height)
      .attr("width", width);

    svg.selectAll("path")
      .data(this.props.data)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d);
      });

    svg.append('circle')
      .attr('cx', 120)
      .attr('cy', 200)
      .attr('r', 10);

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
    return (
      <div>
        <D3Graph data={data} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
