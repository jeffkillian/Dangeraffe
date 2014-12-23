function Snow(){
    //canvas init
    //var canvas = document.getElementById("b2dCanvas");
    //var ctx = canvas.getContext("2d");
    
    //canvas dimensions
    //var W = window.innerWidth;
    //var H = window.innerHeight;
    //canvas.width = W;
    //canvas.height = H;
    
    //snowflake particles
    var mp = 25; //max particles
    this.mp=mp;
    this.angle=0;
   
}


Snow.prototype.activate=function(){
    snowIsActive=1;
     for(var i = 0; i < this.mp; i++)
    {
     new SnowFlake(this,{});
     
        
    }
};

Snow.prototype.deactivate=function(){
   snowIsActive=0;
};




Snow.prototype.update=function(){
    this.angle += 0.005;
};
    
    

upgSnowProps = {
        ID:9,
        title:'Snow',
        description:'Chilly time',
        imgPath:"Images/snowflake.png",
        purchaseOnce:1
    };
    
upgSnowProps.buttonFunction=function(){handleSnow();};


var snowIsActive=0;


/**
 * Called from snow button. Handles the purchasing of water spout
 */
function handleSnow(){
    if (globalProps.boughtSnow){
        toggleSnow();
        return;//quit out here. no need to keep going
    }
    if (dangerIsHighEnough(upgSnowProps)){
        spendDangerUnits(upgSnowProps.cost);
        globalProps.boughtSnow=1;
        toggleSnow();
    }
}



/**
 * Called from handleSpout. Turns spout on or off accordingly.
 */
function toggleSnow() {
      if (snowIsActive){
          snow.deactivate();
          
      }else{
          snow = new Snow();

          snow.activate();

      }
};

    
    
    
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes

SnowFlake.prototype.update=function()
{
    if (!snowIsActive){
        destroyBodyList.push(this.snowFlake);
        return;
    }
    angle=this.snow.angle;
    var p=this.snowFlake.GetUserData();
    overallSpeed=.8;
    //Updating X and Y coordinates
    //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
    //Every particle has its own density which can be used to make the downward movement different for each flake
    //Lets make it more random by adding in the radius
    
   p.y += ((Math.cos(angle+p.d*15)+1)/20+ p.radius/6)*overallSpeed;//MIN IS RADIUS/2
   p.x += Math.sin(angle)*.07*overallSpeed;
    
    //Sending flakes back from the top when it exits
    //Lets make it a bit more organic and let flakes enter from the left and right also.
    if(p.x > rightBoundPos+2 || p.x < leftBoundPos-2 || p.y > bottomBoundPos)
    {
        if(Math.random()>.3333) //66.67% of the flakes
        {
            new SnowFlake(this.snow,{x:getXOnVisibleCanvas(), y:-1, d: p.d});
        }
        else
        {
            //If the flake is exitting from the right
            if(Math.sin(angle) > 0)
            {
                //Enter from the left
                new SnowFlake(this.snow,{x: leftBoundPos, y:getYOnVisibleCanvas(), d: p.d});
            }
            else
            {
                //Enter from the right
                new SnowFlake(this.snow,{x: rightBoundPos+1, y:getYOnVisibleCanvas(), d: p.d});
            }
        }
      //destroy the last snowflake
      destroyBodyList.push(this.snowFlake);
      return;
    }
    
    
    this.snowFlake.userdata=p;
    this.snowFlake.SetTransform(new b2Vec2(p.x,p.y),0);    
};




function SnowFlake(snow,determinedFlakeProps){
       //have the parent so we can get the variables associated
      
       this.snow=snow;
       var snowFlakeProps={};
       //Set up the defaults
        var point=getPointOnVisibleCanvas();
        var defaultFlakeProps={
            desc:"snowFlake",
            x: point.x, //x-coordinate
            y: point.y, //y-coordinate
            radius: getRandomArbitrary(.05,.17),//+1, //radius
            shape:"circle",
            type:"static",
            d: Math.random()*this.snow.mp, //density
            color:"white",
            maskBits:MASK_DONTCOLLIDE
        };
        
        
       //Use any props which are already pass in.
       for(var l in defaultFlakeProps) 
       {
            snowFlakeProps[l] = determinedFlakeProps[l] || defaultFlakeProps[l];
       }
        
       
        
        this.snowFlake=createABody(snowFlakeProps,this);
}
