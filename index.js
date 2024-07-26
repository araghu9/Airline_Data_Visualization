const height = 500
const width = 700
var idx=0
// general scatterplot inspiration sources:
// https://d3-graph-gallery.com/graph/scatter_basic.html
// https://d3-graph-gallery.com/graph/custom_axis.html
// Annotation inspiration source: https://d3-annotation.susielu.com/#examples
function scene1(){
    // For tooltip: https://d3-graph-gallery.com/graph/scatter_tooltip.html
    d3.csv("data/financial_risk_assessment.csv").then(function(data){
        var scaleX=d3.scaleLinear().domain([600,800]).range([0, width])
        var scaleY=d3.scaleLinear().domain([5000,50000]).range([height, 0])
        var tooltip=d3.select("#graph").append("div").attr("id", "tooltip1").style("opacity", 0).attr("class", "tooltip").style("background-color", "white")
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
        d3.select("svg").append("text").attr("x", width+70).attr("y", height+60).text("Credit Score")
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").call(d3.axisLeft(scaleY))
        d3.select("svg").append("text").attr("x", 10).attr("y", 40).text("Loan Amount")
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").selectAll("dot").data(data).enter()
       .append("circle").attr("cx", function(d){return scaleX(d["Credit Score"])})
       .attr("cy", function(d){return scaleY(d["Loan Amount"])})
       .attr("r", function(d){return (1+Number(d["Previous Defaults"]));})
        .on("mouseover", mouseover).on("mousemove", mousemove).on("mouseleave", mouseleave)

        const annotation=[{
            note: {
                label: "Despite having 3 previous defaults and large loan, this person is low risk, maybe due to their high credit score",
                title: "A interesting datapoint in the set"
            },
            x: 701,
            y: 97.30000000000001,
            dy: 47,
            dx: 90
        }]
        const makeAnnotations = d3.annotation().annotations(annotation)
        d3.select("svg").append("g").attr("class", "annotation-group").call(makeAnnotations)
    });
}

//Inspiration for both scene2 and scene3 legends: https://d3-graph-gallery.com/graph/connectedscatter_legend.html
function scene2(){
    d3.csv("data/financial_risk_assessment.csv").then(function(data){
        var education=["Bachelor's", "High School", "Master's", "PhD"]
        var colors=d3.scaleOrdinal().domain(education).range(["#66c2a5", "#fc8d62","8da0cb","#e78ac3"])
        var scaleX=d3.scaleLinear().domain([20000,120000]).range([0, width])
        var scaleY=d3.scaleLinear().domain([600,800]).range([height,0])
        d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+50)+")").append("g").call(d3.axisBottom(scaleX))
        d3.select("svg").append("text").attr("x", width+70).attr("y", height+60).text("Income")
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").call(d3.axisLeft(scaleY))
        d3.select("svg").append("text").attr("x", 10).attr("y", 40).text("Credit Score")
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

        const annotation=[{
            note: {
                label: "Typically, a higher level of education is considered the path for success, in this case, a lower education has high income, but low credit",
                title: "A interesting datapoint in the set"
            },
            x: 737.008,
            y: 535,
            dy: -47,
            dx: 90
        }]
        const makeAnnotations = d3.annotation().annotations(annotation)
        d3.select("svg").append("g").attr("class", "annotation-group").call(makeAnnotations)
    });
}

