import {api} from './api';

export default () => {
  let pixelX = 1;
  let pixelY = 1;
  let callback = () => {};

  const shapes = (points, shape) => {
    const {inst} = api;

    let in_buffer;
    let shape_buffer;
    let out_buffer;
    try {
      in_buffer = inst.newArray(points);
      shape_buffer = inst.newArray(shape);
      out_buffer = inst.shapes(in_buffer, shape_buffer, pixelX, pixelY);

      callback(inst.getArray(Float32Array, out_buffer));
    } finally {
      if (in_buffer) inst.freeArray(in_buffer);
      if (shape_buffer) inst.freeArray(shape_buffer);
      if (out_buffer) inst.freeArray(out_buffer);
    }
  };

  shapes.pixelX = (...args) => {
    if (!args.length) {
        return pixelX;
    }
    pixelX = args[0];
    return shapes;
  };

  shapes.pixelY = (...args) => {
    if (!args.length) {
        return pixelY;
    }
    pixelY = args[0];
    return shapes;
  };

  shapes.callback = (...args) => {
    if (!args.length) {
        return callback;
    }
    callback = args[0];
    return shapes;
  };

  return shapes;
};
