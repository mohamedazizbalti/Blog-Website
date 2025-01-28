export const API = {
  login: "https://bloggy-dot-tn-backend.vercel.app/auth/login",
  register: "https://bloggy-dot-tn-backend.vercel.app/auth/register",

  findUserByEmail: "https://bloggy-dot-tn-backend.vercel.app/users/email/",
  findUserByUsername: "https://bloggy-dot-tn-backend.vercel.app/users/username/",
  findUserById: "https://bloggy-dot-tn-backend.vercel.app/users/",
  getCurrentUserInfo : "https://bloggy-dot-tn-backend.vercel.app/users/infos",
  getAllUsers: "https://bloggy-dot-tn-backend.vercel.app/users",
  searchUser: "https://bloggy-dot-tn-backend.vercel.app/users/serch/",

  getArticle: "https://bloggy-dot-tn-backend.vercel.app/article",
  getArticleFull: "https://bloggy-dot-tn-backend.vercel.app/article/full", //Fetches All Standalone articles with their nested comments
  getArticleByUserId: "https://bloggy-dot-tn-backend.vercel.app/article/full/byUserId/",
  getArticleProperties: "https://bloggy-dot-tn-backend.vercel.app/article/property",
  createArticle: "https://bloggy-dot-tn-backend.vercel.app/article/create",
};
