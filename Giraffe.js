function Giraffe(){
	this.initialize();//adds all the properties to their index and creates those objects
	
	this.mouth.index = 0;
	this.isEating = 0;
	this.canEat=1;
	this.framesPassedSinceChange=0;
	this.eyes.isBlinking=0;
	//Add Joints
	joint = addJoint("revolute",valuesToRevoluteJointInfo(this.torso,this.neckLow,15.25,10.35,-10,70));//between neck and torso
	neckJoint = addJoint("revolute",valuesToRevoluteJointInfo(this.neckLow,this.neckHigh,15.8,8.5,-20,20));//between head and neck
	headjoint = addJoint("revolute",valuesToRevoluteJointInfo(this.neckHigh,this.head,15.85,7.1,-15,10));//between head and neck
	joint = addJoint("revolute",valuesToRevoluteJointInfo(this.torso,this.leg1,12.45,11.15,-40,90));//Between leg1 and torso);
	joint = addJoint("revolute",valuesToRevoluteJointInfo(this.torso,this.leg2,13,11.2,-40,90));//Between leg2 and torso);
	joint = addJoint("revolute",valuesToRevoluteJointInfo(this.leg3,this.torso,15,11.65,-20,90));//Between leg3 and torso)
	joint = addJoint("revolute",valuesToRevoluteJointInfo(this.leg4,this.torso,15.55,11.25,-10,90));//Between leg4 and torso);
	
}

//Updates everything about the giraffe
Giraffe.prototype.update = function(){
	this.updateMouth();
	this.updateEyes();
	
	if (this.hasSprinkles){
	    this.magicSprinkles.update();
	}
	if (giraffe.horn){//TODO JJK THIS NO LONGER WORKS BECAUSE HORN ISN'T A BODY
	    giraffe.rainbow=new Rainbow();
	}
};



/**
 * Takes in an item string and tries to add it to the giraffe's head.
 */
Giraffe.prototype.putOnGiraffe = function(newItem){//adds, takes away what is necessary
	
	if (newItem=="helmet"){
		if (this.helmet){//if helmet exists, remove it
		    this.removeHelmet();
			return;//stop here if it was on.
		}
		world.SetGravity(new b2Vec2(0,2));
		if (this.horn){//if horn exists, remove, add helmet
			this.removeHorn();
		}//if nothing exists, add helmet
		new Helmet();
		
		
		
	}
	if (newItem=="horn"){
		//if horn exists, remove
		if (this.horn){//if horn exists, remove it
			this.removeHorn();
			return;//stop here if it was on.
		}
		if (this.helmet){//if helmet exists, remove, add horn
			this.removeHelmet();
		}//if nothing exists, add helmet
		new Horn();
	}
	
};

Giraffe.prototype.removeHelmet=function(){
    toggleSinglePurchaseDivBorder('#upgDiv'+7);
    giraffe.head.DestroyFixture(this.helmet);
    this.helmet=undefined;
    this.canEat=1;
    world.SetGravity(new b2Vec2(0,30));//TODO JJK Make this not go back to normal if other things are enabled.
};

Giraffe.prototype.removeHorn=function(){
   toggleSinglePurchaseDivBorder('#upgDiv'+4);
   giraffe.head.DestroyFixture(this.horn);
   this.horn=undefined;
};






Giraffe.prototype.getMouthPosition=function(){
	return getWorldPointFromRelativeInitialPoint(giraffe.mouthOffset,giraffe.head);
};

Giraffe.prototype.getLEyePosition=function(){
    var offSet=giraffe.eyes.lEyeFix.GetUserData().offSet;
    return getWorldPointFromRelativeInitialPoint(offSet,giraffe.head);
};

Giraffe.prototype.getREyePosition=function(){
    var offSet=giraffe.eyes.rEyeFix.GetUserData().offSet;
    return getWorldPointFromRelativeInitialPoint(offSet,giraffe.head);
};



