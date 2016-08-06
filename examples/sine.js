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
for(let i = 0; i < 1000000; i++) {
  const x = rnd.next(-Math.PI, Math.PI);
  NN.train({ input: [x], expected: [normalize(Math.sin(x))] });
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
 * input: 1.117 | expected: 0.899 | actual: 0.9135746239351616
 * input: 0.576 | expected: 0.545 | actual: 0.5388298304718682
 * input: -1.393 | expected: -0.984 | actual: -0.9599159914127254
 * input: -1.175 | expected: -0.923 | actual: -0.9284067248382083
 * input: 2.457 | expected: 0.632 | actual: 0.6482541399414217
 * input: -0.462 | expected: -0.446 | actual: -0.4392951432009532
 * input: -0.380 | expected: -0.371 | actual: -0.36987550010885295
 * input: 1.310 | expected: 0.966 | actual: 0.956759640123636
 * input: 0.598 | expected: 0.563 | actual: 0.5558734476992553
 * input: -1.500 | expected: -0.997 | actual: -0.9635348789157572
 *
 */
console.log("Testing the neural network...");
for(let i = 0; i < 10; i++) {
  const x = rnd.next(-Math.PI, Math.PI);
  const result = NN.test([x]);
  console.log("input:", x.toFixed(3), "| expected:", Math.sin(x).toFixed(3), "| actual:", revert(result));
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
