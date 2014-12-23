
//Returns a random Hex color in the form #123456
function getRandomColorHex() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*
 * Returns a random RGB Object
 */
function getRandomColorRGB(){
    return hexToRGB(getRandomColorHex());
};


/*
 * Takes in a hex and returns an object with the values mapped to the r,g,b, respectively.
 */
function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


/*
 * Takes in red, green blue, alpha and returns a rgba including an alpha!
 */
function RGB2Color(r,g,b,alpha){
    return 'rgba(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ','+alpha+')';
}


/*
 * Creates a gradient, which you can assign as color
 */
function getGradient(gradientRadius,r,g,b,opacity){
    var gradient = context.createRadialGradient(0, 0, 0, 0, 0, gradientRadius);
    gradient.addColorStop(0, "rgba("+r+", "+g+", "+b+", "+opacity+")");
    gradient.addColorStop(0.5, "rgba("+r+", "+g+", "+b+", "+opacity+")");
    gradient.addColorStop(1, "rgba("+r+", "+g+", "+b+", 0)");
    return gradient;
}