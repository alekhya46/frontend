//program to get the dimensions of an image

const img = new Image();

// get the image
img.src = '//cdn.programiz.com/sites/tutorial2program/files/cover-artwork.png';

// get height and width
img.onload = function() {
  console.log('width ' + this.width)
  console.log('height '+ this.height);
}


// In the above program, new Image() constructor is used to create an image object.

// The Image() constructor creates a new image element instance.

// img.src is then used to add the image using an image URL source.

// The img.onload() function is used to access the height and width of the image.