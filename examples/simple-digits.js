/*
 * In this example we're going to train
 * the network to recognise simplified numbers
 * represented as an array of 15 zeros or ones
 *
 * This is how number one looks like:
 * 0 0 1
 * 0 0 1
 * 0 0 1
 * 0 0 1
 * 0 0 1
 *
 * And this is five:
 * 1 1 1
 * 1 0 0
 * 1 1 1
 * 0 0 1
 * 1 1 1
 *
 * The rest of the numbers is placed further down.
 *
 */

"use strict";

const NeuralNetwork = require("../index.js");


/*
 * We create a network with fifteen inputs,
 * fifteen neurons in the hidden layer (feel free to play with the amount of hidden neurons)
 * and ten output neurons.
 *
 * The output of the form [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] means number zero and so on.
 * We could also use a binary representation of the numbers 0-9 as the output.
 */
let NN = NeuralNetwork(15, 15, 10, 0.8);


/*
 * We took the 5x3 representation of each number and
 * made it into an array of fifteen ones or zeros.
 *
 */
let inputs = [
  { input: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], expected: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { input: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], expected: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
  { input: [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], expected: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
  { input: [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], expected: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
  { input: [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], expected: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
  { input: [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], expected: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
  { input: [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], expected: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
  { input: [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], expected: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
  { input: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], expected: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
  { input: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], expected: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] }
];


/*
 * Let's train the network on 10000 * 10 examples.
 *
 */
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < inputs.length; j++) {
    NN.train(inputs[j]);
  }
}


/*
 * This function will give us the index of the maximum value
 * in the ouput vector. We will consider the index to be the answer.
 *
 */
function maxIndex(arr) {
  let max = arr[0];
  let index = 0;

  arr.forEach((c, i) => {
    if (c > max) {
      max = c;
      index = i;
    }
  });
  return index;
}

/*
 * Let's see how well the network was able to learn.
 * You'll see someting like this:
 *
 * Testing the neural network...
 * Test number: 0 | NN result: 0
 * Test number: 1 | NN result: 1
 * Test number: 2 | NN result: 2
 * Test number: 3 | NN result: 3
 * Test number: 4 | NN result: 4
 * Test number: 5 | NN result: 5
 * Test number: 6 | NN result: 6
 * Test number: 7 | NN result: 7
 * Test number: 8 | NN result: 8
 * Test number: 9 | NN result: 9
 *
 */
console.log("Testing the neural network...");
for(let i = 0; i < 10; i++) {
  let result = NN.test(inputs[i].input);
  console.log("Test number: " + i + " | NN result: " +  maxIndex(result));
}


/*
 * Optionally we can save the weights
 * so that the progress we made is not lost.
 */
NN.save("saved/simple-digits.json", (err) => {
  if(err) {
    console.error(err);
  } else {
    console.log("saved successfully");
  }
});


/*
 * Here is the rest of the simplified numbers.
 *
0 0 0
0 0 0
0 0 0
0 0 0
0 0 0

0 0 1
0 0 1
0 0 1
0 0 1
0 0 1

1 1 1
0 0 1
1 1 1
1 0 0
1 1 1

1 1 1
0 0 1
1 1 1
0 0 1
1 1 1

1 0 1
1 0 1
1 1 1
0 0 1
0 0 1

1 1 1
1 0 0
1 1 1
0 0 1
1 1 1

1 1 1
1 0 0
1 1 1
1 0 1
1 1 1

1 1 1
0 0 1
0 0 1
0 0 1
0 0 1

1 1 1
1 0 1
1 1 1
1 0 1
1 1 1

1 1 1
1 0 1
1 1 1
0 0 1
1 1 1
*/
