/*
 * This example demonstrates how the neural network can be
 * trained to successfully solve the exclusive or problem.
 *
 */

"use strict";

const NeuralNetwork = require("../3layer.js");


/*
 * We create a network with two input neurons (XOR has two inputs),
 * seven neurons in the hidden layer
 * (it is not necessary to have seven, less neurons would work as well)
 * and one output neuron (XOR returns either 1 or 0).
 */
let NN = NeuralNetwork(2, 7, 1, 0.6);


/**
 * Here we define our inputs.
 * There are only 4 possible combinations,
 * so it is rather easy.
 * Don't forget that both .input and .expected has to be an Array
 * even if it is only one value.
 */
let inputs = [
  { input: [1, 1], expected: [0] },
  { input: [1, 0], expected: [1] },
  { input: [0, 1], expected: [1] },
  { input: [1, 1], expected: [0] }
];


/**
 * We will give the network 10000 * 4 examples
 * to train on.
 * Note that it is best to alternate the inputs that we give to the network
 * rather than just repeatedly giving it the same input.
 */
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < inputs.length; j++) {
    NN.train(inputs[j]);
  }
}


/**
 * Time to see how well we trained the network
 *
 */
console.log("Testing the neural network...");
for(let i = 0; i < inputs.length; i++) {
  console.log("input:", inputs[i].input, "| output:", NN.test(inputs[i].input));
}


/**
 * Optionally we can save the weights
 * so that the progress we made is not lost.
 */
NN.save("saved/XOR.json", (err) => {
  if(err) {
    console.error(err);
  } else {
    console.log("saved successfully");
  }
});
