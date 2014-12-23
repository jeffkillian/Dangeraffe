

//determines whether a body exists (like a helmet or horn);
function bodyExists(testBody){
	if (typeof testBody==='undefined') return 0;//if we set it to null, null testBody still has object
	return 1;//if it is object, it is true
}


//Goes through a property definition, adds them to the body.properties node
function addPropertiesNodeToBody(body,properties){
	body.properties={};
	for (var property in properties) {
		  if (properties.hasOwnProperty(property)) {
		    body.properties.property=properties[property];
		  }
	}
}


function isOffVisibleCanvas(point){
    if (point.x < leftBoundPos) return 1;
    if (point.x>rightBoundPos) return 1;
    if (point.y<topBoundPos) return 1;
    if (point.y>bottomBoundPos) return 1;
    return 0;
    
}
//Determines if target desc is a node in haystack aka haystack[target] exists
function inArray(target,haystack){
    return (haystack.indexOf(target)>-1);
};

function getPointOnVisibleCanvas(){
    return {x:getXOnVisibleCanvas(),y:getYOnVisibleCanvas()};
};

function getXOnVisibleCanvas(){
    return getRandomArbitrary(leftBoundPos,rightBoundPos);
};

function getYOnVisibleCanvas(){
    return getRandomArbitrary(topBoundPos,bottomBoundPos);
};

function turnPointsToVectors(points){
    verticesArray=[];
    for (var i=0;i<points.length;i++){
        var x=points[i].x;
        var y=points[i].y;
        var newVec=new b2Vec2(x,y);
        verticesArray[i]=newVec;
    }
    return verticesArray;
}


//The main drawing function used on each body
bodyWrapper.prototype.draw = function(context) {
   //If the wrapper's description is head, we want to draw those manually
   if (this.desc=='head'){
	   handleDrawingHeadFixtures(this);
	   return;
   }
   //Otherwise
   //for each fixture on this wrapper's body, draw that fixture
   for (var fixture = this.body.GetFixtureList() ; fixture!=null; fixture = fixture.GetNext()) {
		drawFixture(fixture);
   }
   
};
	
	
function handleDrawingHeadFixtures(headWrapper){
	
	//Find the head, and draw it first
	for (var fixture = headWrapper.body.GetFixtureList() ; fixture!=null; fixture = fixture.GetNext()) {
		if (fixture.GetUserData().desc=='head'){
			drawFixture(fixture);
			break;
		}
   }
	//Fraw the rest of the head
	drawFixture(giraffe.mouth.fix);
	drawFixture(giraffe.eyes.lEyeFix);
	drawFixture(giraffe.eyes.rEyeFix);
	drawFixture(giraffe.eyes.lPupilFix);
	drawFixture(giraffe.eyes.rPupilFix);
	if (giraffe.horn){
	    drawFixture(giraffe.horn);
	}
	if (giraffe.helmet){
        drawFixture(giraffe.helmet);
    }
	
	return;
}
	
	
//given a fixture and the associated body, draw that fixture
function drawFixture(fixture)
{
	 var details=fixture.GetUserData();
	 context.save();
     //get the point where it should be
     if (details!=='undefined'){
         if (details.offSet!=='undefined'){
              var newPoint=getWorldPointFromRelativeInitialPoint(details.offSet,fixture.GetBody());
                context.translate(newPoint.x,newPoint.y);
         }
     }
	
     var additionalRotation=0;
     //If the body is not the initial body on the object, we need to check for additional rotation
     if (details.desc!=fixture.GetBody().GetUserData().desc){
         additionalRotation=details.angle;
     }
     context.rotate(fixture.GetBody().GetAngle()+additionalRotation);//Also rotate by the angle defined in the initial setup
	    
		if(details.color) {
			context.fillStyle = details.color;

			switch(details.shape) {
			case "circle":
				context.beginPath();
				context.arc(0,0,details.radius,0,Math.PI*2);
				context.fill();
				break;
			case "polygon":
				var points = details.points;
      
				context.beginPath();
				
				//create a line
				context.strokeStyle = '#FFFFFF';
             context.lineWidth = .08;
             
				context.moveTo(points[0].x,points[0].y);
				for(var i=1;i<points.length;i++) {
					context.lineTo(points[i].x,points[i].y);
				}
				context.fill();
				context.stroke();//for the line
				break;
			case "block":
				context.fillRect(-details.width/2,
				-details.height/2,
				details.width,
				details.height);
				break;
			default:
				break;
			}
		}
		if(details.image) {
			image=details.image;
			context.drawImage(details.image,
			-details.width/2,
			-details.height/2,
			details.width,
			details.height);
		}
		
context.restore();

}
	
	
//adds a joint of the specified type
function addJoint(type,info){
	var bodyOne = info.bodyOne;
	var bodyTwo = info.bodyTwo;
	switch(type) {
		case "weld":
			var def = new b2WeldJointDef();
			def.bodyA=bodyOne;
			def.bodyB=bodyTwo;
			def.localAnchorA = info.bodyAVec;
			def.localAnchorB = info.bodyBVec;
			//def.referenceAngle = info.angle;
			//add the joint to the world
			world.CreateJoint(def);
			break;
		default:
			var pivotX=info.pivotX;
			var pivotY=info.pivotY;
			var lowerAngle = info.lowerAngle;
			var upperAngle = info.upperAngle;
			def = new b2RevoluteJointDef();
			def.Initialize(bodyOne,bodyTwo,new b2Vec2(pivotX,pivotY));
			def.enableLimit = true;
			def.lowerAngle = lowerAngle*Math.PI/180;
			def.upperAngle = upperAngle*Math.PI/180;
			world.CreateJoint(def);
	}
}

