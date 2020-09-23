// set all of these at the same time
var margin = {top: 40, right: 250, bottom: 30, left: 650},
width = 1200 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var i = 0;
var tree = d3.layout.tree()
.size([height, width])
.nodeSize([55, 25]);


var diagonal = d3.svg.diagonal()
  .projection(function(d) { return [d.x, d.y]; });

var svg = d3.select("body").append("svg")
.attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../assets/data/treeData.json", function(error, treeData) {
root = treeData[0];
update(root);
});

function update(source) {

var nodes = tree.nodes(root).reverse(),
  links = tree.links(nodes);

nodes.forEach(function(d) { d.y = d.depth * 80; });

var node = svg.selectAll("g.node")
  .data(nodes, function(d) { return d.id || (d.id = ++i); });

var nodeEnter = node.enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d) { 
    return "translate(" + d.x + "," + d.y + ")"; });

nodeEnter.append("circle")
  .attr("r", 2)
  .attr("fill", "#ccc");

nodeEnter.append("text")
  .attr("y", function(d) { 
    return d.children || d._children ? -10 : 10; })
  .attr("dy", ".35em")
  .attr("text-anchor", "middle")
  .text(function(d) { return (d.name); })
  .style("fill-opacity", 1);

var link = svg.selectAll("path.link")
  .data(links, function(d) { return d.target.id; });

link.enter().insert("path", "g")
  .attr("class", "link")
  .attr("d", diagonal);
}