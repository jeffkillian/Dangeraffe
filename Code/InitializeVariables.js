
var dangerFaced=0;
var totalDangerFaced=0;
var dangerousObjects = [2,3,4];
var flame;
var snow;
SCALE=20;
var calcX,calcY;
var showDebugExtras=0;
var world;
var counter=0;

//GRAVITY VALUES_____________________________
var GRAVVALUE=30;
//###################################

//must be set in properties first before main
var canvas = document.getElementById("b2dCanvas");

//used by the mouse coordinateszz and by the div physics
var canvasXAdjust=-.4;
var canvasYAdjust=-2.55;
var objectsToDestroy=[];//list of objects that need to be iterated through to delete/add their corresponding bodies to body list
var destroyBodyList=[];
var rocketsAreMoving=0;
var rocketCount=0;
var gravity = new b2Vec2(0,GRAVVALUE);

var DEGTORAD=.0174532925;
var PI=Math.PI;
//default collide is 001

//Default maskbit is 0xFFFF, which means it will collide with everything. To make it collide with everything except 4 you set maskbit to 0xFFFF^ 0x0004
var GROUP_GIRAFFE=-1;
var MASK_DONTCOLLIDE=0x8000;//Scenery only collides with 8000. Which does not exist. So it won't collide with anything.
var CATEGORY_WALL= 0x0002;//All walls are x0002
var MASK_WATER=0xFFFF^ 0x0002; //this will collide with everything except walls and environment

globalProps = {
    boughtHelmet:0,
    appleCount:0,
    allowRocket:0,
    };
//the initial properties of the objects.

//They exist so it is easy to create
var shiftToRight=5.5;
var leftHiddenWidth=5;
var leftHiddenHeight=canvas.height/SCALE;
var minObjectSpawnX=leftHiddenWidth;


//set up boundaries so we can know when things are off the visible canvas
var rightBoundPos=45;
var topBoundPos=0;
var leftBoundPos=leftHiddenWidth;
//bottom is set below


var bottomHiddenPropsWidth=canvas.width/SCALE-leftHiddenWidth;



bottomHiddenProps = {
        desc: "bottomHidden", 
        width:bottomHiddenPropsWidth,
        height:10,
        x:bottomHiddenPropsWidth/2+leftHiddenWidth,
        y:30,
        imgPath:"Images/bottomBackground.png" ,
        type: "static"
        //categoryBits:CATEGORY_WALL
    };

var bottomBoundPos=bottomHiddenProps.y-bottomHiddenProps.height/2;
var visibleCanvasCenter={x:(rightBoundPos+leftBoundPos)/2,y:(topBoundPos+bottomBoundPos)/2};

backgroundSkyProps = {
        desc: "backgroundSky", 
        width:50, 
        height:30,
        density:1,
        x:25+leftHiddenWidth,
        y:10,
        imgPath:"Images/backgroundsky.jpg" ,
        type: "static",
        maskBits:MASK_DONTCOLLIDE
    };
grassFrontProps = {
        desc: "grassFront", 
        width:50, 
        height:.75,
        density:1,
        x:25+leftHiddenWidth,
        y:24.625,
        imgPath:"Images/grassFront.png" ,
        type: "static",
        maskBits:MASK_DONTCOLLIDE
    };
grassBackProps = {
        desc: "grassBack", 
        width:50, 
        height:.75,
        density:1,
        x:25+leftHiddenWidth,
        y:24.625,
        imgPath:"Images/grassBack.png" ,
        type: "static",
        maskBits:MASK_DONTCOLLIDE
    };