//Takes in a bodyA,bodyB,anchor, and makes a weld
function addWeldJoint(bodyA,bodyB,anchor){
            var joint = new b2WeldJointDef();
    
            joint.Initialize(bodyA, bodyB, anchor);
            world.CreateJoint(joint);
            return joint;
};


//REVOLUTE JOINT info
function valuesToRevoluteJointInfo(bodyA,bodyB,jointX,jointY,lowerAngle,upperAngle){
	var info=[];
	info.bodyOne=bodyA;
	info.bodyTwo=bodyB;
	info.pivotX=jointX;
	info.pivotY=jointY;
	info.lowerAngle=lowerAngle;
	info.upperAngle=upperAngle;
	return info;
}
//WELD JOINT DEFINITION 
function valuesToWeldJointInfo(bodyA,bodyB,bodyAVec,bodyBVec,thisAngle){
	var info=[];
	info.bodyOne=bodyA;
	info.bodyTwo=bodyB;
	info.bodyAVec=bodyAVec;//the point on body A to bind (relative to center)
	info.bodyBVec=bodyBVec;//the point on body B to bind(relative to center)
	info.angle=thisAngle;
	return info;
}


//Plug in a relative point when the angle is zero and 
//this gives you the point at the current angle/position

function getWorldPointFromRelativeInitialPoint(relativePoint,body)
{
    //If there is no relative point, just return the body position.
    if (typeof relativePoint==='undefined') {
        return body.GetPosition();
        };
    var pointAngle = Math.atan2(relativePoint.y, relativePoint.x);//get the point angle
	var newAngle=pointAngle+body.GetAngle();;//add the two angles
    var newRelative=Point.polar(relativePoint.Length(),newAngle);//do polar
	var newPoint=new b2Vec2(newRelative.x+body.GetPosition().x,newRelative.y+body.GetPosition().y);
	
	return newPoint;
}


/*
 * Takes in a x scale and y scale and returns a random vector 
 */
function randomForce(xMin,xMax,yMin,yMax){
    xMin=xMin||-1;
    xMax=xMax||1;
    yMin=yMin||-1;
    yMax=yMax||1;
    
    return new b2Vec2(getRandomArbitrary(xMin,xMax),getRandomArbitrary(yMin,yMax));
}

/*
 * Gets a random FLOAT number between two numbers
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/*
 * Gets a random int between the two values (not including last value)
 */
function getRandomInt(min,max){
    return Math.floor((Math.random() * max) + min);
};


function printText(text,textClass){
    if ('undefined'==typeof textClass){
        textClass="";
    }
    $("#gameText").prepend("<div class='"+textClass+"'>"+text+"</div>");
};


function toDegrees (angle) {
	return angle * (180 / Math.PI);
}

//Create a red point at point
function debugPoint(point){
    debugPointBody=createABody({ color: "red", type: "dynamic", desc: "debugPoint",x: point.x, y:point.y, height:.2, width:.2,maskBits:MASK_DONTCOLLIDE});
	//debugDrawBody=new bodyWrapper().body;//right
}

