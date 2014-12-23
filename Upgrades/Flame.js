function Flame(rocket){
	
	var	flameProps={
			desc: "flame", 
			width:1, 
			height:1,
			imgPath:"Images/rocketFire.png",
			density:1,
			classID:1,
			maskBits:0x0004,
			canTrash:1,
			offSet:new b2Vec2(0,2.6)
		};
	
//	var currAngle=rocketBottom.GetAngle();
//	flameProps.angle=currAngle;
//	currAngle=currAngle+Math.PI/2;
//	currAngle=currAngle%(2*Math.PI);//get it from 0-2PI
//	var cos=Math.cos(currAngle);
//	var sin = Math.sin(currAngle);
//	sin=-sin;//because y coordinates are reversed
//	var flameX=rocketBottom.GetPosition().x+cos*.9;
//	var flameY=rocketBottom.GetPosition().y-sin*.9;
//	flameProps.x=flameX;//update flameprops to where it should be
//	flameProps.y=flameY;
	

	var flameFixDef= createFixtureDef(flameProps);
	
	return addFixtureToBody(flameFixDef,rocket.rocket);
	
	
	
	//this.flame = createABody(flameProps,parent);
}
