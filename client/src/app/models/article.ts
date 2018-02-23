import { Comment } from './comment';

export class Article{
  constructor(public Title: string, public Content: string, public Author: string,
              public Comments: Comment[], public Category: string,
              public Likes: Number, public UnLikes: Number, public Tags: string[],
              public PublishDate: Number) {}
}
