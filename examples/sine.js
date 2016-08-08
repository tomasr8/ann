/*
 * This example demonstrates how we can train
 * the network to calculate the values of the sine function.
 */

"use strict";

const { Random } = require("../utils.js");
const NeuralNetwork = require("../3layer.js");


/*
 * We create a network with one input neuron (the sine functions takes one number as input),
 * twenty neurons in the hidden layer (you can play with number and see what happens)
 * and one output neuron (sine returns one number as an output).
 *
 */
let NN = NeuralNetwork(1, 20, 1, 0.3);
let rnd = Random(123);


/*
 * Sine is a periodic function,
 * thus we only need to train on values in the range <-pi, pi>
 * That is still quite a big range so we will need a lot of training data.
 *
 * (This training might take a while)
 *
 */
for(let i = 0; i < 100000; i++) {
  const x = rnd.next(-Math.PI, Math.PI);
  NN.train({ input: x, expected: normalize(Math.sin(x)) });
}


/*
 * We use the sigmoid function
 * as our activation function so we will have change our data a bit.
 *
 * Our sigmoid function returns values in range (0, 1),
 * but sine's range of values is <-1, 1>
 *
 * To overcome this, we will not give the network the actual value of sine(x),
 * but rather a value that has been normalized to be in range <0, 1>
 */
function normalize(x) {
  return 0.5 * (x + 1);
}


/*
 * Because the network will now be returning
 * the normalized values, we want to revert them back
 * to the actual values of sine(x).
 */
function revert(x) {
  return (2 * x) - 1;
}


/*
 * Let's how the network did..
 * When the training is done you should see something like this:
 *
 * Testing the neural network...
 * input: 0.987 | expected: 0.834 | actual: 0.842
 * input: -1.011 | expected: -0.847 | actual: -0.855
 * input: -2.731 | expected: -0.399 | actual: -0.451
 * input: 1.030 | expected: 0.858 | actual: 0.857
 * input: 3.028 | expected: 0.114 | actual: 0.126
 * input: 0.187 | expected: 0.186 | actual: 0.188
 * input: 1.658 | expected: 0.996 | actual: 0.908
 * input: 1.961 | expected: 0.925 | actual: 0.863
 * input: 1.218 | expected: 0.938 | actual: 0.899
 * input: -0.079 | expected: -0.079 | actual: -0.087
 *
 */
console.log("Testing the neural network...");
for(let i = 0; i < 10; i++) {
  const x = rnd.next(-Math.PI, Math.PI);
  const result = NN.test([x]);
  console.log("input:", x.toFixed(3), "| expected:", Math.sin(x).toFixed(3), "| actual:", revert(result).toFixed(3));
}


/*
 * Optionally we can save the weights
 * so that the progress we made is not lost.
 */
NN.save("saved/sine.json", (err) => {
  if(err) {
    console.error(err);
  } else {
    console.log("saved successfully");
  }
});
