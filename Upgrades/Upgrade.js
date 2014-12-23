function Upgrade(upgradeProperties){
	this.ID=upgradeProperties.ID;
	this.div = "#upgDiv"+this.ID;
	this.enableAtLevel=upgradeProperties.enableAtLevel;
	this.title=upgradeProperties.title;
	this.description = upgradeProperties.description;
	this.buttonFunction=upgradeProperties.buttonFunction;
	this.cost=upgradeProperties.cost;
	this.preFunction = upgradeProperties.preFunction;
	this.isPurchasable=0;
	this.upgradeType=upgradeProperties.upgradeType||"";
    this.imgPath = upgradeProperties.imgPath;
    this.isRevealed=0;
    this.purchaseOnce=upgradeProperties.purchaseOnce||0;
}
var divCounter=0;

//Gets the next upgrade div number
function getDivValue(){
	divCounter+=1;
	return divCounter;
	}
	

	
//Adds it as a box
Upgrade.prototype.makeLive=function(){
    this.isRevealed=1;//This is now visible as an icon.
    this.addHoverProperty();//adds the hover property to the div which allows you to see the description in the upgrade description div
    this.allowPurchase();
    $(this.div).html(getUpgradeImageHTML(this.imgPath));
    
    var currUpgrade=this;
	if (!('undefined' === typeof this.preFunction)) {
		this.preFunction();//runs when the upgrade is enabled, sets variables to make things go smoothyl
    }
    
  
    if (this.buttonFunction!=""){//if there's a button, make it a function
        if(this.purchaseOnce){
            $(this.div).click(this.handlePurchaseOnce(currUpgrade));//do handle purchase once
        }
        else{
            $(this.div).click(this.buttonFunction);
        }
        
    };           

	//adds the text to the textbox
    printText("New Upgrade "+this.title+" is now available","gameTextUpgrade");

};


//changes the button function
Upgrade.prototype.handlePurchaseOnce=function(thisUpgrade){
	
	
	var eventualFunction=function(){
	    if (!thisUpgrade.isPurchasable) return;
	    thisUpgrade.purchasedOnce=1;//This is technically set every time, but that's not really a problem.
	     thisUpgrade.buttonFunction();
	     //thisUpgrade.buttonFunction();
	    toggleSinglePurchaseDivBorder(thisUpgrade.div);
	};

	
	return eventualFunction;
};


function getUpgradeImageHTML(imgPath){
    return '<img src="'+imgPath+'" class="upgradeIcon">';//add the image in the first panel
}

Upgrade.prototype.disallowPurchase=function(){
	$(this.div).fadeTo(0, .33 );
	$(this.div).removeClass("upgradeIsPurchasable");
	$(this.div).addClass("unknownUpgrade");
	this.isPurchasable=!this.isPurchasable;
};
Upgrade.prototype.allowPurchase=function(){
	$(this.div).fadeTo(0, 1 );
	$(this.div).removeClass("unknownUpgrade");
    $(this.div).addClass("upgradeIsPurchasable");
	this.isPurchasable=!this.isPurchasable;
};




Upgrade.prototype.addHoverProperty=function(){
    
    var upgradeHTML = this.getUpgradeDivHTML();
    $(this.div).hover(function(){
        $("#upgradeDescription").show();
        $("#upgradeDescription").html(upgradeHTML);
        },function(){
        $("#upgradeDescription").html("");
        $("#upgradeDescription").hide();
    });
    
};
    
Upgrade.prototype.getUpgradeDivHTML=function(){
    
    
    var divContents= getUpgradeImageHTML(this.imgPath);//add the image in the first panel

    divContents+="<div class=\"upgCost\">(-"+this.cost+")</div>";//add in the upgrade cost below
    var htmlContents=divContents+this.title;
    htmlContents+="<div class=\"upgDescription\">"+this.description+"</div>"
    return htmlContents;
};

function toggleSinglePurchaseDivBorder(fullDivName){
    //name should be of the form '#upgDiv'+this.ID
    if ($(fullDivName).hasClass('singlePurchaseIsActive')){
        $(fullDivName).removeClass("singlePurchaseIsActive");
        return;
    };
    
    $(fullDivName).addClass("singlePurchaseIsActive");
};







/*
 * Goes through the upgrade list, and enables or disables them in the button menu
 */
function updateUpgrades(){//update each upgrade
	for(var index in upgradeList) {
		var upgrade = upgradeList[index];
		//first check if it is even showing
		if (!upgrade.isRevealed){
			if (dangerFaced>upgrade.enableAtLevel){//if we should be visible
				upgrade.makeLive(); //enable the upgrade!
			}
		}else{//it is visible, we now check if it is greyed out
		    if ((!upgrade.isPurchasable)&&dangerFaced>upgrade.cost){//if we can show it
                upgrade.allowPurchase(); //enable the upgrade!
            
            }
		    if (upgrade.purchaseOnce&&upgrade.purchasedOnce){continue;};
			if (upgrade.isPurchasable&&(dangerFaced<upgrade.cost)){//if enabled but we don't have enough
                upgrade.disallowPurchase();
			}
			
		}
	}
}


