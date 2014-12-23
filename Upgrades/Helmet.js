function Helmet(){
	var helmetProps = {
			desc: "helmet", 
			groupIndex:GROUP_GIRAFFE,
			friction:0.1,
			width:3, 
			height:3,
			density:1,
			imgPath:"Images/helmet.png",
			classID:1,
			offset:new b2Vec2(0,0)
	};
	
	//helmetProps.x=giraffe.head.GetPosition().x;
	//helmetProps.y=giraffe.head.GetPosition().y;
	//helmetProps.angle = giraffe.head.GetAngle();
	//var helmet = createABody(helmetProps,this);
    
    //var helmetJoint = addWeldJoint(giraffe.head, helmet, giraffe.head.GetPosition());

	giraffe.canEat=0;
	
	
	var helmetFixDef=createFixtureDef(helmetProps);
    giraffe.helmet=addFixtureToBody(helmetFixDef,giraffe.head);
}






upgHelmetProps = {
    ID:7,
		imgPath:"Images/helmet.png",
		title:'Space Helmet',
		description:"Spaaaccceeee",
		buttonFunction:"",
		purchaseOnce:1
};
upgHelmetProps.buttonFunction=function(){handleHelmet();};
//HELMET

function handleHelmet(){
	if (globalProps.boughtHelmet){
		giraffe.putOnGiraffe("helmet");
		return;//quit out here. no need to keep going
	}
	if (dangerIsHighEnough(upgHelmetProps)){//need to track helmetBought variable in a new helmet class. if so, then we don't ever disable this.
		spendDangerUnits(upgHelmetProps.cost);
		globalProps.boughtHelmet=1;
		giraffe.putOnGiraffe("helmet");
	}
}


