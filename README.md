# ann-js
Artificial neural network in vanilla JS
[![Build Status](https://travis-ci.org/zedpowa/ann.svg?branch=master)](https://travis-ci.org/zedpowa/ann)
---

This is a 3-layer neural network that uses sigmoid activation function
and stochastic gradient descent as its backpropagation algorithm.

## Installation

Install from the npm repository:

```
npm install ann-js
```

## Small example

Teaching the network logical XOR operation:

```javascript
// require the network
const NeuralNetwork = require("./3layer.js");

// instantiate a network with two inputs, 7 hidden neurons and 1 output
// set learning rate to 0.6
const NN = NeuralNetwork(2, 7, 1, 0.6);

// define our training data
const inputs = [
  { input: [1, 1], expected: 0 },
  { input: [1, 0], expected: 1 },
  { input: [0, 1], expected: 1 },
  { input: [1, 1], expected: 0 }
];

// and let it run
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < inputs.length; j++) {
    NN.train(inputs[j]);
  }
}

// let's check it out..
for(let i = 0; i < inputs.length; i++) {
  console.log("input:", inputs[i].input, "| output:", NN.test(inputs[i].input));
}
// --> input: [ 1, 1 ] | output: 0.007655196970540926
// --> input: [ 1, 0 ] | output: 0.9918757893434477
// --> input: [ 0, 1 ] | output: 0.9925807646447175
// --> input: [ 1, 1 ] | output: 0.007655196970540926
```

## Methods

### Constructor: NeuralNetwork(numInputs, numHidden, numOutputs, [ learningRate, [ bias ]])

Learning rate is by default set to 0.5 and bias si set to 1.

```javascript
const NN = NeuralNetwork(1, 3, 2);
// 1 input neuron, 3 neurons in hidden layer, 2 output neurons

const NN = NeuralNetwork(2, 1, 2, 0.9, 2);
// 2 input neurons, 1 neuron in hidden layer, 2 output neurons, learning rate 0.9, bias set to 2
```

### .train(trainObject)

Trains the network on a single training example

```javascript
NN.train({ input: [1, 0], expected: 1 });

NN.train({ input: [1, 1, 1], expected: [1, 0] });
```

The .input property is what the network will be fed with, .expected is the result
we're hoping to see.

### .test(input)

Performs a single feed forward on the network and returns the result

```javascript
const NN = NeuralNetwork(1, 2, 1);
NN.test(7);
// --> Number
```

```javascript
const NN = NeuralNetwork(1, 2, 2);

NN.test(14);
// --> Array(2)
```

### .load(file, callback) && .save(file, callback) 

Asynchronously saves or loads the weights of the network.
The saved file is in a json format.

```javascript
NN.load("saved.json", err => {
  if(err) {
    return console.error(err);
  }
  
  // do something with network
});
```

```javascript
NN.save("saved.json", err => {
  if(err) {
    return console.error(err);
  }
  
  // done saving4
});
```

### .loadSync(file) & .saveSync(file)

Synchronous versions of .load & .sync


```javascript
// loading multiple networks
NN1.loadSync("saved1.json");
NN2.loadSync("saved2.json");
```
