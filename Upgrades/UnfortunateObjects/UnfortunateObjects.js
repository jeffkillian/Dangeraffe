function addUnfortunateObject(){
    if (dangerIsHighEnough(upgUnfortunateObjectProps)){
        spendDangerUnits(upgUnfortunateObjectProps.cost);
    var objectsArray=[
    CanOfBeans,
    WeightPlate,
    Brick,
    Nokia
    ];
    var randomIndex = getRandomInt(0,objectsArray.length);
    //Get the definition of the object
    var randomObject = new objectsArray[randomIndex]();
    print(randomObject);
    //set x and y
    var point=getPointOnVisibleCanvas();
    randomObject.randomObjectProps.x=point.x;
    randomObject.randomObjectProps.y=point.y;
    //actually create the object
    this.randomObject = createABody(randomObject.randomObjectProps,this);
    }

};


//UNFORTUNATE OBJECTS
upgUnfortunateObjectProps = {
    ID:3,
    title:"Unfortunate Object",
    description:"But sadly not as unfortunate as we'd hoped",
    imgPath:"Images/unfortunateObject.png" 
};
upgUnfortunateObjectProps.buttonFunction=function(){addUnfortunateObject();};
//Need to: Add in these two scripts to the drag.html
//Add in this as an upgrade
//add one more number to the upgrades list