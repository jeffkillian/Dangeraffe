function LeftWall(){
    this.leftWall1= "";
    this.leftWall2= "";
    this.leftWall3= "";
    this.leftWall4= "";
    this.leftWall5= "";
    this.leftWall6= "";
    this.leftWall7= "";
    this.leftWall8= "";
    this.leftWall9= "";
    this.leftWall10= "";
    this.leftWall11= "";
    this.leftWall13= "";
   
    this.dynamicPiece=0;
    //top block
    var type="static";
    var topBlockProps={ color: "white",
                        shape: "polygon", 
                        type:"static",desc:"wallStatic",
                          points: [ { x: 0, y: 0},  { x: 5, y: 0 }, { x: 5, y: 10 },{ x: 0, y: 10 }   ],
                          x: 0, y: 0 };            
           
    //bottom block                      
    var bottomBlockProps={ color: "white", 
                       shape: "polygon", type:"static",desc:"wallStatic",
                       points: [ { x: 0, y: 0},  { x: 5, y: -5 }, { x: 5, y: 12 },{ x: 0, y: 12 }   ],
                          x: 0, y: 23 };
    //bottom block2                      
    var bottomBlock2Props={ color: "white", 
                        shape: "polygon", 
                        type:"static",desc:"wallStatic",
                          points: [ { x: 0, y: 0},  { x: 0, y: -4 }, { x: 4, y: -4 }   ],
                          x: 0, y: 23 };
 //vial cover                    
    var vialCoverProps={ color: "white", shape: "polygon", type:"static",desc:"wallStatic",
                          points: [ { x: 1, y: .75},  { x: 1, y: 1.5 }, { x: 0, y: 3 },{ x: 0, y: 0 }   ],
                          x: 0, y: 15 };
 //above vial cover                    
    var aboveVialCoverProps={ color: "white", shape: "polygon", type:"static",desc:"wallStatic",
                          points: [ { x: 0, y: 0},  { x: 1, y: -1 }, { x: 0, y: 3 }, ],
                          x: 0, y: 13.5 };


  

    var leftWall1Props= { color: "white", shape: "polygon", type:"static",desc:"wallDynamic",bullet:"false",initial:{x: 5, y: 15 },friction:.9,
                          points: [ { x: 0, y: 0},  { x: 0, y: .5}, { x: -.45, y: .5} ],
                          x: 5, y: 15 };
                          
  
 
              
    var leftWall2Props= { color: "white", shape: "polygon", type:"static",desc:"wallDynamic",initial:{x: 5, y: 12 },friction:.9,
                          points: [ { x: 0, y: 0},  
                                    { x: 0, y: 1.6 }, 
                                    {x:-.68,y:2.4},
                                    { x: -1, y: 2},
                                    { x: -.5, y: .25} ],
                          x: 5, y: 12 };
    
       
    var leftWall3Props={ color: "white", shape: "polygon", type:"static",desc:"wallDynamic",initial:{x: 5, y: 11 },friction:.9,
            points: [
                     { x: 0, y: 0},  
                     { x: 0, y: 1 }, 
                     { x: -.8, y: 1.4} ,
                     { x: -1.15, y: 1.15} ],
            x: 5, y: 11 };


    var leftWall4Props= { color: "white", shape: "polygon", type:"static",desc:"wallDynamic",initial:{x: 5, y: 15 },friction:.9,
            points: [ { x: 0, y: 0},          
                      { x: -.6, y: -.65},
                      { x: 0, y: -1.4 }], 
                           //         ,
    		 
                                
                          x: 5, y: 15 };
    
    var leftWall5Props={ color: "white", shape: "polygon", type:"static",desc:"wallDynamic",initial:{x: 3, y: 17 },friction:.9,
                          points: [ { x: 0, y: .25},  { x: 1, y: -3}, { x: 2, y: -2} ],
                          x: 3, y: 17 };
            
    var leftWall6Props={ color: "white", shape: "polygon", type:"static",desc:"wallDynamic",initial:{x: 4.5, y: 12.25 },friction:.9,
                          points: [ { x: 0, y: 0}, 
                                    { x: -.9, y: 3.1}, 
                                    { x: -1.6, y: 1.75},
                                    { x: -1.6, y: 1.2} ],
                          x: 4.5, y: 12.25 };
    
    
    var leftWall7Props={ color: "white", shape: "polygon", type:"static",desc:"wallDynamic",initial:{x: 3, y: 16.75 },friction:.9,
            points: [ { x: .1, y: .2}, 
                      { x: -1, y: .1}, 
                      { x: -.5, y: -1.4},
                      { x: 0, y: -2},
                      { x: .6, y: -1.4} ],
            x: 3, y: 16.75 };
    
    
     var leftWall8Props={ color: "white", shape: "polygon", type:"static",desc:"wallDynamic",initial:{x: 3.8, y: 12.15 },friction:.9,
                          points: [ { x: 0, y: 0},  { x: .4, y: .3}, { x: -3/2, y: 1.7} ],
                          x: 3.8, y: 12.15 };
    
     var leftWall9Props= { color: "white", shape: "polygon", type:type,desc:"wallDynamic",initial:{x: 0, y: 19 },friction:.9,
                          points: [
                                   { x: 0, y: 0},  
                                   { x: 0, y: -1}, 
                                   { x: 2.25/2, y: -4.5/2},
                                   { x: 3.2, y: -2},
                                   { x: 1.5, y: 0}  ],
                          x: 0, y: 19 };
                    
    var leftWall10Props={ color: "white", shape: "polygon", type:"static",desc:"wallStatic",
                          points: [ { x: 0, y: 0},  { x: 1.5, y: 0 }, { x: 1.5, y: 2 },{ x: 0, y: 3.5}   ],
                          x: 0, y: 10 };
               
    var leftWall11Props= { color: "white", shape: "polygon", type:type,desc:"wallStatic",
                          points: [ { x: 0, y: 0},{ x: 3.5, y:0 },{ x: 3.5, y: 1 },{ x: 3, y: 1.5 },{ x: 1.5, y: 3}, { x: 0, y: 1 }  ],
                          x: 1.5, y: 10 };

    var leftWall13Props={ color: "white", shape: "polygon", type:"static",friction:.9,desc:"wallStatic",
                          points: [ { x: 0, y: 0},  { x: 0, y: 2.5}, { x: -1, y: 3.5},{ x: -3.5, y:3.5},{ x: -.5, y:0}  ],
                          x: 5, y: 15.5 };
    
   var leftWallPotionCover={ color: "white", shape: "polygon", type:"static",friction:.9,desc:"wallStatic",
                          points: [ { x: 0, y: 0},  { x: 5, y: 0}, { x: 5, y: 9},{ x: 0, y:9}],
                          x: 0, y: 9 };
           
   
   leftWall1Props.updateFunction=function(){handleWallUpdate(leftWall.leftWall1);};
   leftWall2Props.updateFunction=function(){handleWallUpdate(leftWall.leftWall2);};
   leftWall3Props.updateFunction=function(){handleWallUpdate(leftWall.leftWall3);};
   leftWall4Props.updateFunction=function(){handleWallUpdate(leftWall.leftWall4);};
   leftWall5Props.updateFunction=function(){handleWallUpdate(leftWall.leftWall5);};
   leftWall6Props.updateFunction=function(){handleWallUpdate(leftWall.leftWall6);};
   leftWall7Props.updateFunction=function(){handleWallUpdate(leftWall.leftWall7);};
   leftWall8Props.updateFunction=function(){handleWallUpdate(leftWall.leftWall8);};

    this.topBlock= createABody(topBlockProps,this);  
    this.bottomBlock= createABody(bottomBlockProps,this);  
    this.bottomBlock2= createABody(bottomBlock2Props,this);  
    this.vialCover= createABody(vialCoverProps,this);  
    this.aboveVialCover = createABody(aboveVialCoverProps,this);
    this.leftWallPotionCover = createABody(leftWallPotionCover,this);//Removed once we buy the potion
    
    this.leftWall1= createABody(leftWall1Props,this); //yellow 
    this.leftWall2= createABody(leftWall2Props,this); //red
    this.leftWall3= createABody(leftWall3Props,this);//purple
    this.leftWall4= createABody(leftWall4Props,this); //blue
    this.leftWall5= createABody(leftWall5Props,this); //pink
    this.leftWall6= createABody(leftWall6Props,this); //orange
    this.leftWall7= createABody(leftWall7Props,this); //bottomblue
    this.leftWall8= createABody(leftWall8Props,this);
    this.leftWall9= createABody(leftWall9Props,this);
    this.leftWall10= createABody(leftWall10Props,this);
    this.leftWall11= createABody(leftWall11Props,this);
    this.leftWall13= createABody(leftWall13Props,this);
 
    
};


function handleWallUpdate(wallBody){
    
    //First check if it is dynamic, or should be
    if (wallBody.GetUserData().changeToDynamic){
        wallBody.SetType(b2Body.b2_dynamicBody);//make it dynamic. It now can move
        wallBody.GetUserData().changeToDynamic=0;
    }

    //handle making wall Trashable
    if((!wallBody.GetUserData().canTrash)&&(wallBody.GetPosition().y>20)){
        wallBody.GetUserData().canTrash=1;
    }
}

function handleMakingWallTrashable(wallBody){
    
    
}