function scene3(){
    d3.csv("data/financial_risk_assessment.csv").then(function(data){
        var marital=["Married", "Single", "Divorced", "Widowed"]
        var colors=d3.scaleOrdinal().domain(marital).range(["#66c2a5", "#fc8d62","8da0cb","#e78ac3"])
        var scaleX=d3.scaleLinear().domain([20000,120000]).range([0, width])
        var scaleY=d3.scaleLinear().domain([600,800]).range([height,0])
        d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+50)+")").append("g").call(d3.axisBottom(scaleX))
        d3.select("svg").append("text").attr("x", width+70).attr("y", height+60).text("Income")
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").call(d3.axisLeft(scaleY))
        d3.select("svg").append("text").attr("x", 10).attr("y", 40).text("Credit Score")
        d3.select("svg").append("g").attr("transform","translate("+50+", "+50+")").append("g").selectAll("dot").data(data).enter()
        .append("circle").attr("class",function(d){return d["Marital Status"]}).attr("cx", function(d){return scaleX(Number(d["Income"]))})
       .attr("cy", function(d){return scaleY(Number(d["Credit Score"]))})
       .attr("r", function(d){return (1+Number(d["Number of Dependents"]));})
       .style("fill", function(d){return colors(d["Marital Status"])})
    
        d3.select("svg").append("g").attr("transform","translate("+50+", "+(height+75)+")").selectAll("myLegend").data(marital)
        .enter().append("g").append("text").attr("x", function(d,i){return 30+i*100}).attr("y", 10).text(function(d){return d}).style("fill", function(d){return colors(d)})
        .on("click", function(event){
            d=document.elementFromPoint(event.pageX,event.pageY).textContent
            opacity=d3.selectAll("."+d).style("opacity")
            d3.selectAll("."+d).transition().style("opacity", opacity==1?0:1)
        })

        const annotation=[{
            note: {
                label: "Points such of this seem to have a slightly more closely distributed section here, suggesting more high income but low credit widowers regardless of dependents",
                title: "A interesting datapoint in the set"
            },
            x: 748.39,
            y: 525,
            dy: -80,
            dx: 90
        }]
        const makeAnnotations = d3.annotation().annotations(annotation)
        d3.select("svg").append("g").attr("class", "annotation-group").call(makeAnnotations)
    });
}

function nextScene(){
    d3.select("svg").selectAll("*").remove()
    if (idx%3===0){
        document.getElementById("tooltip1").remove()
    }
    idx+=1
    if (idx%3===0){
        document.getElementById("info").innerText="This Narrative Visualization will explore a dataset with Financial Data. Specifically, we want to explore how different factors coupled\
                together lead to different risk profiles and ratings like credit score. The first chart we will explore is the one below. This one explores the relationship between\
                credit score and loan amounts. The size of the dots corresponds to the number of defaults on loans the person has had. When we look at this data, we\
                can't see much. For this reason, we have increased viewing capability for the dots. Hover over any circles and see more details about that\
                point displayed below, such as the referenced information and their risk rating."
        scene1()
    }
    else if (idx%3===1){
        document.getElementById("info").innerText="This chart illustrates the relationship between income and credit score. Using this chart and the previous one,\
        we can better understand the people at each point, seeing their incomes alongside those credit scores we saw. Furthermore, to add an extra level of detail\
        to the plot, we can filter on the level of education the people in the dataset have. The points are color coded to the color of the level of education they\
        have. Beyond that, to isolate these points, if you click on the specific level of education, the points will be toggled on/off. With this capability, we can\
        see how education has impacted income and the credit score as well. As an example, we can see Bachelor's degree holders tended to have higher income and portentially\
        better credit at those higher incomes than some other levels of education. NOTE: If the selection does not work please increase the size of the window."
        scene2()
    }
    else if (idx%3===2){
        document.getElementById("info").innerText="This chart is similar to the one previous one. This is showing the relationship between income and credit score as well,\
        and allows filtering of color coded points. But there are a few differences to point out here that offer a new dimension to the data and overall understanding of \
        factors that impact measures of risk like credit scores and risk ratings. One major difference is that the color filter this time doesn't refer to education level,\
        but to marital status. This will allow us to filter based on marital status and understand the familial situation behind the person in question and might affect their\
        score with their income. The other major difference here is how the size of each circle in the plot corresponds to the number of dependents the person has, ranging from\
        0 to 4. This, similar to marital status, can affect credit score with the income of the person and offers a new dimension to explore, such as how maybe more widowers seem\
        seem to have lower credit and higher income regardless of dependents which we might not see in other groups. NOTE: If the selection does not work please increase the size of the window."
        scene3()
    }
}

document.addEventListener("load", scene1())