export const API = {
  login: 'https://bloggy-dot-tn-backend.vercel.app/auth/login',
  register: 'https://bloggy-dot-tn-backend.vercel.app/auth/register',

  findUserByEmail: 'https://bloggy-dot-tn-backend.vercel.app/users/email/',
  findUserByUsername:
    'https://bloggy-dot-tn-backend.vercel.app/users/username/',
  findUserById: 'https://bloggy-dot-tn-backend.vercel.app/users/',
  getCurrentUserInfo: 'https://bloggy-dot-tn-backend.vercel.app/users/infos',
  getAllUsers: 'https://bloggy-dot-tn-backend.vercel.app/users',
  searchUser: "https://bloggy-dot-tn-backend.vercel.app/users/serch/",
  searchArticle: "https://bloggy-dot-tn-backend.vercel.app/article/search/",

  getArticle: 'https://bloggy-dot-tn-backend.vercel.app/article',
  getArticleFull: 'https://bloggy-dot-tn-backend.vercel.app/article/full', //Fetches All Standalone articles with their nested comments
  getArticleByUserId:
    'https://bloggy-dot-tn-backend.vercel.app/article/full/byUserId/',
  getArticleProperties:
    'https://bloggy-dot-tn-backend.vercel.app/article/property',
  createArticle: 'https://bloggy-dot-tn-backend.vercel.app/article/create',
  findArticles: 'https://bloggy-dot-tn-backend.vercel.app/article/find',
  getImagesByArticle: (id: string) =>
    'https://bloggy-dot-tn-backend.vercel.app/article/' + id + '/images',
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
    return `https://bloggy-dot-tn-backend.vercel.app/article/find?placeholder=place${query}`},
  getArticleById: "https://bloggy-dot-tn-backend.vercel.app/article/full/",
  chatbot: "http://localhost:11434/api/chat",

};
