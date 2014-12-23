function Bloob(radius,location,color){
    this.timesCollided=0;
    this.radius=radius;
    this.location=location;
    this.color=color;
    var bloobProps={
        x:location.x,
        y:location.y,
        desc:"bloob",
        type:"dynamic",
        shape:"circle",
        color:color,
        radius:radius,
        restitution:.8,
        friction:.3
    };
    this.bloob=createABody(bloobProps,this);
    //Add smile
    var bloobFace ={
                desc: "bloobFace", 
                width:radius/2, 
                height:radius/2,
                imgPath:"Images/rocketBottom.png",
                classID:1,
                canTrash:1,
                offSet:new b2Vec2(0,2)
            };
    
    //var rocketBottomFixDef= createFixtureDef(rocketBottomProps);
    
    //this.rocketBottomFix=addFixtureToBody(rocketBottomFixDef,this.rocket);

    
    
    
}

Bloob.prototype.update=function(){
    
    //If two small, quit and destroy
    if(this.radius<.2){
         destroyBodyList.push(this.bloob);
         return;
    };
    
    //If we should generate two children
    if (this.timesCollided>10){
        var newCenters=this.bloob.GetPosition();
        newVelocity=this.bloob.GetLinearVelocity();
        destroyBodyList.push(this.bloob);                   //Destroy the old one
        var bloobChildOne=new Bloob(this.radius/2,newCenters,this.color).bloob;   //Create the new ones
        var bloobChildTwo=new Bloob(this.radius/2,newCenters,this.color).bloob;   //Create the new ones
        bloobChildOne.ApplyLinearImpulse(newVelocity,bloobChildOne.GetPosition()); 
        bloobChildTwo.ApplyLinearImpulse(newVelocity,bloobChildTwo.GetPosition());
    }
};