Giraffe.prototype.updateEyes=function(){
    
    //Potion
    if (this.underPotionInfluence)
    {
        giraffe.eyes.lPupilFix.GetUserData().radius=getRandomArbitrary(.05,.18);
        giraffe.eyes.rPupilFix.GetUserData().radius=getRandomArbitrary(.05,.18);
        giraffe.eyes.lPupilFix.GetUserData().color=getRandomColorHex();
   	 	giraffe.eyes.rPupilFix.GetUserData().color=getRandomColorHex();
    }
    
    //Blinking
    if ((!this.eyes.isBlinking)&&(Math.random()>.995)){///if not blinking, and we strike, blink
        this.blink();
    }
    
    //FollowingMouse
    this.moveEyesTowardsCursor();
    
    
    if (this.eyes.reset)
    {
    	 giraffe.eyes.lPupilFix.GetUserData().radius=this.eyes.pupilRadius;
         giraffe.eyes.rPupilFix.GetUserData().radius=this.eyes.pupilRadius;
         giraffe.eyes.lPupilFix.GetUserData().color=this.eyes.pupilColor;
    	 giraffe.eyes.rPupilFix.GetUserData().color=this.eyes.pupilColor;
    	 this.eyes.reset=0;
    }
};


Giraffe.prototype.moveEyesTowardsCursor=function(){//TODO JJK Add in the ability for eyes to slowly move to the target.
    var maxwiggle=.12;//maximum wiggle room
    var mousePoint=new Point(calcX,calcY);
    var headAngle=giraffe.head.GetAngle();
  
   //Do it for left
    var lEyePoint=this.getLEyePosition();
    angle=mousePoint.degreesTo(new Point(lEyePoint.x,lEyePoint.y));
    angle=-angle;
    angle=angle*DEGTORAD;
    angle=angle+headAngle;
    //turn that angle into a vector
    xChange=Math.cos(angle)*maxwiggle;
    yChange=-Math.sin(angle)*maxwiggle;
    //make offset equal to eyeball position+vector
    var eyeOffset=giraffe.eyes.lEyeFix.GetUserData().offSet;
    
    giraffe.eyes.lPupilFix.GetUserData().offSet=b2Vec2.Add(eyeOffset,new b2Vec2(xChange,yChange));
    
    
    //Do it for right
    var rEyePoint=this.getREyePosition();
    angle=mousePoint.degreesTo(new Point(rEyePoint.x,rEyePoint.y));
    angle=-angle;
    angle=angle*DEGTORAD;
    angle=angle+headAngle;
    //turn that angle into a vector
    xChange=Math.cos(angle)*maxwiggle;
    yChange=-Math.sin(angle)*maxwiggle;
    
    //make offset equal to eyeball position+vector
    var eyeOffset=giraffe.eyes.rEyeFix.GetUserData().offSet;
    giraffe.eyes.rPupilFix.GetUserData().offSet=b2Vec2.Add(eyeOffset,new b2Vec2(xChange,yChange));
    
};



/* blinks the giraffes eyes */
Giraffe.prototype.blink = function(){
    giraffe.eyes.lPupilFix.GetUserData().color='white';
    giraffe.eyes.rPupilFix.GetUserData().color='white';
    this.eyes.isBlinking=1;
    window.setTimeout(function(){
        giraffe.eyes.isBlinking=0;
        giraffe.eyes.reset=1;
    },100);//blink in 1/100 of a second
};



Giraffe.prototype.updateMouth=function(){
    if (this.isEating){
        this.eatApple();
    }
    if (globalProps.potionExists){
        this.handleMouthOpenForPotion();
    }
    if(this.mouth.reset){
    	giraffe.mouth.fix.GetUserData().image = returnImage('Images/giraffe/mouth.png');
    	this.mouth.reset=0;
    }
    if (this.beingDragged){
        this.beingDragged=0;
        giraffe.mouth.fix.GetUserData().image = returnImage('Images/giraffe/mouthO.png');
    }
};


/* Changes the giraffes mouth so he eats the apple */
Giraffe.prototype.eatApple = function(){//JJK Clean up this functiona  bit. Can probably be a bit better.
    var targetDuration=3;
    this.isEating=1;
    this.framesPassedSinceChange+=1;
    if (this.framesPassedSinceChange==targetDuration){
        this.framesPassedSinceChange=0;
        this.mouth.index = getNextIndex(this.mouth.index,this.eatLoopImages);//get the next index
        if (this.mouth.index==0){//if we are at the 0th index
            this.isEating = 0;
            this.mouth.reset=1;
            return;
        }
        this.mouth.fix.GetUserData().image = getImageFromArray(this.mouth.index,this.eatLoopImages);
}
};

/* Changes the giraffes mouth so he opens it when close to the potion */
Giraffe.prototype.handleMouthOpenForPotion = function(){
    var existingPotion=potion.potion;
    if (Point.distance(existingPotion.GetPosition(),giraffe.getMouthPosition())<4){
        var imagePath = "Images/giraffe/eat3.png";
        var image = new Image();
        image.src = imagePath;
        this.mouth.fix.GetUserData().image = image;
       
    }else{
        var imagePath = "Images/giraffe/mouth.png";
        var image = new Image();
        image.src = imagePath;
        this.mouth.fix.GetUserData().image = image;
    }
  

};



