const catchAsync = (fn) => {
  return (req, res, next) => {
    // this is the function that express is then gonna call when we hit the route that needs its controller function.

    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
