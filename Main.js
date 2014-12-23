
//make the upgrades, add them to an upgradeList
upgradeList = intitalizeUpgradeList();//creates the list of upgrades

function init() {//called when this is loaded

	//gravity is initialized in initial
    world = new b2World(gravity, true);
    hello=0;
    //canvas initialized in the initial
    context = canvas.getContext("2d");
    
    dtRemaining = 0;
    stepAmount = 1/60;
    debug=0;
    //debugDraw
    debugDraw = new CanvasDebugDraw(context);
    debugDraw.scale=SCALE;
    debugDraw.SetFlags(b2Draw.e_shapeBit | b2Draw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    $("#debugDraw").click(function () {
        if ($("#debugDraw:checked").val()) {
            debug = true;
        } else {
            debug = false;
            canvas.width = canvas.width;
        }
    });
	
    createWorld();
    //Create DOB OBjects
    createDOMObjects();
    
    window.addEventListener("keydown",doKeyDown);
    window.addEventListener("keyup",doKeyUp);
    requestAnimationFrame(gameLoop);
    

};
function update(dt) {
    dtRemaining += dt;
    while(dtRemaining > stepAmount) {
        dtRemaining -= stepAmount;
        world.Step(stepAmount, 
                10, // velocity iterations
                10);// position iterations
    }
    if(debug) {
        world.DrawDebugData();
        //drawDOMObjects();//#########################FOR THE DIV MOVING
    } else {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        context.scale(SCALE,SCALE);
        giraffe.update();//eat and blink
        updateUpgrades();//add new upgrades if any exist

        if (waterSpoutIsActive){
            waterSpout.activate();
        };
        if (snow){
            snow.update();
        };
        
        
        //reset all of the body Arrays, which help us draw in order

        regularBodies.length=0;//the list of normal bodies. this is what the majority of things should be in
        rainbowParticleBodies.length=0;
        potionParticleBodies.length=0;
        tailBodies.length=0;
        giraffeBodies.length=0;
        giraffeAdornmentBodies.length=0;
        wallPieceBodies.length=0;
        debugPointsBodies.length=0;
        //Each body has a bodywrapper. This bodywrapper has the draw function. It also has a
        //details node which stores EVERYTHING we need to know about the body that we set.
        
        for (var body = world.GetBodyList() ; body!=null; body = body.GetNext()) {
            var bodyWrap = body.GetUserData();//gets the bodycontaininer from a b2d definition
            
            if ((bodyWrap === undefined || bodyWrap === null)){continue;}//don't like that one null body
            //UpdateDanger
           if (inArray(bodyWrap.classID,dangerousObjects)){//if it is in dangerous objects
                updateDanger(bodyWrap);
            }
            //Destroy a body
            if ((body.GetPosition().x<-10)||(body.GetPosition().x>80)||(body.GetPosition().y>60)){//need to update to say if it's above or to the left?
                destroyBodyList.push(body);
                continue;
            }

            //if the parent has an update function, do that. This updates the actual object.
            if ( inArray(bodyWrap.desc,bodiesWithParentUpdate)){    
                body.parent.update();
            }
            
            //if the body has an actual function that should run and update, do that (for example each wall piece must be checked)
           if (bodyWrap.updateFunction){
                bodyWrap.updateFunction();
            }
            
            //if they are to be drawn explicitly from an array later, add them to their respective Array
            if (bodyWrap.desc in bodyArrayMapping){
                bodyArrayMapping[bodyWrap.desc].push(body);
                continue;
            }
             if (inArray(bodyWrap.desc,bodiesExplicitlyDrawn)){//if we are a body to ignore, skip
                continue;                
            }
            
            
            if(bodyWrap) {
                //bodyWrap.draw(context);
                regularBodies.push(body);//add this body to the regularBodies
            }
          
        }
        drawDOMObjects();//Enable this to get the test div to move
        trash.addObjectBodiesToDestroyList();//adds all bodies associated with objects that have been deleted to destroy list
        trash.takeOutTheTrash();//destroys all the bodies on that list
        
        
        environmentBodies.length=0;
        allBodiesToDraw.length=0;
        
        //always behind
        //allBodiesToDraw.push(backgroundSkyBody);
        allBodiesToDraw.push(cloud.cloud);
        allBodiesToDraw.push(grassBack);
        
         giraffeBodies.push(giraffe.leg1);
         giraffeBodies.push(giraffe.leg2);
         giraffeBodies.push(giraffe.leg3);
         giraffeBodies.push(giraffe.leg4);
         giraffeBodies.push(giraffe.neckLow);
         giraffeBodies.push(giraffe.neckHigh);
         giraffeBodies.push(giraffe.head);
        
         giraffeBodies.push(giraffe.torso);
         giraffeBodies=giraffeBodies.concat(tailBodies);
         
        //draw the environment background
        
        
       allBodiesToDraw=allBodiesToDraw.concat(regularBodies);//add in the regular bodies
       potionParticleBodies.sort(function(a,b){return b.particleIndex-a.particleIndex;});
        
        allBodiesToDraw=allBodiesToDraw.concat(potionParticleBodies);//add potion particles
        allBodiesToDraw=allBodiesToDraw.concat(rainbowParticleBodies);//add unicorn trails
        
        
        //draw giraffe here.
        allBodiesToDraw=allBodiesToDraw.concat(giraffeBodies);
        allBodiesToDraw=allBodiesToDraw.concat(giraffeAdornmentBodies);
        
        //draw the other things
        allBodiesToDraw.push(grassFront);
        allBodiesToDraw=allBodiesToDraw.concat(wallPieceBodies);
        allBodiesToDraw.push(bottomHidden);
        allBodiesToDraw=allBodiesToDraw.concat(debugPointsBodies);
        for (var i=0;i<allBodiesToDraw.length;i++){
            var bodyToDraw=allBodiesToDraw[i];
            if (bodyToDraw.GetUserData().desc=='fireParticle'){
                if (bodyToDraw.parent.remaining_life>15)
                {
                    context.globalCompositeOperation = "lighter";
                    bodyToDraw.GetUserData().draw(context);
                    context.globalCompositeOperation = "source-over";
                }
                else
                {
                    bodyToDraw.GetUserData().draw(context);
                }
                continue;
            }
        	bodyToDraw.GetUserData().draw(context);
        }

        //add the debug numbers       
        if (showDebugExtras){
            context.font="2px Arial";
            context.fillText("x "+calcX,1,2);
            context.fillText("y "+calcY,1,3.8);
        }
        context.restore();
    }
};




function click(callback) {
    function handleClick(e) {
        e.preventDefault();
        var point = {
            x: (e.offsetX || e.layerX) / SCALE,
            y: (e.offsetY || e.layerY) / SCALE
        };
        world.QueryPoint(function(fixture) {
            callback(fixture.GetBody(),
                    fixture,
                    point);
        },point);
    }

    canvas.addEventListener("mousedown",handleClick);
    canvas.addEventListener("touchstart",handleClick);
};








lastFrame = new Date().getTime();


window.gameLoop = function() {
    var tm = new Date().getTime();
    requestAnimationFrame(gameLoop);
    var dt = (tm - lastFrame) / 1000;
    if(dt > 1/15) { dt = 1/15; }
    update(dt);
    lastFrame = tm;
};



function createWorld() {
    
    //create World elements
    //backgroundSkyBody = createABody(backgroundSkyProps);
    bottomHidden = createABody(bottomHiddenProps);
    grassBack = createABody(grassBackProps);
    grassFront = createABody(grassFrontProps);
    cloud = new Cloud();
    trash = new Trash();
    
    // Create some walls
    var thickness=3;
    var offset=thickness/2;
    heightBottomBox=10;
    new bodyWrapper( { color: "black", type: "static", desc: "wall",x:canvas.width/SCALE+offset, y: 0, height: 60,  width: thickness,categoryBits:CATEGORY_WALL});//right
    new bodyWrapper( { color: "black", type: "static", desc: "wall",x: 0, y: -offset, height: thickness, width: 120,categoryBits:CATEGORY_WALL });//top      widths are super long so nothing falls through
    leftWall = new LeftWall();
    
    //bottomWall=createABody(bottomWallProps);
    //fireball=new Fireball();
    //Create DOB OBjects
    //createDOMObjects(); ;#########################FOR THE DIV MOVING;#########################FOR THE DIV MOVING
    giraffe = new Giraffe();
    bloob= new Bloob(2,new b2Vec2(20,20),"blue");
    bloob= new Bloob(2,new b2Vec2(20,20),"green");
    bloob= new Bloob(2,new b2Vec2(20,20),"orange");
    dragNDrop();
    world.SetContactListener(listener);//Add listener here so that everything is initialized
}


function doKeyDown(e){
    
    //if they hit q, move rocket
    if (e.keyCode==81){
        if (!rocketsAreMoving){
            rocketsAreMoving=1;
        }
    }
    
    if (e.keyCode==16){
        showDebugExtras=!showDebugExtras;
    }
}
//SHOWS DEBUG MOUSE COORDINATES
function doKeyUp(e){
    if (e.keyCode==81){
         rocketsAreMoving=0;
    }
    if (e.keyCode==90){//hit z to go into debug mode
        debug=!debug;
   }
}
window.addEventListener("load",init);




//Lastly, add in the `requestAnimationFrame` shim, if necessary. Does nothing 
//if `requestAnimationFrame` is already on the `window` object.
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                    timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());







