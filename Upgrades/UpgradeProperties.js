//Contains various upgrades and their properties. 
//Contains functions related to upgrades.

function dangerIsHighEnough(itemProperties){
	return (dangerFaced>itemProperties.cost);
};

var highestUpgradeNumEnabled=0;



function intitalizeUpgradeList(){
    var costList=[1,2,3,4,5,6,7,8,9,10,11];
    //var costList=[1,10,20,50,60,100,150,175,200];
    var tempList=[];
    var listOfUpgradeProperties = [
        upgAppleProps,
        upgBeachBallProps,
        upgRocketProps,
        upgUnfortunateObjectProps,
        upgHornProps,
        upgWaterSpoutProps,
        upgMagicSprinklesProps,
        upgHelmetProps,
        upgPotionProps,
        upgSnowProps
        
        ];

    for (i = 0; i < listOfUpgradeProperties.length; i++) { 
        var upgradeProps = listOfUpgradeProperties[i];
        upgradeProps.cost=costList[i];
        //upgradeProps.ID=i;
        upgradeProps.enableAtLevel=costList[i];
        var upgrade = new Upgrade(upgradeProps);
        tempList.push(upgrade);
    }
    return tempList;
}

//Apple - 0
//BeachBall - 1
//Rocket-2
//UnfortunateObjects - 3
//Horn-4
//WaterSpout - 5
//MagicSPrinkles - 6
//helmet - 7
//Potion-8
//Snowfall - 9