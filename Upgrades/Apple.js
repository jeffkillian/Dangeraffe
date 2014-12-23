function Apple(){
	
	var appleProps = {
			desc: "apple",
			
			width:1, 
			height:1,
			density:1,
			imgPath:"Images/apple.png" ,
			classID:2,
			canTrash:1,
		};
	var point=getPointOnVisibleCanvas();
	appleProps.x=point.x;
	appleProps.y=point.y;
	this.apple = createABody(appleProps,this);
	this.eatenStage = 0;
};



Apple.prototype.update=function(){
	if (!giraffe.canEat){return;}//if we can't eat, don't do anything
	//if the apple is too close to the giraffes mouth
	var appleBody=this.apple;
	var applePoint=new Point(appleBody.GetPosition().x,appleBody.GetPosition().y);
	if (Point.distance(applePoint,giraffe.getMouthPosition())<1.5){
		giraffe.canEat=0;
		switch(this.eatenStage){
			case 0:
				appleBody.GetUserData().image = returnImage("Images/apple2.png");
				break;
			case 1:
				appleBody.GetUserData().image = returnImage("Images/apple3.png");
				break;
			case 2:
				destroyBodyList.push(this.apple);
				break;
			}
		this.eatenStage+=1;
		increaseDangerFaced(2);//2 each time you eat an apple
		giraffe.eatApple();//add the eating animation to the giraffe]
		window.setTimeout(function(){
			giraffe.canEat=1;
			},300);//eat in 1/10 of a second
		
	}
};


//####################APPLE UPGRADE##############################
//APPLE
upgAppleProps = {
        ID:0,
		title:"Apple",
		description:"The preferred fruit among giraffes, nationwide",
		imgPath:"Images/apple.png" 
	};
upgAppleProps.buttonFunction = function(){addApple();};//adds the function that happens when we click the button, if anything


function addApple(){
	if (dangerIsHighEnough(upgAppleProps)){
		spendDangerUnits(upgAppleProps.cost);
		apple = new Apple();
	}
};