// from https://www.jeffreythompson.org/collision-detection/circle-rect.php

function circleRectCollision(cx, cy, radius, rx, ry, rw, rh) {

    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;
  
    // which edge is closest?
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge
  
    // get distance from closest edges
    let distX = cx-testX;
    // console.log(distX)
    let distY = cy-testY;
    // console.log(distY)
    let distance = sqrt( (distX*distX) + (distY*distY) );
    //   console.log(distance)
    // if the distance is less than the radius, collision!
    if (distance <= radius) {
      return true;
    }
    return false;
  }

  function calculateDragVelocity(dragStart, releasePos){
    const dist = p5.Vector.sub(releasePos, this.dragStart)
    // const distMag = dist.mag()
    const theta = dist.heading()
    // console.log(distMag)
    velX = cos(theta) * dist.x - sin(theta) * dist.y
    velY = cos(theta) * dist.y + sin(theta) * dist.x
    return createVector(velX, velY)
  }