import apiError from "../Utils/apiError.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof apiError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
      success: err.success,
      data: err.data,
    });
  } else {
    res
      .status(500)
      .json({ message: "unexpected error occur", success: "false" });
  }
}
