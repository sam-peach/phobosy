# Phobosy

An implementation of the A\* search algorithm taking data directly from NASA's satellite images of Mars. The generated path has been designed to return to favor the ‘smoothest’ ride possible, meaning it punishes rapid changes in altitude.

### Read my articles breaking down how Phobosy was built:
- <a href="https://medium.com/@sampeach/how-to-use-pathfinding-algorithms-with-satellite-images-part-1-4faf429e091e?source=friends_link&sk=b24934f80bd578c2049f976d9c374ffb" target="_blank">Part 1</a>
- <a href="https://medium.com/@sampeach/how-to-use-pathfinding-algorithms-with-satellite-images-part-2-77562d4a94f3?source=friends_link&sk=9b625cb53ef08450afb18f04cae02b12" target="_blank">Part 2</a>

# Motivation

I've wanted to explore pathfinding for some time and really grasp the 'magic' behind these algorithms. This was a great opportunity to take some brand new cartographic information while also indulging my inner astronomist.

# Build status

Deployed - v1.0.1

# Screenshots

![alt text](https://imgur.com/eSjDDR8.jpg)

# Tech Stack

* React
* Redux
* Node.js
* Express.js
* P5.js

# Code Example

The heart of Phobosy is how it calculates a traversable graph from an image. The way this happens is that the image is converted to greyscale, then the heuristic function for A\* is then updated to read the _absolute difference in contrast_ between two points in the graph.

```javascript
if (this.grayscaleWeights) {
  if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
    return Math.abs(this.weight - fromNeighbor.weight) * 1.41421
  } else {
    return Math.abs(this.weight - fromNeighbor.weight)
  }
}
```

Thus, favoring level ground and avoiding areas of high contrast. The darker the pixel value, the lower it assumes the terrain is - the brighter the higher:
![alt text](https://imgur.com/yho8qnx.png)

# Installation

Simply clone this repo down to your machine. Then:

```
npm i
```

Once completed:

```
npm run start-dev
```

# How to use?

Simply click between two points on the map and watch the path load! You can clear the paths by clicking 'Clear coordinates' in the top-right corner.

# License

MIT © Sam Peach
