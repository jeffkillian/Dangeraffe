
//Arrays used for drawing
regularBodies=[];
rainbowParticleBodies=[];
potionParticleBodies=[];
tailBodies=[];
giraffeBodies=[];
giraffeAdornmentBodies=[];
wallPieceBodies=[];
environmentBodies=[];
allBodiesToDraw=[];
debugPointsBodies=[];
bodiesToGoDynamic=[];

//These are bodies that are included in an array, and are drawn later
bodyArrayMapping={
    'rainbowParticle':rainbowParticleBodies,
    'potionParticle':potionParticleBodies,
    'tailEnd':tailBodies,
    'tailPiece':tailBodies,
    'wallDynamic':wallPieceBodies,
    'wallStatic':wallPieceBodies,
    'debugPoint':debugPointsBodies
    
};


//These are bodies that have an update function
bodiesWithParentUpdate=[
    'apple',
    'beachBall',
    'shim',
    'potion',
    "potionParticle",
    'rocket',
    'rainbowParticle',
    'magicSprinkle',
    'waterDrop',
    'fireParticle',
    'snowFlake',
    'snowFall',
    'trashHand',
    'bloob'
];


//things that appear with the giraffe. 
giraffeAdornments=[
     "helmet",
     'horn',
     'fireball'
];


//giraffe parts - Used to determine if we are clicking on the giraffe
giraffeParts=[
        'leg1',
        'leg2',
        'leg3',
        'leg4',  
        'neckLow',
        'neckHigh',
        'head',
        'torso',

];


function addArrayElementsToBodyArrayMapping(inputArray,bodyArrayToMapTo){
    for (var i=0;i<inputArray.length;i++){
        bodyArrayMapping[inputArray[i]]=bodyArrayToMapTo;
    }
    
}

addArrayElementsToBodyArrayMapping(giraffeAdornments,giraffeAdornmentBodies);
//addArrayElementsToBodyArrayMapping(giraffeParts,giraffeBodies);

bodiesExplicitlyDrawn=[

//Giraffe Parts
                
//Environment stuff
				'cloud',
                'backgroundSky',
                'grassBack',
                'grassFront',
                'bottomHidden',
                'moveable'];
                
bodiesExplicitlyDrawn=bodiesExplicitlyDrawn.concat(giraffeParts);
