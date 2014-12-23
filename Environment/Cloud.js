function Cloud(){
    var cloudArray=[];
    this.images=[
        'Images/cloud1.png',
        'Images/cloud2.png',
        'Images/cloud3.png',
        'Images/cloud4.png',
        'Images/cloud5.png',
    ];
    this.cloud=this.newCloud();
}
Cloud.prototype.newCloud=function(){
    var size=getRandomInt(5,7);
    var index=getRandomInt(0,this.images.length);
    var imagePath=this.images[index]; //At some point verify that this can get both 0 and 4
    this.cloudProps= {
            desc: "cloud", 
            x: getRandomArbitrary(6,30),   
            y: getRandomArbitrary(2,5), 
            height:size,    
            width:size,
            density:1,
            imgPath:imagePath,
            classID:1,
            type:"static",
            maskBits:MASK_DONTCOLLIDE,
            direction:getRandomArbitrary(-1,1)/100
        };
    return createABody(this.cloudProps,this);    
};

