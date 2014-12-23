function Rocket(){
	this.flameIndex=0;
    this.flameExists=0;
	this.initialize();
	this.canTrash=1;
	//adds the bodies
	//join bottom to top of rocket
	
    //where the weld goes
    //var anchor = getWorldPointFromRelativeInitialPoint(initialBottomOffset,this.rocket);//where the anchor goes...somewhat irrelevant
    //var rocketJoint = addWeldJoint(this.rocket, this.rocketBottom, anchor);
	
	
	
	
	//rocketJoint = addJoint("weld",valuesToWeldJointInfo(this.rocket,this.rocketBottom,new b2Vec2(0,1.5),new b2Vec2(0,-.5),0));
	rocketCount+=1;
};

var flameLoopImages=['Images/rocketFire.png',
          'Images/rocketFire2.png',
          'Images/rocketFire3.png',
		  'Images/rocketFire4.png',
		  'Images/rocketFire3.png',
		  'Images/rocketFire2.png'];
		  
Rocket.prototype.animateFlame=function(){
	this.flameIndex+=1;
	this.flameIndex = getNextIndex(this.flameIndex,flameLoopImages);//get the next index
	this.flameFix.GetUserData().image = getImageFromArray(this.flameIndex,flameLoopImages);//change it to the next index
};
//add the flame
Rocket.prototype.addFlame = function(){
	if (this.flameExists==0){//if no flame exists
		this.flameFix = new Flame(this);
		this.flameExists=1;
		//flameJoint = addJoint("weld",valuesToWeldJointInfo(this.rocketBottom,this.flame,new b2Vec2(0,.5),new b2Vec2(0,-.5),0));//bind to rocket bottom
	}
	
};
//Used to delete the whole rocket
Rocket.prototype.destroy = function(){
	rocketCount-=1;
	destroyBodyList.push(this.rocket);
	destroyBodyList.push(this.rocketBottom);
	if (this.flameExists){this.removeFlame();};
};

//used to just delete the flame
Rocket.prototype.removeFlame = function(){
    	this.rocket.DestroyFixture(this.flameFix);
		this.flameExists=0;
};
//Moves the rocket
Rocket.prototype.move=function(){
	var multiplier = 200;
	var rocketAngle=this.rocket.GetAngle(); //get the angle
	rocketAngle = rocketAngle%(2*Math.PI);//get it from 0-2PI
	rocketAngle = -rocketAngle+Math.PI/2;//add 90 degrees
	var angleCos=Math.cos(rocketAngle);
	var angleSin = Math.sin(rocketAngle);
	var force = new b2Vec2(angleCos*multiplier+this.rocket.GetPosition().x,
							-angleSin*multiplier+this.rocket.GetPosition().y);//make the multiplier strong so that it overcomes gravity
	this.rocket.ApplyLinearImpulse(force,this.rocket.GetPosition());
	

};

Rocket.prototype.initialize=function(){
	//define properties
	var rocketTopProps ={
			desc: "rocket", 
			danger: 5,
			width:.5, 
			height:3,
			density:3,
			imgPath:"Images/rocketTop.png",
			classID:2,
			canTrash:1
		};

	var	rocketBottomProps ={
				desc: "rocketBottom", 
				danger: 1,
				width:1, 
				height:1,
				density:8,
				imgPath:"Images/rocketBottom.png",
				classID:1,
				canTrash:1,
				offSet:new b2Vec2(0,2)
			};

	//make random;
	var point=getPointOnVisibleCanvas();
	rocketTopProps.x=point.x;
	rocketTopProps.y=point.y;


	
	//creates the bodies
	this.rocket = createABody(rocketTopProps,this);//create rocket top
	
	var rocketBottomFixDef= createFixtureDef(rocketBottomProps);
	
	this.rocketBottomFix=addFixtureToBody(rocketBottomFixDef,this.rocket);

};

Rocket.prototype.update=function(){
    if (rocketsAreMoving){
        if (this.flameExists){
            this.animateFlame();//if a flame already exists, just update it
            this.move();
        }
        else{
            this.addFlame();  
        }
    }
    else{
        if (this.flameExists){//flame exists when it shouldnt
            this.removeFlame();
        }
    }
};




//##################UPGRADE FUNCTIONALITY##################


//ROCKETPROPS
upgRocketProps = {
    ID:2,
    title:'Rocket',
    description:'Your own personal toy rocket. Move [q]',
	imgPath:"Images/rocketRestIcon.png",
	preFunction: function(){
	globalProps.allowRocket=1;
	}
};
upgRocketProps.buttonFunction=function(){handleRocket();};

//CALLED BY Clicking the rocket upgrade. Used to determine where a new one should exist.
function handleRocket(){
	if (!globalProps.allowRocket){
		return;
	}
	if (rocketCount<4){//if less than 4 rocket exists, continue
		if (dangerIsHighEnough(upgRocketProps)){
			spendDangerUnits(upgRocketProps.cost);
			var rocket = new Rocket();
		}
	}
};




