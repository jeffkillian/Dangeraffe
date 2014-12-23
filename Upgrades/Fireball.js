
//Creates a new fireball
function Fireball(){
   fireballProps={
        desc:"fireball",
        x:getXOnVisibleCanvas(),
        y:getYOnVisibleCanvas(),
        shape:"circle",
        radius:.4,
        density:20,
        color:"red",
        restitution:.2
    };
    this.fireBall=createABody(fireballProps,this);
   
    for(var i = 0; i < 100; i++)
    {
        new FireParticle(this.fireBall);
    }
    
    
}




function FireParticle(fireBall)
{
    this.fireBall=fireBall;
    //Controls how big overall everything is
    this.particleScale=.02;
    var particleScale=  this.particleScale;
    
    //lets change the Y speed to make it look like a flame
    xChange=particleScale*2.5;  //speed.x range is 5
    yMin=-particleScale*15;  //speed y range is 15 to 5
    yMax=-particleScale*5;
    this.speed = {x: getRandomArbitrary(-xChange,xChange), 
                  y: getRandomArbitrary(yMin,yMax)};
    this.opacity=1;
    //radius range = 10-30
    this.gradientRadius = getRandomArbitrary(particleScale*10,particleScale*30);
    
    //for now, always starts at 10,10 #####make random
    this.gradientPosition=fireBall.GetPosition();
    this.origin={x:fireBall.GetPosition().x,y:fireBall.GetPosition().y};
    this.offset={x:0,y:0};
    
    //life range = 20-30
    this.life = 20+Math.random()*10;
    this.remaining_life = this.life;
    
    //colors
    this.r = Math.round(Math.random()*255);
    this.g = Math.round(Math.random()*255);
    this.b = Math.round(Math.random()*255);
    gradient=getGradient(this.gradientRadius,this.r,this.g,this.b,this.opacity);
    
    var fireParticleProps={ 
                color: gradient, 
                type: "dynamic", 
                desc: "fireParticle",
                width:this.gradientRadius*2, 
                height:this.gradientRadius*2,
                x:this.gradientPosition.x+this.gradientRadius,
                y:this.gradientPosition.y+this.gradientRadius,
                maskBits:0x0008
    }; 
    this.fireParticle=createABody(fireParticleProps,this);
}


FireParticle.prototype.update=function(){
    this.opacity = Math.round(this.remaining_life/this.life*100)/100;

    var gradient=getGradient(this.gradientRadius,this.r,this.g,this.b,this.opacity);
    this.fireParticle.GetUserData().color=gradient;
    
    var hello=new b2Vec2(0,0);
    //change bounding box
    this.gradiantRadius-=1*this.particleScale;
    this.fireParticle.GetUserData().width-=2*this.gradientRadius;
    this.fireParticle.GetUserData().height-=2*this.gradientRadius;
    
    
    //change location
    
    this.offset.x+=this.speed.x;
    this.offset.y+=this.speed.y;
    this.fireParticle.SetTransform(new b2Vec2(this.origin.x+this.offset.x,
       this.origin.y+this.offset.y),0);
       var part=this.fireParticle;


    this.remaining_life-=1;
    if(this.remaining_life < 0 || this.gradientRadius < 0)
    {
        this.gradiantRadius=1;
        this.fireParticle.GetUserData().radius=1;
        //a brand new particle replacing the dead one
        new FireParticle(this.fireBall);
        destroyBodyList.push(this.fireParticle);
        return;
    }

};

    
