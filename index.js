const height = 500
const width = 700
var idx=0

function scene1(){
    d3.csv("data/financial_risk_assessment.csv").then(function(data){
        var scaleX=d3.scaleLinear().domain([600,800]).range([0, width])
        var scaleY=d3.scaleLinear().domain([5000,50000]).range([height, 0])
        var tooltip=d3.select("#graph").append("div").style("opacity", 0).attr("class", "tooltip").style("background-color", "white")
        .style("border", "solid").style("padding", "5x")
        var mouseover=function(d){tooltip.style("opacity", 1)}
        var mousemove=function(event, d){
            console.log(event)
            tooltip.html("Credit Score: "+d["Credit Score"]+"<br>Loan Amount: "+d["Loan Amount"]+"<br>Previous Defaults: "+d["Previous Defaults"]+"<br>Risk Rating: "+d["Risk Rating"])
            .style("left", (event.pageX+90)+"px").style("top", event.pageY+"px")
        }
        var mouseleave=function(d){
            tooltip.transition().duration(100).style("opacity",0)
        }
        d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+50)+")").append("g").call(d3.axisBottom(scaleX))
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").call(d3.axisLeft(scaleY))
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").selectAll("dot").data(data).enter()
       .append("circle").attr("cx", function(d){return scaleX(d["Credit Score"])})
       .attr("cy", function(d){return scaleY(d["Loan Amount"])})
       .attr("r", function(d){return (1+Number(d["Previous Defaults"]));})
        .on("mouseover", mouseover).on("mousemove", mousemove).on("mouseleave", mouseleave)
    });
}

function scene2(){
    d3.csv("data/financial_risk_assessment.csv").then(function(data){
        var education=["Bachelor's", "High School", "Master's", "PhD"]
        var colors=d3.scaleOrdinal().domain(education).range(["#66c2a5", "#fc8d62","8da0cb","#e78ac3"])
        var scaleX=d3.scaleLinear().domain([20000,120000]).range([0, width])
        var scaleY=d3.scaleLinear().domain([600,800]).range([height,0])
        d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+50)+")").append("g").call(d3.axisBottom(scaleX))
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").call(d3.axisLeft(scaleY))
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").selectAll("dot").data(data).enter()
        .append("circle").attr("class",function(d){
            if (d["Education Level"].includes(" ")){
                return d["Education Level"].replace(" ", "")
            }
            else if (d["Education Level"].includes("'")){
                return d["Education Level"].replace("'", "")
            }
            return d["Education Level"]
        }).attr("cx", function(d){return scaleX(Number(d["Income"]))})
       .attr("cy", function(d){return scaleY(Number(d["Credit Score"]))})
       .attr("r", 2)
       .style("fill", function(d){return colors(d["Education Level"])})
    
        d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+75)+")").selectAll("myLegend").data(education)
        .enter().append("g").append("text").attr("x", function(d,i){return 30+i*100}).attr("y", 10).text(function(d){return d}).style("fill", function(d){return colors(d)})
        .on("click", function(event){
            d=document.elementFromPoint(event.pageX,event.pageY).textContent
            if (d.includes(" ")){
                d = d.replace(" ", "")
            }
            else if (d.includes("'")){
                d = d.replace("'", "")
            }
            opacity=d3.selectAll("."+d).style("opacity")
            d3.selectAll("."+d).transition().style("opacity", opacity==1?0:1)
        })
    });
}

function scene3(){
    d3.csv("data/financial_risk_assessment.csv").then(function(data){
        var marital=["Married", "Single", "Divorced", "Widowed"]
        var colors=d3.scaleOrdinal().domain(marital).range(["#66c2a5", "#fc8d62","8da0cb","#e78ac3"])
        var scaleX=d3.scaleLinear().domain([20000,120000]).range([0, width])
        var scaleY=d3.scaleLinear().domain([600,800]).range([height,0])
        d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+50)+")").append("g").call(d3.axisBottom(scaleX))
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").call(d3.axisLeft(scaleY))
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").selectAll("dot").data(data).enter()
        .append("circle").attr("class",function(d){return d["Marital Status"]}).attr("cx", function(d){return scaleX(Number(d["Income"]))})
       .attr("cy", function(d){return scaleY(Number(d["Credit Score"]))})
       .attr("r", function(d){return (1+Number(d["Number of Dependents"]));})
       .style("fill", function(d){return colors(d["Marital Status"])})
    
        d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+75)+")").selectAll("myLegend").data(education)
        .enter().append("g").append("text").attr("x", function(d,i){return 30+i*100}).attr("y", 10).text(function(d){return d}).style("fill", function(d){return colors(d)})
        .on("click", function(event){
            d=document.elementFromPoint(event.pageX,event.pageY).textContent
            opacity=d3.selectAll("."+d).style("opacity")
            d3.selectAll("."+d).transition().style("opacity", opacity==1?0:1)
        })
    });
}

function nextScene(){
    d3.select("svg").html=""
    idx+=1
    if (idx%3===0){
        scene1()
    }
    else if (idx%3===1){
        scene2()
    }
    else if (idx%3===2){
        scene3()
    }
}

document.addEventListener("load", scene1())