Giraffe.prototype.initialize=function(){
	this.eyes={};
	this.eyes.eyeRadius=.2;
	this.eyes.pupilRadius=.05;
	this.eyes.pupilColor="black";
	this.mouthOffset=new b2Vec2(.5,.5);
	
	var torsoProps = {
			desc: "torso",
			//bullet: true,
			x: 14,  
			y: 11, 
			height:2, 
			density:10,
			imgPath:"Images/giraffe/torso.png",
			classID:2,
			groupIndex: GROUP_GIRAFFE,
			alpha:.05
		};
			
	var	neckProps = {
			desc: "neck", 
			//bullet: true,
			x: 15.7,   
			y: 9.2, 
			height:3.5,    
			width:1,
			groupIndex: GROUP_GIRAFFE,
			density:3,
			imgPath:"Images/giraffe/neck.png",
			classID:1
		};
	var	neckLowProps = {
			desc: "neckLow", 
			//bullet: true,
			x: 15.5,   
			y: 9.6, 
			height:2.5,    
			width:1,
			groupIndex: GROUP_GIRAFFE,
			density:3,
			imgPath:"Images/giraffe/neckLow.png",
			classID:1
		};
	var	neckHighProps = {
			desc: "neckHigh", 
			//bullet: true,
			x: 15.88,   
			y: 7.8, 
			height:1.8,    
			width:.55,
			groupIndex: GROUP_GIRAFFE,
			density:3,
			imgPath:"Images/giraffe/neckHigh.png",
			classID:1
		};
			
	var	headProps = {
			desc: "head",
			//bullet: true,
			x: 16.4,   
			y: 7.2,     
			width:1.8, 
			height:1.8,
			groupIndex: GROUP_GIRAFFE,
			density:5,
			imgPath:"Images/giraffe/head.png",
			classID:1
		};
	
	var	mouthProps = {
			desc: "mouth", 
			//bullet: true,
			x: 16.6,
			y: 7.7,
			width:.75,
			height:.75,
			groupIndex: GROUP_GIRAFFE,
			density:1,
			imgPath:"Images/giraffe/mouth.png",
			classID:1,
			offSet:this.mouthOffset
			
		};
	
	var	leftEyeProps = {
			desc: "leftEye", 
			radius:this.eyes.eyeRadius,
            shape:"circle",
            color:"white",
			groupIndex: GROUP_GIRAFFE,
			density:1,
			classID:1,
			offSet:new b2Vec2(-.25,.1)
		};
	var	rightEyeProps = {
			desc: "rightEye", 
			radius:this.eyes.eyeRadius,
            shape:"circle",
            color:"white",
			groupIndex: GROUP_GIRAFFE,
			density:1,
			classID:1,
			offSet:new b2Vec2(.25,0)
		};
	
	var	leftPupilProps = {
			desc: "leftPupil", 
			radius:this.eyes.pupilRadius,
            shape:"circle",
            color:this.eyes.pupilColor,
			groupIndex: GROUP_GIRAFFE,
			density:1,
			offSet:new b2Vec2(-.25,.1),
			classID:1
		};
	var	rightPupilProps = {
			desc: "rightPupil", 
			radius:this.eyes.pupilRadius,
			shape:"circle",
			color:this.eyes.pupilColor,
			groupIndex: GROUP_GIRAFFE,
			density:1,
			classID:1,
			offSet:new b2Vec2(.25,0)
		};


	var	leg1Props = {
			desc: "leg1", 
			bullet: true,
			x: 12.5,  
			y: 12.9, 
			width: 0.75,
			height:3,
			groupIndex: GROUP_GIRAFFE,
			density:1,
			imgPath:"Images/giraffe/leg1.png",
			classID:1
		};
	var	leg2Props = {
			desc: "leg2", 
			//bullet: true,
			x: 13.0,  
			y: 13, 
			width:0.75,
			height:2.75,
			groupIndex: GROUP_GIRAFFE,
			density:1,
			imgPath:"Images/giraffe/leg2.png",
			classID:1
		};

	var	leg3Props = {
			desc: "leg3", 
			//bullet: true,
			x: 15,  
			y: 13, 
			width:0.5,
			height:3,
			groupIndex: GROUP_GIRAFFE,
			density:1,
			imgPath:"Images/giraffe/leg3.png",
			classID:1
		};

	var	leg4Props = {
			desc: "leg4", 
			//bullet: true,
			x: 15.7,  
			y: 12.8  , 
			width:0.5,
			height:3,
			groupIndex: GROUP_GIRAFFE,
			density:1,
			imgPath:"Images/giraffe/leg4.png",
			classID:1
		};
	
	
	var eatLoopImages=["Images/giraffe/mouth.png",
	                   "Images/giraffe/eat3.png",
	                   "Images/giraffe/eat4.png",
	                   "Images/giraffe/eat5.png",
	                   "Images/giraffe/eat6.png"];
	                   
	           
	this.eatLoopImages = eatLoopImages;
	this.torso= createABody(torsoProps,this);
	
	//Head Parts
	this.head = createABody(headProps,this);
	var mouthFixDef    = createFixtureDef(mouthProps);
	var leftEyeFixDef  = createFixtureDef(leftEyeProps);
	var rightEyeFixDef = createFixtureDef(rightEyeProps);
	var leftPupilFixDef= createFixtureDef(leftPupilProps);
	var rightPupilFixDef= createFixtureDef(rightPupilProps);
	
	//Add the fixtures to the head
	this.mouth={}; //array to hold mouth info
	this.mouth.fix=addFixtureToBody(mouthFixDef,this.head);
	
	this.eyes.lEyeFix=addFixtureToBody(leftEyeFixDef,this.head);
	this.eyes.rEyeFix=addFixtureToBody(rightEyeFixDef,this.head);
	this.eyes.lPupilFix=addFixtureToBody(leftPupilFixDef,this.head);
	this.eyes.rPupilFix=addFixtureToBody(rightPupilFixDef,this.head);
	
	
	//Remainder of Giraffe Body Parts
	this.neckLow = createABody(neckLowProps,this);
	this.neckHigh = createABody(neckHighProps,this);
	this.leg1 = createABody(leg1Props,this);
	this.leg2 = createABody(leg2Props,this);
	this.leg3 = createABody(leg3Props,this);
	this.leg4 = createABody(leg4Props),this;
	createTail(this.torso);   
	
};

