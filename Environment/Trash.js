function Trash(){
        var height=25;
        this.trashHTML="<img id='trashImage' class='infoIcon'src='Images/trash.png'>";
        this.trashOpenHTML="<img id='trashImage' class='infoIcon' src='Images/trashOpen.png'>";
    this.isActive=0;
    $("#trashButton").click(toggleTrash);
    $("#trashButton").html(this.trashHTML);
};

//Adds all bodies from the objects to the trash queue. call this on things like rockets, which have to have their individual elements aded to the destroybodylist
Trash.prototype.addObjectBodiesToDestroyList=function(){
    //destroy anything that should be destroyed
    for (var i in objectsToDestroy) {
        var object=objectsToDestroy[i];
        if (typeof object.destroy !=='undefined'){//if they have a destroy function, do it
            object.destroy();
        }
    }
     // Reset the array
    objectsToDestroy.length = 0;
};


//Destroys every body within destroyBodyList
Trash.prototype.takeOutTheTrash=function(){
    //destroy anything that should be destroyed
    for (var i=0;i<destroyBodyList.length;i++) {
        var body=destroyBodyList[i];
        world.DestroyBody(body);
    }
    
     // Reset the array
    destroyBodyList.length = 0;
};





//Handles the trash on the right side
function toggleTrash() {
      if (trash.isActive){
          trash.deactivate();
      }else{
          trash.activate();
      }
};
Trash.prototype.activate=function(){
    this.isActive=1;
    $("#trashButton").html(this.trashOpenHTML);
    
};

Trash.prototype.deactivate=function(){
    if (!this.isActive){return;};
    this.isActive=0;
    $("#trashButton").html(this.trashHTML);
};

function TrashHand(pointToFlick,object){
    this.object=object;
    this.pointToFlick=pointToFlick;
    var trashHandProps = {
            desc: "trashHand",
            imgPath:"Images/hand.png",
            width:7,
            height:10,
            x:pointToFlick.x-2.5,
            y:0,
            density:1,
            type:"static",
            maskBits:MASK_DONTCOLLIDE
        };
   this.trashHand=createABody(trashHandProps,this);
    
}

TrashHand.prototype.update=function(){
    //Remove this if we are off screen
    if (this.trashHand.GetPosition().y<-10)
    {
        destroyBodyList.push(this.trashHand);
    }
    //If we are retreating, just do that
    if (this.retreating) 
    {
        var newpoint=b2Vec2.Add(this.trashHand.GetPosition(),new b2Vec2(0,-2));//new point to move to
        this.trashHand.SetTransform(newpoint,0);
        return;
    }
    
    //If we are already flicking, don't do anything. 
    if (this.flicking) return;

    //If the distance is greater than the height of hand, move it towards the object.
    if (Point.distance(this.trashHand.GetPosition(),this.pointToFlick)>this.trashHand.GetUserData().height/2){
        
        var newpoint=b2Vec2.Add(this.trashHand.GetPosition(),new b2Vec2(0,3));
        this.trashHand.SetTransform(newpoint,0);
        return;  
    }
    //If we get here, we aren't retreating, flicking, or moving down or up. We must flick!
    this.flick();
    
};

TrashHand.prototype.flick=function(){
    this.flicking=1;
    //apply impulse to object
    var body=this.object.body;
    var mass=this.object.body.GetMass();
    this.object.body.ApplyLinearImpulse(new b2Vec2(getRandomInt(-mass*100,mass*100),getRandomInt(-mass*100,mass*100)),this.pointToFlick,1);
    
    //If we can trash it, iterate over all objects and make them not collide so they'll fly off the screen
    if (body.GetUserData().canTrash){
        for (var fixture = body.GetFixtureList() ; fixture!=null; fixture = fixture.GetNext()) {
            var filter = new b2Filter();
            filter.categoryBits = "";
            filter.maskBits = MASK_DONTCOLLIDE;
            filter.groupIndex = "";
            fixture.SetFilterData(filter);
        }
    }
    this.flicking=0;
    this.retreating=1;
    
    //move hand away
    
    //do actual flicking motion
};
