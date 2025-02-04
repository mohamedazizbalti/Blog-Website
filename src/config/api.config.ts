
export const backendUrl=`${"localhost:3000"}`
const url = `http://${backendUrl}`;
export const API = {
  login: `${url}/auth/login`,
  register: `${url}/auth/register`,

  findUserByEmail: `${url}/users/email/`,
  findUserByUsername:
    `${url}/users/username/`,
  findUserById: `${url}/users/`,
  getCurrentUserInfo: `${url}/users/infos`,
  getAllUsers: `${url}/users`,
  searchUser: `${url}/users/serch/`,
  searchArticle: `${url}/article/search/`,

  getArticle: `${url}/article`,
  getArticleFull: `${url}/article/full`, //Fetches All Standalone articles with their nested comments
  getArticleByUserId: `${url}/article/full/byUserId/`,
  getArticleProperties: `${url}/article/property`,
  createArticle: `${url}/article/create/`,
  findArticles: `${url}/article/find`,
  updateArticle: `${url}/article/`,
  getUserByArticleId : `${url}/article/owner/`,
  getImagesByArticle: (id: string) =>
    `${url}/article/` + id + `/images`,
  find: (config: {
    content?: boolean;
    images?: boolean;
    ownerid?: string | null;
    comments?: boolean;
    page?: number;
    limit?: number;
  }) => {
    let query = ``
    if (config.content){
      query+=`&content=`+config.content
    }
    if (config.images){
      query+=`&images=`+config.images
    }
    if (config.ownerid){
      query+=`&ownerid=`+config.ownerid
    }if (config.comments){
      query+=`&comments=`+config.comments
    }if (config.page){
      query+=`&page=`+config.page
    }if (config.limit){
      query+=`&limit=`+config.limit
    }
    return `${url}/article/find?placeholder=place${query}`},
  getArticleById: `${url}/article/full/`,
  chatbot: `https://openrouter.ai/api/v1/chat/completions`,
  chatbotKey : `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`,
  getMyNotifs : `${url}/notification`

};
