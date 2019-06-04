import {api} from './api';

export default () => {
  let pixelX = 1;
  let pixelY = 1;
  let callback = () => {};

  const circles = (points, totalSegments) => {
    const {inst} = api;

    let in_buffer;
    let out_buffer;
    try {
      in_buffer = inst.newArray(points);
      out_buffer = inst.circles(in_buffer, totalSegments, pixelX, pixelY);

      callback(inst.getArray(Float32Array, out_buffer));
    } finally {
      if (in_buffer) inst.freeArray(in_buffer);
      if (out_buffer) inst.freeArray(out_buffer);
    }
  };

  circles.pixelX = (...args) => {
    if (!args.length) {
        return pixelX;
    }
    pixelX = args[0];
    return circles;
  };

  circles.pixelY = (...args) => {
    if (!args.length) {
        return pixelY;
    }
    pixelY = args[0];
    return circles;
  };

  circles.callback = (...args) => {
    if (!args.length) {
        return callback;
    }
    callback = args[0];
    return circles;
  };

  return circles;
};
