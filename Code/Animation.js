function getNextIndex(index,array){
	index+=1;
	if (index>=array.length){
		index=0;
	}
	return index;
};

function getImageFromArray(index,array){
	
	return returnImage(array[index]);
	};

function returnImage(imagePath){//takes in a path, spits out a new image
		picture = new Image();
		picture.src = imagePath;
		return picture;
		
}