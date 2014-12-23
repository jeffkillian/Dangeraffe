function createOneDOMObject() {
            //iterate all div elements and create them in the Box2D system
            $("#gameTitle").each(function (a,b) {
                var domObj = $(b);
                var domPos = $(b).position();
                var width = domObj.width() / 2 ;
                var height = domObj.height() / 2;
                
                var x = (domPos.left) + width;
                var y = (domPos.top) + height;
                var body = createBox(x,y,width,height,0);
                body.m_userData = {domObj:domObj, width:width, height:height,desctwo:"moveable"};
                
                //Reset DOM object position for use with CSS3 positioning
                domObj.css({'left':'0px', 'top':'0px'});
                
                
            }
            );
}










function createDOMObjects() {
            //iterate all div elements and create them in the Box2D system
            $("#gameTitle").each(function (a,b) {
                var domObj = $(b);
                var domPos = $(b).position();
                var width = domObj.width() / 2 ;
                var height = domObj.height() / 2;
                
                var x = (domPos.left) + width;
                var y = (domPos.top) + height;
                var body = createBox(x,y,width,height,0);
                body.m_userData = {domObj:domObj, width:width, height:height,desctwo:"moveable"};
                
                //Reset DOM object position for use with CSS3 positioning
                domObj.css({'left':'0px', 'top':'0px'});
                
            });
}
        
function createBox(x,y,width,height,isStatic) {
            var bodyDef = new b2BodyDef;
            bodyDef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
            bodyDef.position.x = x / SCALE;
            bodyDef.position.y = y / SCALE;
    
            var fixDef = new b2FixtureDef;
            fixDef.density = 1.5;
            fixDef.friction = 0.3;
            fixDef.restitution = 0.4;
    
            fixDef.shape = new b2PolygonShape;
            fixDef.shape.SetAsBox(width / SCALE, height / SCALE);
            return world.CreateBody(bodyDef).CreateFixture(fixDef);
}

//Animate DOM objects

function drawDOMObjects() {
    var D2R = Math.PI / 180;

        // Multiply to convert radians to degrees.
    var R2D = 180 / Math.PI;

        // 360 degrees in radians.
    var PI2 = Math.PI * 2;
    var i = 0;
    for (var b = world.m_bodyList; b; b = b.m_next) {
         for (var f = b.m_fixtureList; f; f = f.m_next) {
                if (f.m_userData) {
                   // var bodyWrap = b.GetUserData(); 
                   // if (bodyWrap.desc=='moveable'){
                       f.m_userData.desctwo=f.m_userData.desctwo||"nothing";
                       if (f.m_userData.desctwo=="moveable"){
                        //Retrieve positions and rotations from the Box2d world
                        var x = Math.floor(((f.m_body.m_xf.position.x-canvasXAdjust) * SCALE) - f.m_userData.width);
                        var y = Math.floor(((f.m_body.m_xf.position.y-canvasYAdjust) * SCALE) - f.m_userData.height);
    
                        //CSS3 transform does not like negative values or infitate decimals
                        var r = Math.round(((f.m_body.m_sweep.a + PI2) % PI2) * R2D * 100) / 100;
    
                        var css = {'-webkit-transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)', '-moz-transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)', '-ms-transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)'  , '-o-transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)', 'transform':'translate(' + x + 'px,' + y + 'px) rotate(' + r  + 'deg)'};
    
                        f.m_userData.domObj.css(css);
                    }
                }
         }
      }
};