function createTail(torso){
	
	var	tailProps = {
			desc: "tailPiece", 
			//bullet: true,
			x: 5,  
			y: 5,  
			width:.5,
			groupIndex: -1,
			density:2,
			imgPath:"Images/giraffe/tail.png",
			classID:1
		};
	//make everything depend on height
	tailProps.height=tailProps.width*.26666;
	var jointOffset=tailProps.width*.13333;
	
	//get joint position relative to body
	jointPosX=torso.GetPosition().x-1.8;
	jointPosY=torso.GetPosition().y+.1;
	
	//adjust this to where the tail should be
	tailProps.x=jointPosX-tailProps.width/2;
	tailProps.y=jointPosY;
	
	var lastBody = createChain(tailProps,3,jointOffset,torso,jointPosX,jointPosY,45);
	
	var	tailEndProps = {
			desc: "tailEnd", 
			//bullet: true,
			x: 8.8,  
			y:11.1,
			angle:Math.PI/3.8,
			width:.5,
			height:.5,
			groupIndex: -1,
			density:.5,
			imgPath:"Images/giraffe/tailEnd.png",
			classID:1
		};
	var tailEnd = createABody(tailEndProps);
	tailEndJoint = addJoint("weld",valuesToWeldJointInfo(lastBody,tailEnd,new b2Vec2(-tailProps.width/2,0),new b2Vec2(0,0),12*Math.PI/8));//bind to head
}


//overlap is how far the elements overlap when you join them
function createChain(props,iterations,jointOffset,bodyToAttach,initialJointX,initialJointY,angleAllowed){
	var isFirstBody=1;
	var lastBody,currBody;
	var thisJointX=0;
	for (i = 0; i < iterations; i++) { 
		currBody = createABody(props);
		thisJointX=props.x+props.width/2-jointOffset;
		props.x-=props.width-jointOffset;
		if (isFirstBody){
			isFirstBody=0;
			tailjoint = addJoint("revolute",valuesToRevoluteJointInfo(bodyToAttach,currBody,initialJointX,initialJointY,-angleAllowed,angleAllowed));//angle is hardcoded at 45 right now
			lastBody=currBody;
			continue;
		}
		tailjoint = addJoint("revolute",valuesToRevoluteJointInfo(lastBody,currBody,thisJointX,props.y,-angleAllowed,angleAllowed));//angle is hardcoded at 45 right now
		lastBody=currBody;
	}
	return lastBody;
}



