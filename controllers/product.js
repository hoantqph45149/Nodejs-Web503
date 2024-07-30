import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Lấy sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Lấy sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(400).json({
        message: "Không tạo được sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Tạo sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(400).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "không xóa được sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Xóa sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
