function WaterSpout(){
};

//function waterParticles(){TODO JJK not implementing until particleSystem.getBodyContact is implemented in the jsliquidfun file.
//    var particle=new b2ParticleDef();
//    particle.flags=b2ParticleDef.b2_elasticParticle;
//    particle.position=new b2Vec2(16,16);
//    bigParticle=world.CreateParticle(particle);
//    
//}

/*
 * Adds a new water spout each new frame
 */
WaterSpout.prototype.update=function(){
     
   
     var randomBetween=Math.floor((Math.random() * 6) + 0);//random num between 0 and 6 (exclusive on 6, inclusive on 0)
     if(!waterSpoutIsActive){return;};
     new WaterDrop();
     new WaterDrop();

           

};



//WaterSpout Properties
upgWaterSpoutProps = {
    ID:5,
    title:'Water Spout',
    description:'Feeling hot? This water is lukewarm and will not help',
    imgPath:"Images/waterIcon.png",//NEED TO CHANGE THIS ICON
    purchaseOnce:1
};
upgWaterSpoutProps.buttonFunction=function(){handleWaterSpout();};
var waterSpoutIsActive=0;


/**
 * Called from waterspout button. Handles the purchasing of water spout
 */
function handleWaterSpout(){
    if (globalProps.boughtWaterSpout){
        toggleWaterSpout();
        return;//quit out here. no need to keep going
    }
    if (dangerIsHighEnough(upgWaterSpoutProps)){//need to track helmetBought variable in a new helmet class. if so, then we don't ever disable this.
        spendDangerUnits(upgWaterSpoutProps.cost);
        globalProps.boughtWaterSpout=1;
        toggleWaterSpout();
    }
}



/**
 * Called from handleSpout. Turns spout on or off accordingly.
 */
function toggleWaterSpout() {
      if (waterSpoutIsActive){
          waterSpout.deactivate();
          
      }else{
          waterSpout = new WaterSpout();

          waterSpout.activate();

      }
};


WaterSpout.prototype.activate=function(){
    waterSpoutIsActive=1;
    this.update();
};

WaterSpout.prototype.deactivate=function(){
   waterSpoutIsActive=0;
};

//A single water drop
function WaterDrop(){
     var waterDropProps={ 
        color: "#0D25E0",
        type: "dynamic", 
        desc: "waterDrop",
        shape:"circle",
        x: 40 ,
        y: 25,
        friction:.1,
        radius:getRandomArbitrary(.18,.2),
        maskBits:MASK_WATER
       };
       waterDropProps.angle=Math.random();
       this.waterDrop = createABody(waterDropProps,this);
       this.waterDrop.ApplyLinearImpulse(randomForce(-.1,.1,-15,-1),this.waterDrop.GetPosition());
};


/**
 * Updates one sprinkle, and deletes it if it too low on the y scale
 */
WaterDrop.prototype.update=function(){
    if (this.waterDrop.GetPosition().y>25){
        world.DestroyBody(this.waterDrop);
    }else  if (this.waterDrop.GetPosition().x<5.1){
        world.DestroyBody(this.waterDrop);
    };
    
};
    