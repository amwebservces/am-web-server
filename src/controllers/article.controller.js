const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { articleServices } = require("../services");

const create = catchAsync(async (req, res, next) => {
  let data = await articleServices.createArticle(req.body);
  res.status(httpStatus.CREATED).send({data});
});

const getAll = catchAsync(async (req, res, next) => {
  let data = await articleServices.getArticles();
  res.status(httpStatus.OK).send({data});
});

const getById = catchAsync(async (req, res, next) => {
  let data = await articleServices.getArticleById(req.params.id);
  res.status(httpStatus.OK).send({data});
});

const updateById = catchAsync(async (req, res, next) => {
  let data = await articleServices.updateArticleById(req.params.id, req.body);
  res.status(httpStatus.OK).send({data});
});

const deleteById = catchAsync(async (req, res, next) => {
  let data = await articleServices.deleteArticleById(req.params.id);
  res.status(httpStatus.OK).send({data});
});
module.exports = { create, getAll, getById, updateById, deleteById };
