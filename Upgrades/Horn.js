function Horn(){
	var hornProps = {
			desc: "horn", 
			groupIndex:GROUP_GIRAFFE,
			friction:0.1,
			width:.2, 
			height:2,
			density:1,
			imgPath:"Images/horn.png",
			classID:1,
			offSet:new b2Vec2(1,-.6),
			angle:3*PI/8
	};

	
	
    var hornFixDef=createFixtureDef(hornProps);
    giraffe.horn=addFixtureToBody(hornFixDef,giraffe.head);
}


upgHornProps = {
    ID:4,
    title:'Unicorn Mode',
    description:'With a horn sharper than a rock pick!',
	imgPath:"Images/hornIcon.png",
	buttonFunction:"",
	purchaseOnce:1
};
upgHornProps.buttonFunction=function(){handleHorn();};

//gets the tip of the horn
function getHornTip(){
	return getWorldPointFromRelativeInitialPoint(new b2Vec2(1.7,-1.0),giraffe.head);
	
};

//HORN
function handleHorn(){
	if (globalProps.boughtHorn){
		giraffe.putOnGiraffe("horn");
		return;//quit out here. no need to keep going
	}
	if (dangerIsHighEnough(upgHornProps)){//need to track helmetBought variable in a new helmet class. if so, then we don't ever disable this.
		spendDangerUnits(upgHornProps.cost);
		globalProps.boughtHorn=1;
		giraffe.putOnGiraffe("horn");
	}
}


function Rainbow(){
 
 
    //get giraffe torso angle
   var currAngle=giraffe.torso.GetAngle();
   currAngle=currAngle%(2*Math.PI);//get it from 0-2PI
   var cos=Math.cos(currAngle);
   var sin = Math.sin(currAngle);
   

    var velVector=giraffe.torso.GetLinearVelocity();
    var length = velVector.Length();
    if (length<1) return;
    velocityAngle=vecToAngle(velVector);

    
 
    //get initial tail point
    var origin=getWorldPointFromRelativeInitialPoint(new b2Vec2(-1.5,.25),giraffe.torso);
    //find angle to draw
    particleAngle=velocityAngle+Math.PI/2;
   
    //draw particles at these points (extend outward)
    var cosAngle=Math.cos(particleAngle);
    var sinAngle=Math.sin(particleAngle);
    
    
    var linesDrawnPerStep=10;
    var frequency = 5/linesDrawnPerStep;
    var colorArray=[];
    for (var i=1;i<linesDrawnPerStep;i++){
            red   = Math.sin(frequency*i + 0) * 127 + 128;
            green = Math.sin(frequency*i + 2) * 127 + 128;
            blue  = Math.sin(frequency*i + 4) * 127 + 128;
            colorArray[i]=RGB2Color(red,green,blue,.8);
    }
    
    for (var i=1;i<linesDrawnPerStep/2;i++){
        
        var xChange=(i-1)*(.2*Math.cos(particleAngle));
        var yChange=(i-1)*(.2*Math.sin(-particleAngle));
        newX=origin.x+xChange;
        newY=origin.y+yChange;
        var temp=new RainbowParticle(newX,newY,colorArray[5-i],-velocityAngle);
        
        newX2=origin.x-xChange;
        newY2=origin.y-yChange;
        var temp=new RainbowParticle(newX2,newY2,colorArray[5+i],-velocityAngle);
 
            
        }
    }


 
function vecToAngle(vector){
    var toReturn=-Math.atan2(vector.y,vector.x);
    if (toReturn<0){
        toReturn=2*Math.PI+toReturn;
    }
    return toReturn;

}


//one specific rainbowParticle
function RainbowParticle(x,y,color,angle){
    this.framesActive=1;
    this.totalDuration=30;
    var rainbowParticleProps={ 
        color: color, 
        type: "static", 
        desc: "rainbowParticle",
        width:1.5,
        height:.2,
        x:x,
        y:y,
        angle:angle,
        alpha:.9,
        maskBits:MASK_DONTCOLLIDE,
        angleInDegrees:toDegrees(angle)
       }; 
       
       this.rainbowParticle = createABody(rainbowParticleProps,this);

       
       
};
//Updates one rainbowParticle
RainbowParticle.prototype.update=function(){
    
    var color = this.rainbowParticle.GetUserData().color;
    var oldAlpha=color.replace(/^.*,(.+)\)/,'$1');//get the alpha
    newAlpha = parseFloat(oldAlpha);//make it a string
    newAlpha=newAlpha-.03;
    if (newAlpha<.001) {//if it's small, delete
        destroyBodyList.push(this.rainbowParticle);
        return;
    }
    
    
    var newColor=color.replace(oldAlpha,newAlpha);//fade a bit
    this.rainbowParticle.GetUserData().color=newColor;
  
    
};







