import { User } from "./user.model";

export class Article {
  constructor(
    public id: string,
    public fatherId: string|null,
    public title: string,
    public content: string,
    public images: string[],
    public owner: User |string ,
    public comments : Article[],
    public upvotes : number,
    public downvotes : number,
    public voters : any[],
    public slug : string|null,
    public createdAt : string,
    public updatedAt: string
  ) {}
}
