var listener = new b2ContactListener;

listener.BeginContact = function(contact) {
    var fixtureA=contact.GetFixtureA();
    var fixtureB=contact.GetFixtureB();
    
    bodyA=fixtureA.GetBody();
    bodyB=fixtureB.GetBody();
    var fixADesc=fixtureA.GetUserData().desc;
    var fixBDesc=fixtureB.GetUserData().desc;
    if (fixADesc=='undefined') return;
    if (fixBDesc=='undefined') return;    
    
    //wall
    if (globalProps.boughtPotion){
        hornFix=contactBetweenFixDesc("horn",fixADesc,fixBDesc);
        wallFix=contactBetweenFixDesc("wallDynamic",fixADesc,fixBDesc);
        if (hornFix&&wallFix ){//it has head and wallDyanmic
            var wallBody;
            switch(wallFix){
                case 1:
                    wallBody=bodyA;
                    break;
                case 2:
                    wallBody=bodyB;
                    break;   
            }
            if (wallBody.GetType()==b2Body.b2_dynamicBody) return;
            wallBody.GetUserData().changeToDynamic=1;
        }
    }
    
    //bloob
     bloobFix=contactBetweenFixDesc("bloob",fixADesc,fixBDesc);
     if(inArray(fixADesc,giraffeParts)||inArray(fixBDesc,giraffeParts)){
         hasGiraffe=1;
     }
     else{
         hasGiraffe=0;
     }
    if(bloobFix&&hasGiraffe){
        switch(bloobFix){
            case 1:
                bloobBody=bodyA;
                break;
            case 2:
                bloobBody=bodyB;
                break;   
            }
         bloobBody.parent.timesCollided+=1;
    }
    
    
    
 

};

//Determines if a contact contains a fixture
function contactBetweenFixDesc(targetDesc,fixADesc,fixBDesc){
        if (fixADesc==targetDesc) return 1;
        if (fixBDesc==targetDesc) return 2;
        return 0;
}