function MagicSprinkles(){
};

//each time in loop, add new one
MagicSprinkles.prototype.update=function(){
     if(!giraffe.hasSprinkles){return;};
     new MagicSprinkle();
      
};


//MAGIC SPRINKLES PROPERTIES	
upgMagicSprinklesProps = {
    ID:6,
    title:'Magic Sprinkles',
    description:'Look super cool, feel super cool',
    imgPath:"Images/magicSprinkles.png",//NEED TOC HANGE THIS ICON
    purchaseOnce:1
};
upgMagicSprinklesProps.buttonFunction=function(){handleSprinkles();};


/**
 * Called from sprinkles button. Handles the purchasing of sprinkles
 */
function handleSprinkles(){
    if (globalProps.boughtSprinkles){
        toggleSprinkles();
        return;//quit out here. no need to keep going
    }
    if (dangerIsHighEnough(upgMagicSprinklesProps)){//need to track helmetBought variable in a new helmet class. if so, then we don't ever disable this.
        spendDangerUnits(upgMagicSprinklesProps.cost);
        globalProps.boughtSprinkles=1;
        toggleSprinkles();
    }
}



/**
 * Called from handlesprinkles. Turns sprinkles on or off accordingly.
 */
function toggleSprinkles() {
      if (giraffe.hasSprinkles){
          giraffe.magicSprinkles.deactivate();
          
      }else{
          giraffe.magicSprinkles = new MagicSprinkles();
          giraffe.magicSprinkles.activate();
          
      }
};


MagicSprinkles.prototype.activate=function(){
    giraffe.hasSprinkles=1;
    this.update();
};

MagicSprinkles.prototype.deactivate=function(){
   giraffe.hasSprinkles=0;
};


//A single sprinkle
function MagicSprinkle(){
    var magicSprinklesProps={ 
        color: getRandomColorHex(), 
        type: "dynamic", 
        desc: "magicSprinkle",
        x: giraffe.head.GetPosition().x, 
        y: giraffe.head.GetPosition().y,
        height:.3, 
        angle: Math.random(),
        width:.1,
        maskBits:MASK_DONTCOLLIDE
       };
      this.magicSprinkle = createABody(magicSprinklesProps,this); 
      this.magicSprinkle.ApplyLinearImpulse(randomForce(),this.magicSprinkle.GetPosition());
}

/**
 * Updates one sprinkle, and deletes it if it too low on the y scale
 */
MagicSprinkle.prototype.update=function(){
    if (this.magicSprinkle.GetPosition().y>25){
        world.DestroyBody(this.magicSprinkle);
    }
};
    


