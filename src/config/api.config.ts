

export const API = {
  login: 'http://localhost:3000/auth/login',
  register: 'http://localhost:3000/auth/register',

  findUserByEmail: 'http://localhost:3000/users/email/',
  findUserByUsername:
    'http://localhost:3000/users/username/',
  findUserById: 'http://localhost:3000/users/',
  getCurrentUserInfo: 'http://localhost:3000/users/infos',
  getAllUsers: 'http://localhost:3000/users',
  searchUser: "http://localhost:3000/users/serch/",
  searchArticle: "http://localhost:3000/article/search/",

  getArticle: "http://localhost:3000/article",
  getArticleFull: "http://localhost:3000/article/full", //Fetches All Standalone articles with their nested comments
  getArticleByUserId: "http://localhost:3000/article/full/byUserId/",
  getArticleProperties: "http://localhost:3000/article/property",
  createArticle: "http://localhost:3000/article/create/",
  findArticles: 'http://localhost:3000/article/find',
  updateArticle: "http://localhost:3000/article/",
  getUserByArticleId : "http://localhost:3000//article/owner/",
  getImagesByArticle: (id: string) =>
    'http://localhost:3000/article/' + id + '/images',
  find: (config: {
    content?: boolean;
    images?: boolean;
    ownerid?: string | null;
    comments?: boolean;
    page?: number;
    limit?: number;
  }) => {
    let query = ''
    if (config.content){
      query+='&content='+config.content
    }
    if (config.images){
      query+='&images='+config.images
    }
    if (config.ownerid){
      query+='&ownerid='+config.ownerid
    }if (config.comments){
      query+='&comments='+config.comments
    }if (config.page){
      query+='&page='+config.page
    }if (config.limit){
      query+='&limit='+config.limit
    }
    return `http://localhost:3000/article/find?placeholder=place${query}`},
  getArticleById: "http://localhost:3000/article/full/",
  chatbot: "http://localhost:11434/api/chat",

};
