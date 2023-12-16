// Define a custom forEach method
Array.prototype.customForEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };
  
  // Example usage
  const myArray = [1, 2, 3, 4, 5];
  
  myArray.customForEach((element, index, array) => {
    console.log(`Element at index ${index}: ${element}`);
  });
  