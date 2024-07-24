const height = 500
const width = 700
function dataParse(){
    d3.csv("data/financial_risk_assessment.csv").then(function(data){
        console.log(data)
        return data;
    });
}
function axis(){
    var scaleX=d3.scaleLinear().domain([600,800]).range([0, width])
    var scaleY=d3.scaleLinear().domain([5000,50000]).range([height, 0])
    var svg = d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")")
    svg.append("g").selectAll("dot").data(dataParse()).enter()
       .append("circle").attr("cx", function(d){return scaleX(d["Credit Score"])})
       .attr("cy", function(d){return scaleY(d["Loan Amount"])})
       .attr("r", 2)
    d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+50)+")").append("g").call(d3.axisBottom(scaleX))
    d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").call(d3.axisLeft(scaleY))
    
    
    console.log("hi")
}
//console.log(dataParse())

document.addEventListener("load", axis())