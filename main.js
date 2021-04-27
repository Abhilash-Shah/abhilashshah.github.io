let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");

//Loading images
// let img = document.createElement("img");
// img.onload = () => {
//   ctx.drawImage(img, 0, 0, 500, 500);
// };
// img.src = "/Desktop/Martial_Arts/images/idle/2.png";

//animating with images
// let loadImage = (src, callback) => {
//   let img = document.createElement("img");
//   img.onload = () => callback(img);
//   img.src = src;
// };
// let imagePath = (frameNumber, animation) => {
//   return "/Desktop/Martial_Arts/images/punch/" + frameNumber + ".png";
// };
// let loadImages = (callback) => {
//   let images = [];
//   let imagesToLoad = 7;
//   [1, 2, 3, 4, 5, 6, 7].forEach((frameNumber) => {
//     let path = imagePath(frameNumber);
//     loadImage(path, (image) => {
//       images[frameNumber - 1] = image;
//       imagesToLoad = imagesToLoad - 1;
//       if (imagesToLoad === 0) {
//         callback(images);
//       }
//     });
//   });
// };
//Single Image Show in
// let animate = (ctx) => {};
// loadImages((images) => {
//   ctx.drawImage(images[1], 0, 0, 500, 500);
// });
// let animate = (ctx, images, callback) => {
//   images.forEach((image, index) => {
//     setTimeout(() => {
//       ctx.clearRect(0, 0, 500, 500);
//       ctx.drawImage(image, 0, 0, 500, 500);
//     }, index * 100);
//   });
//   setTimeout(callback, images.length * 100);
// };
// loadImages((images) => {
//   animate(ctx, images, () => {
//     console.log("Done!");
//   });
//   //ctx.drawImage(images[1], 0, 0, 500, 500);
// });

//Loading in mutiple Animations
let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return (
    "/abhilashshah.github.io/tree/main/images" + animation + "/" + frameNumber + ".png"
  );
};

let frames = {
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
};

let loadImages = (callback) => {
  let images = {
    backward: [],
    block: [],
    forward: [],
    idle: [],
    kick: [],
    punch: [],
  };
  let imagesToLoad = 0;

  ["backward", "block", "forward", "idle", "kick", "punch"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);

        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;
          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};
let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};
//Show only 1 FOlder kick or punch or idle
//Taking Control
loadImages((images) => {
  let queuedAnimations = [];

  let aux = () => {
    let selectedAnimation;
    if (queuedAnimations.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimations.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };
  aux();
  document.getElementById("kick").onclick = () => {
    queuedAnimations.push("kick");
  };
  document.getElementById("punch").onclick = () => {
    queuedAnimations.push("punch");
  };
  document.getElementById("forward").onclick = () => {
    queuedAnimations.push("forward");
  };
  document.getElementById("backward").onclick = () => {
    queuedAnimations.push("backward");
  };
  document.getElementById("block").onclick = () => {
    queuedAnimations.push("block");
  };
  document.addEventListener("keyup", (event) => {
    const key = event.key; //"ArrowRight","ArrowLeft","ArrowUp","ArrowDown"
    if (key === "ArrowLeft") {
      queuedAnimations.push("kick");
    } else if (key === "ArrowRight") {
      queuedAnimations.push("punch");
    } else if (key === "ArrowUp") {
      queuedAnimations.push("forward");
    } else if (key === "ArrowDown") {
      queuedAnimations.push("backward");
    } else {
      queuedAnimations.push("block");
    }
  });
});

//   document.addEventListener("keyup", (event) => {
//     const key = event.key; //"ArrowRight","ArrowLeft","ArrowUp","ArrowDown"
//     if (key === "ArrowLeft") {
//       queuedAnimations.push("kick");
//     } else if (key === "ArrowRight") {
//       queuedAnimations.push("punch");
//     }
//   });
// });

// let img = document.createElement("img");

// img.onload = () => {
//   ctx.drawImage(img, 0, 0, 500, 500);
// };
// img.src = "C:/Users/ABHILASH/Desktop/Martial_Arts/images/idle.png";
