function BeachBall(){
	
	var beachBallProps = {
		desc: "beachBall", 
		width:3, 
		height:3,
		density:1,
		imgPath:"Images/beachBall.png" ,
		classID:2,
		restitution:.5,
		linearDamping:.1,//not sure why this doesn't work. Reinvestigate later.
		angularDamping:.1,//not sure why this doesn't work. Reinvestigate at a later time.
		canTrash:1,
		
	};
	this.popStage=0;
	this.popTriggered=0;
	var point=getPointOnVisibleCanvas();
	beachBallProps.x=point.x;
	beachBallProps.y=point.y;
	this.beachBall = createABody(beachBallProps,this);
};

BeachBall.prototype.update=function(){
	if (!this.popTriggered){
		if (new Point(this.beachBall.GetLinearVelocity().x,this.beachBall.GetLinearVelocity().y).length()>10){
				this.beachBall.GetUserData().image = returnImage("Images/beachBallBlur.png");
			}else{
				this.beachBall.GetUserData().image = returnImage("Images/beachBall.png");
			}
	}
	if (!(giraffe.horn)){return;}//if no horn, don't do anything
	//if the apple is too close to the giraffes mouth
	this.popTriggered = (Point.distance(this.beachBall.GetPosition(),getHornTip())<1.7)||this.popTriggered;
	if (this.popTriggered){
		switch(this.popStage){
			case 0:
				this.simulatePopExplosion();
				this.beachBall.GetUserData().image = returnImage("Images/beachBallPop1.png");
				break;
			case 1:
				this.beachBall.GetUserData().image = returnImage("Images/beachBallPop2.png");
				break;
			case 2:
				destroyBodyList.push(this.beachBall);
				increaseDangerFaced(15);//2 each time you pop a beachball
				popStage=0;
				break;
			}
		this.popStage+=1;
		
		
	};
		
};



BeachBall.prototype.simulatePopExplosion=function(){
	numParticles=15;
	blastPower=60;
	for (var i=0;i<numParticles;i++){
		var angle=(i/numParticles)*360*DEGTORAD;
		var rayDir=new b2Vec2(Math.sin(angle),Math.cos(angle));
		rayDir.Multiply(blastPower);
		
		var blastParticleProps={
			type:"dynamic",
			fixedRotation:true,
			bullet:true,
			desc:"beachBallParticle",
			linearDamping:60,//no idea what this should be
			//color:"red",
			//gravityScale:0,// currently doesn't work. Investigate why later
			x:this.beachBall.GetPosition().x,
			y:this.beachBall.GetPosition().y,
			vx:rayDir.x,
			vy:rayDir.y,
			shape:"circle",
			radius:0.05,
			density:60,
			friction:0,
			restitution:.99,
			maskBits:MASK_WATER
		};
		
		var beachBallPart = createABody(blastParticleProps,this);
			
			
		
	}
};




function addBeachBall(){
	if (dangerIsHighEnough(upgBeachBallProps)){
		spendDangerUnits(upgBeachBallProps.cost);
		beachBall = new BeachBall();
	}

};


//BEACH BALL
upgBeachBallProps = {
    ID:1,
	title:"Beach Ball",
	description:"A giraffe's third favorite beach toy",
	imgPath:"Images/beachBall.png" 
};
upgBeachBallProps.buttonFunction=function(){addBeachBall();};
