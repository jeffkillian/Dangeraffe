/**
 * @author jkillian
 */

//Helper functions for creating a body
//takes in details, creates the object
function createABody(details,parent){
    var body = new bodyWrapper(details).body;
    
    if (!('undefined' === typeof parent)) 
    {//if no parent is passed in, it doesn't have a class, don't set parent
        body.parent=parent;
    }
    return body;
}

//fixtures are what you can see
function createFixtureDef(details){//creates a fixture definition
    // Create the fixture
    var fixtureDef = new b2FixtureDef();
    
    //Collision defaults
    if (details.maskBits){//if it has a maskBit specified, specify it
        fixtureDef.filter.maskBits = details.maskBits;
    }
    if (details.groupIndex){//if it has a groupIndex specified, specify it
        fixtureDef.filter.groupIndex = details.groupIndex;
        }
    if (details.categoryBits){//if it has a categoryBit specified, specify it
        fixtureDef.filter.categoryBits = details.categoryBits;
        }
    
    for(var l in fixtureDefaults) {
        fixtureDef[l] = details[l] || fixtureDefaults[l];
    }
    
    //Add in an image if necessary
    details.imgPath=details.imgPath||"";
    if (details.imgPath!=undefined){
        details.image=returnImage(details.imgPath);
    }
    
    details.shape = details.shape || defaults.shape;
    
    //Get the angle to rotate the fixture
    details.angle=details.angle||0;
    switch(details.shape) {
    case "circle":
        details.radius = details.radius || defaults.radius;
        fixtureDef.shape =new b2CircleShape(details.radius);
        	
        break;
    case "polygon":
        fixtureDef.shape = new b2PolygonShape();
        var verticesArray=turnPointsToVectors(details.points);
        fixtureDef.shape.Set(verticesArray,verticesArray.length);
        break;
    case "block":
    default:
        details.width = details.width || defaults.width;
        details.height = details.height || defaults.height;
        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(details.width/2,
        details.height/2,details.offSet,details.angle);//add in the offset
        break;
    }
    fixtureDef.userData = details;
    return fixtureDef;
}


//Among other things, stores application information in the wrapper so that we can access it later
function createDefinition(details,wrapper){
    var definition = new b2BodyDef();
    // Set up the definition
    for(var k in definitionDefaults) {
        definition[k] = details[k] || definitionDefaults[k];
    }

    definition.position = new b2Vec2(details.x || 0, details.y || 0);
    definition.linearVelocity = new b2Vec2(details.vx || 0, details.vy || 0);
    definition.userData = wrapper;
    definition.type = details.type == "static" ? b2Body.b2_staticBody :
    b2Body.b2_dynamicBody;
    return definition;
}
    defaults = {
        shape: "block",
        width: 4,
        height: 4,
        radius: 1,
    };

    fixtureDefaults = {
        density: 2,
        friction: 1,
        restitution: 0.01,
        offSet: new b2Vec2(0,0) //Add in an offset. This is the offset of the fixture.
    };

    definitionDefaults = {
        active: true,
        allowSleep: true,
        angle: 0,
        angularVelocity: 0,
        awake: true,
        bullet: false,
        fixedRotation: false,
        linearDampening:0,
    };

 bodyWrapDefaults = {
        lastX: 0,
        lastY: 0,
        danger: 1,//the coefficient of danger, more dangerous things have more danger
        classID: 1,//to determine whether an object can add to the danger or not;
    };


//Creates the initial bodywrapper for a given body. The bodywrapper stores custom information about the object. You call draw off of the bodywrapper
function bodyWrapper(details) {
    //these are things you can use to change the actual object
    
    for (var k in bodyWrapDefaults){
        this[k]=bodyWrapDefaults[k];
    }
    
      for (var k in details){
        this[k]=details[k];
    }
    
    // Create the definition
    this.definition = createDefinition(details,this);//pass in the wrapper, details so we can create the definition. This stores "THIS" as the userdata, so we can access these things later
    
    // Create the Body
    this.body = world.CreateBody(this.definition);
    
    //add details to fixtureDef
    addFixtureToBody(createFixtureDef(details),this.body);
    
};



//Adds a fixture to the body. Returns the fixture.
function addFixtureToBody(fixture,body){
    return body.CreateFixture(fixture);
}