//used if you are dragging and dropping
function dragNDrop() {
    var obj = null;
    var joint = null;

    function calculateWorldPosition(e) {//gets where the event happened
        return point = {
                x: (e.offsetX || e.layerX) / SCALE,
                y: (e.offsetY || e.layerY) / SCALE
        };
    }
    //TODO Delete this tag if not used anymore. Don't think it is.
    //Finds a fixture that we should be able to click and drag. Anything that is dynamic should be clickable and draggable.
    // function queryFixture(fixture){
        // var body=fixture.GetBody(); //get the body
        // obj = body.GetUserData();  //used later down the line
        // //print(obj.details.desc);   //for debug purposes.
        // if (body.GetType()==b2Body.b2_dynamicBody){
            // print(obj.details.desc);
            // return false;//return false to stop iterating, we have found a body that is dynamic (which is what we are looking for)
//             
        // }
        // return true;//return true to keep checking for fixtures. 
    // };

    
    function QueryCallback(point)
    {
        this.m_point = point;
        this.m_fixture = null;
    }
    
    QueryCallback.prototype =
    {
        ReportFixture: function(fixture)
        {
            var body = fixture.GetBody();

            obj = body.GetUserData();  //used later down the line
            if (body.GetType() == b2Body.b2_dynamicBody)
            {
                var inside = fixture.TestPoint(this.m_point);
                if (inside)
                {
                    this.m_fixture = fixture;
    
                    // We are done, terminate the query.
                    return false;
                }
            }
    
            // Continue the query.
            return true;
        }
    };

    canvas.addEventListener("mousedown",function(e) {
        e.preventDefault();
        var point = calculateWorldPosition(e);
        
        
        // Make a small box.
        var aabb = new b2AABB();
        var d = new b2Vec2();
        d.Set(0.001, 0.001);
        aabb.lowerBound = b2Vec2.Subtract(point, d);
        aabb.upperBound = b2Vec2.Add(point, d);

        // Query the world for overlapping shapes.
        var callback = new QueryCallback(point);
        //this.m_world.QueryAABB(callback, aabb);
        
        world.QueryAABB(callback,aabb);
        //So that we have the mouse position
        
       //If clicking on giraffe, change his eyes
        if (inArray(obj.desc,giraffeParts)){
            giraffe.beingDragged=1;
        }
        if(trash.isActive){
            //TODO If you can trash it, you should be able to do this.
            new TrashHand(point,obj);
        }
        print(obj.desc);//print out which object we are clicking on
    });

    canvas.addEventListener("mousemove",function(e) {
        if(!obj) { return; }
        var point = calculateWorldPosition(e);
        
        if(!joint) {
            var jointDefinition = new b2MouseJointDef();
            jointDefinition.bodyA = world.GetGroundBody();
            jointDefinition.bodyB = obj.body;
            jointDefinition.target.Set(point.x,point.y);
            jointDefinition.maxForce = 9999999;
            jointDefinition.timeStep = stepAmount;
            joint = world.CreateJoint(jointDefinition);
        }
        joint.SetTarget(new b2Vec2(point.x,point.y));
    });
    canvas.addEventListener("mouseup",function(e) {
        if(!obj) { return; }
        //If we are clicking on giraffe, reset mouth
        if (inArray(obj.desc,giraffeParts)){
            giraffe.mouth.reset=1;
        }
        obj = null;
        if(joint) {
            world.DestroyJoint(joint);
            joint = null;
        }
    });

};




function updateDanger(wrapper){
    var change;
    var body=wrapper.body;
    change=Point.distance(new Point(body.GetPosition().x,body.GetPosition().y),new Point(wrapper.lastX,wrapper.lastY));
    var addition=(wrapper.danger*change)/10;
    dangerFaced+=addition;
    totalDangerFaced+=addition;
    dangerFaced=Math.round(dangerFaced * 100) / 100;
    totalDangerFaced=Math.round(totalDangerFaced * 100) / 100;
    $("#dangerFacedValue").html(dangerFaced.toFixed(1));
    $("#totalDangerValue").html(totalDangerFaced.toFixed(1));
    wrapper.lastX=body.GetPosition().x;;
    wrapper.lastY=body.GetPosition().y;

}

function increaseDangerFaced(value){
    dangerFaced+=value;
   }




function print(string){
    console.log(string);
}
