import { 
  select, 
  csv, 
  scaleLinear, 
  max, 
  scaleBand,
  axisLeft,
  axisBottom
} from 'd3';
  
const svg = select('svg');
      

const height = +svg.attr('height');
const width = +svg.attr('width');


const render = data => {
  
  const xValue = d => d.population;
  const yValue = d => d.country;
  const margin = { top: 20, right: 20, bottom: 20, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  //mapping the data domain to a range
  const xScale = scaleLinear() 
  	.domain([0, max(data, xValue)])
  	.range([0, innerWidth]);
  console.log(xScale.domain()) //"Data space" is domain
  console.log(xScale.range()) //"Screen space" is range
  
  
  
  const yScale = scaleBand()
  	.domain(data.map(yValue))
  	.range([0, innerHeight])
  
  
  //adding margins
  const g = svg.append('g')
  	.attr('transform', `translate(${margin.left},${margin.top})`);
  
  //Axes created and values added:
  g.append('g').call(axisLeft(yScale))
  g.append('g').call(axisBottom(xScale))
  	.attr('transform', `translate(0,${innerHeight})`);
  
  g.selectAll('rect').data(data)
  	.enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth());
            
  
};

csv('data.csv').then(data => {
  data.forEach(d => {
    d.population = +d.population * 1000 ; //+ parses string into integer
  });
  render(data)
});

