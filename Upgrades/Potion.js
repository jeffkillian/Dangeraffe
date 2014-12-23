function Potion(){
	var potionProps = {
			desc: "potion", 
			width:.5, 
			height:2,
			x:1.4,//JJK This spawns at 2.4, even though 1.4 seems better
			y:13.9,
			density:1,
			imgPath:"Images/potion.png" ,
			classID:2,
			restitution:.5,
			canTrash:0,
			groupIndex:GROUP_GIRAFFE
			
		};
	//Destroy left wall before spawning potion
	if (leftWall.leftWallPotionCover){
	    world.DestroyBody(leftWall.leftWallPotionCover); 
	}
	this.potion=createABody(potionProps,this);
	globalProps.potionExists=1;
	
//add a sparkly effect for creation.
//get rid of button when it is active
	//mouth gets big when he is close

};


Potion.prototype.update=function(){
    if (Point.distance(this.potion.GetPosition(),giraffe.getMouthPosition())<1){
       new PotionExperience();
       destroyBodyList.push(this.potion);
       
       //start countdown timer for when potion will end
       window.setTimeout(function(){
           giraffe.underPotionInfluence=0;
           globalProps.potionExists=0;
           giraffe.eyes.reset=1;
           giraffe.mouth.reset=1;
           world.SetGravity(new b2Vec2(0,30));
           destroyBodyList.push(potionBackground);
           
        },10000);//disable potion in 10000
        
    }

    //should also handle making the potion div visible or not
    
};



upgPotionProps = {
	    ID:8,
	    title:'Potion',
	    description:'Potential to make things <em>real weird</em>',
		imgPath:"Images/potion.png",
	};
	upgPotionProps.buttonFunction=function(){handlePotion();};


//handles purchase of potion
function handlePotion(){
	if (globalProps.potionExists){
		return;
	}
	if (dangerIsHighEnough(upgPotionProps)){
	    if(leftWall.leftWallPotionCover){
	        destroyBodyList.push(leftWall.leftWallPotionCover);
	    };
		spendDangerUnits(upgPotionProps.cost);
		globalProps.boughtPotion=1;
		potion = new Potion();
	}
};
	
//start the potion experience
function PotionExperience(){
   giraffe.underPotionInfluence=1;
   world.SetGravity(new b2Vec2(0,1));
   var potionBackgroundProps={ 
        color: "black",
        type: "static",
        desc: "potionBackground",
        x:visibleCanvasCenter.x,//for some reason, don't have to adjust these by gradient radius. Radians draw from center'
        y:visibleCanvasCenter.y,//for some reason, don't have to adjust these by gradient radius. Radians draw from center. Maybe due to the draw function we have?
        width:rightBoundPos-leftBoundPos,
        height:bottomBoundPos-topBoundPos,
        maskBits:0x0008
       }; 
   potionBackground=createABody(potionBackgroundProps,this);
   
   particleIndex=0;//makes sure new ones appear behind
   for (var i=1;i<200;i++){
       
       new PotionParticle();
   }
   

};




//one specific potionParticle
function PotionParticle(){
    particleIndex++;//makes sure new ones appear behind
    this.particleIndex=particleIndex;//makes sure new ones appear behind
    //this.lifeSpan=document.getElementById('numberField').value||100;
    this.lifeSpan=getRandomInt(50,100);
    this.lifeLeft=this.lifeSpan;
    this.opacityTotalChange=1;
    this.opacityChangePerStep= this.opacityTotalChange/this.lifeSpan*2;
    this.r = Math.round(Math.random()*255);
    this.g = Math.round(Math.random()*255);
    this.b = Math.round(Math.random()*255);
    this.opacity=1;
    this.radius=getRandomArbitrary(.2,.6);
    this.gradientRadius=getRandomArbitrary(.2,this.radius);
    var color=getGradient(this.gradientRadius,this.r,this.g,this.b,this.opacity);
    this.randomRadiusChange=getRandomArbitrary(0,1);
    this.gradientPosition={x:giraffe.torso.GetPosition().x,y:giraffe.torso.GetPosition().y};
    var change=5;
    this.gradientPosition.x+=getRandomArbitrary(-change,change);
    this.gradientPosition.y+=getRandomArbitrary(-change,change);
    //this.gradientPosition=getPointOnVisibleCanvas();
    var potionParticleProps={ 
        color: color, 
        type: "static",
        desc: "potionParticle",
        shape:"circle",
        x:this.gradientPosition.x,//for some reason, don't have to adjust these by gradient radius. Radians draw from center'
        y:this.gradientPosition.y,//for some reason, don't have to adjust these by gradient radius. Radians draw from center. Maybe due to the draw function we have?
        radius:this.radius,
        maskBits:0x0008,
       }; 
       this.potionParticle = createABody(potionParticleProps,this);
       
};
//Updates one potionParticle
PotionParticle.prototype.update=function(){
    var distance=Point.distance(giraffe.torso.GetPosition(),this.potionParticle.GetPosition());
    
    distance=Math.pow(distance,1.1);
    var radiusChange=.01*distance*this.randomRadiusChange;
    //Fade Out, make radius smaller
    
    this.gradientRadius+=radiusChange;
    this.potionParticle.GetUserData().radius+=radiusChange;
    if (this.lifeLeft<(this.lifeSpan/2)){
        this.opacity-=this.opacityChangePerStep;
        
    }
    
    //Initiate the change
    var gradient=getGradient(this.gradientRadius,this.r,this.g,this.b,this.opacity);
    this.potionParticle.GetUserData().color=gradient;
    
    //If it's too small, delete
    if (this.opacity<.001) {//if it's small, delete
        destroyBodyList.push(this.potionParticle);
        if (giraffe.underPotionInfluence) new PotionParticle();
        return;
    }
    
    this.lifeLeft--;
    
    
    var xDiff=this.gradientPosition.x-giraffe.torso.GetPosition().x;
    var yDiff=this.gradientPosition.y-giraffe.torso.GetPosition().y;
    
    var factor=15;
    var xChange=xDiff/factor;
    var yChange=yDiff/factor;
    this.gradientPosition.x+= xChange;
    this.gradientPosition.y+= yChange;
    this.potionParticle.SetTransform(new b2Vec2(this.gradientPosition.x,
    this.gradientPosition.y),0);
    
    if (this.lifeLeft<0||isOffVisibleCanvas(this.gradientPosition)){
        destroyBodyList.push(this.potionParticle);
        if (giraffe.underPotionInfluence) new PotionParticle();
    }
};

