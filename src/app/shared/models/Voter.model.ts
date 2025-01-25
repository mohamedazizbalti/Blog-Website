export class Voter {
  constructor(
    public voterId: string,
    public vote : Vote
  ) {}
}
enum Vote {
  Upvote = 'upvote',
  Downvote = 'downvote',
  None = 'none',
}
