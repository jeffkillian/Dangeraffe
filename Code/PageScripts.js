

window.onload = function(){
	setTimeout("newQuote()",1000);
	createUpgradesTable();
};










function newQuote(){
    var randQuote = quotes[Math.floor( Math.random() * quotes.length )];
	setQuote(randQuote);
	setTimeout("newQuote()",60000);
}

function setQuote(inputQuote){
	printText(inputQuote,"gameTextQuote");
}

var quotes = new Array(
	"This is going to be exciting. I can feel it."
	,"I'm not sure how much I like this."
	,"Say, do you have any idea how to get out?"
	, "I like apples."
	, "I'm not quite sure what just happened."
	, "That was exciting!"
	, "I could go for a nice pie right about now."
	, "That wall over there? That's my favorite wall."
	
	);


function spendDangerUnits(cost){
	new DangerFacedChangeDiv(cost);
	dangerFaced-=cost;
}


var dangerChangeDivIDNum=1;
///handles the amount of divs we have when we are adding in new items
function getDangerChangeDivIDNum(){
	if (dangerChangeDivIDNum==20){
		dangerChangeDivIDNum=1;
	}else{
		dangerChangeDivIDNum+=1;
	}
	return dangerChangeDivIDNum;
}
//Object that adds new divs
function DangerFacedChangeDiv(cost){
	this.divID="duSpent"+getDangerChangeDivIDNum();
	this.cost=cost;
	this.contents = "<div id=\""+this.divID+"\" class=\"duSpent\">-"+this.cost+"</div>";//add in a new div with that ID
	$("#dangerChanged").append(this.contents);
	$("#"+this.divID).animate({'marginLeft' : "+=50px" },1000);
	$("#"+this.divID).fadeOut("slow");
}


(function() {
	window.onmousemove = handleMouseMove;
	function handleMouseMove(event) {
		event = event || window.event; // IE-ism
		calcX = event.clientX/20+canvasXAdjust;//adjust because of left column
		calcX=Math.round(calcX * 100) / 100;
		
		$("#mousex").html("Mouse X:"+calcX);
		calcY=event.clientY/20+canvasYAdjust;
		calcY=Math.round(calcY * 100) / 100;
		$("#mousey").html("Mouse Y:"+calcY);
		// event.clientX and event.clientY contain the mouse position
	}
})();

function createUpgradesTable(){
    divString="";
    rowSize=8;
    for (var i=0;i<32;i++){
        if (i%rowSize==0){
            divString+="<div class='clear'></div>";
        }
        divString+="<div class='upgradeTableDivWrapper unknownUpgrade' id='upgDiv"+i+"'></div>";
        
    }
    divString+="<div class='clear'></div>";
    $("#upgradeTable").html(divString);
    
}
