import { check } from "express-validator";
import Category from "../models/categoryModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getOne, updateOne } from "./factoryhandler.js";
//* ==========================================================

//! Get All Categories Data
export const getAllCategories = catchAsync(async (req, res, next) => {
  let categories = await Category.find({}).sort({ categoryName: 1 }).lean();

  if (categories.length <= 0)
    return next(new AppError("No Categories Found!", 404));

  categories = categories.map((el) => {
    return { ...el, categoryName: el.categoryName.split("^").pop() };
  });

  return res.status(200).json({
    status: "success",
    results: categories.length,
    data: categories,
  });
});

// ==========================================================
//! Add New Category
export const validateCategory = [
  check("categoryName", "Category Name is required.")
    .trim()
    .exists()
    .notEmpty(),
];
export const addCategory = catchAsync(async (req, res, next) => {
  let { categoryName, directParentCategory = "" } = req.body;

  categoryName = categoryName.trim().toLowerCase();
  directParentCategory = directParentCategory.trim().toLowerCase();

  // 1) category exists
  const categoryExisted = await Category.findOne({
    categoryName: { $regex: `.*${categoryName}.*`, $options: "i" },
  });

  if (categoryExisted)
    return next(new AppError("Category already Exists.", 405));

  if (directParentCategory) {
    // 2) find parent full category name
    const parentCategoryName = await Category.findOne({
      categoryName: { $regex: `${directParentCategory}$`, $options: "i" },
    });

    if (!parentCategoryName)
      return next(new AppError("Parent Category does not exist.", 404));

    // 3) merge category names
    categoryName = `${parentCategoryName.categoryName}^${categoryName}`;
  }

  const newCategory = new Category({ categoryName });
  await newCategory.save();

  res.status(201).json({
    status: "success",
    message: "new Category added",
    data: newCategory,
  });
});

// ==========================================================

//! Get Category By ID
export const getCategoryByID = getOne(Category);

// ==========================================================

// //! Update Category By ID
// export const updateCategoryByID = updateOne(Category);

// ==========================================================

//! Delete Category By ID
export const deleteCategoryByID = catchAsync(async (req, res, next) => {
  // delete category
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError(`No Category found with that ID`, 404));
  }

  // get category name from chain
  const categoryName = category.categoryName.split("^").pop();
  // delete all categories that contain that name in its chain
  const deletedCategories = await Category.deleteMany({
    categoryName: { $regex: `.*${categoryName}.*`, $options: "i" },
  });

  res.status(200).json({
    status: "success",
    data: `${categoryName} and ${deletedCategories.deletedCount} subcategories are successfully deleted.`,
  });
});
