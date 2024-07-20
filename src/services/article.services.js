const httpStatus = require("http-status");
const { Models } = require("../server/models");
const ApiError = require("../utils/ApiError");
const ArticleModel = Models.models.Article;

const createArticle = async (article) => {
    const data = await ArticleModel.create(article);
    return { msg: "article created successfully", data };
};

const getArticles = async () => {
    const data = await ArticleModel.findAll();
    return data;
};

const getArticleById = async (id) => {
    const data = await ArticleModel.findOne({
        where: { id },
      });
    return data;
};

const updateArticleById = async (id, body) => {
    const data = await ArticleModel.update(body,{
        where: { id },
      });
    return { msg:"updated successfully" };
};

const deleteArticleById = async (id) => {
    const data = await ArticleModel.destroy({
        where: { id },
      });
    return { msg: "deleted successfully" };
};
module.exports = { createArticle, getArticles, getArticleById,updateArticleById, deleteArticleById };
