function MultiFixture(){
    
    
    var object1Props={ 
        color: "green", 
        type: "dynamic", 
        desc: "debugPoint2",
        x:25, 
        y:10, 
        height:1,
        width:2,
    };
    
    //first create the initial body
    
    
    
    
    //add details to fixtureDef
    //var fixtureDef=createFixtureDef(object1Props);
    //body.CreateFixture(fixtureDef);
    
    var object2Props={ 
        color: "yellow", 
        type: "dynamic", 
        desc: "debugPoint23",
        height:5,
        width:2,
        offSet:new b2Vec2(4,3),
        angle:PI/3
    };
    
//    squareWrapper= new bodyWrapper(object1Props);
//    var newFix=createFixtureDef(object2Props);
    //addFixtureToBody(newFix,squareWrapper); this should take in a body instead of squarewrapper if you comment this in

};
