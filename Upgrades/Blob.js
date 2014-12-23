

function Blob(){
    var center=new b2Vec2(20,20);
    var frequency=0;
    var damping=.5;
    var centerBodyProps={
        x:center.x,
        y:center.y,
        desc:"bloobCenter",
        type:"dynamic",
        shape:"circle",
        color:"blue",
        radius:.4
    };
    var centerBody=createABody(centerBodyProps,this);
    var firstBody="";
    
    //Create outer points
    var numPoints=16;
    var radius=3;
    var theta=2*PI/numPoints;
    prevBody="";
    for (var i=0;i<numPoints;i++){
        angle=theta*i;
        var x=center.x+Math.cos(angle)*radius;
        var y=center.y+Math.sin(angle)*radius;
        var BlobPointProps={
            x:x,
            y:y,
            desc:"Bloobpoint",
            type:"dynamic",
            shape:"circle",
            color:"red",
            radius:.2
        };
        thisBody=createABody(BlobPointProps,this);
        if (i==0){//If first body, store it for last
            firstBody=thisBody;
        }
        
        //connect to center
        var distanceJoint = new b2DistanceJointDef();
        distanceJoint.frequencyHz=10;
        distanceJoint.dampingRatio=.5;
        distanceJoint.Initialize(centerBody, thisBody, centerBody.GetPosition(),thisBody.GetPosition());
        world.CreateJoint(distanceJoint);   
    
        
        
        if (prevBody){//If there is a last body
            var distanceJoint = new b2DistanceJointDef();
            distanceJoint.frequencyHz=0;
            distanceJoint.dampingRatio=1;
            distanceJoint.Initialize(thisBody, prevBody, thisBody.GetPosition(), prevBody.GetPosition());
            world.CreateJoint(distanceJoint);   
        }
        prevBody=thisBody;
        
    }
    //create joint between first and last
    var distanceJoint = new b2DistanceJointDef();
    distanceJoint.Initialize(firstBody, thisBody, firstBody.GetPosition(), thisBody.GetPosition());
    world.CreateJoint(distanceJoint);   
    return 1;
}
