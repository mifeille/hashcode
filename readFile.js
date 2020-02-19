const fs = require("fs");

// const myFiles = [
//   `a_example.in`,
//   `b_small.in`,
//   `c_medium.in`,
//   `d_quite_big.in`,
//   `e_also_big.in`
// ];
// for (i = 0; i < myFiles.length; i++){
    // console.log(myFiles[i]);


const data = fs
  .readFileSync(`d_quite_big.in`, "utf8")
  .toLocaleString()
  .split(",")[0]
  .split("\n");
const slices = parseInt(data[0].split(" ")[0].trim(), 10);
const pizzaTypes = data[1].split(" ").map(item => parseInt(item, 10));

let merged;
let sum = 0;
let myArray=[];
let inArray = [];
let arrayIndexes = [];
let arraySum;
let arraySum1;
let slicesWeHave;
let remainingSlices;
let index;
let arrayOfDiff = [];
let indexx;

function checkIndex(array, pizzas){
    for (i = 0; i < array.length; i++) {
        indexx = pizzas.indexOf(array[i]);
        for (y = 0; y < arrayIndexes.length; y++){
            if (arrayIndexes[y] == indexx) {
            indexx = indexx + 1;
            }

        }
        arrayIndexes.push(indexx);
        }
}
function typeOfPizzas(mySlices, myPizzas){
    const firstPizza = myPizzas[0];
    const lastPizza = myPizzas[myPizzas.length-1]
    if (firstPizza + lastPizza == mySlices || firstPizza + lastPizza == mySlices - 1) {
        myArray.push(firstPizza);
        myArray.push(lastPizza);
        arrayIndexes.push(0);
        arrayIndexes.push(myPizzas.length-1);
        console.log('length ' + myArray.length);
        console.log('Indexes ' +arrayIndexes);
        return firstPizza + lastPizza;
    }
    else{
        
        const difference = mySlices - (firstPizza + lastPizza);
        for (i = myPizzas.length - 2; i >= 0; i--){
            sum = sum + myPizzas[i];
            if(sum < difference){
                myArray.push(myPizzas[i]);
                arraySum = myArray.reduce(function(a, b){
                    return a + b;
                }, 0);
                slicesWeHave = arraySum + firstPizza + lastPizza;

            }
        }
        remainingSlices = slices - slicesWeHave;
        if (remainingSlices > 1) {
        index = myPizzas.indexOf(myArray[myArray.length - 1]);
        for( i = index-1; i >0; i--){
            if(myPizzas[i] == remainingSlices || myPizzas[i] == remainingSlices-1 ){

                myArray.push(myPizzas[i]);
                remainingSlices = remainingSlices - myPizzas[i];
                arraySum = myArray.reduce(function(a, b) {
                    return a + b;
                }, 0);
                slicesWeHave =
                    arraySum + firstPizza + lastPizza;
            }
            }
            if (
            myPizzas[i] != remainingSlices ||
            myPizzas[i] != remainingSlices - 1
            ) {
            for (i = index - 1; i > 0; i--) {

                while (remainingSlices > myPizzas[i]) {
                arrayOfDiff.push(myPizzas[i]);
                arraySum1 = arrayOfDiff.reduce(function(a, b) {
                    return a + b;
                }, 0);
                arraySum = arraySum + arraySum1;
                slicesWeHave = slicesWeHave + myPizzas[i];
                remainingSlices = remainingSlices - myPizzas[i];
                }
            }
            }
    }

    inArray.push(firstPizza);
    inArray.push(myArray);
    inArray.push(lastPizza);
    merged = [].concat.apply([], inArray);
    arrayIndexes.push(checkIndex(merged, myPizzas));
    console.log("length: " + merged.length);
    console.log("indexes: " + arrayIndexes);
    }

    return slicesWeHave;
// }

}
console.log(typeOfPizzas(slices, pizzaTypes));
