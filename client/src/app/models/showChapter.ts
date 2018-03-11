import { ShowSection } from './showSection';

export class ShowChapter{
    constructor(public _id: string, public Name: string, public Num: number, public Category: string, public Sections: ShowSection[],
                public Flag: number) {}
  }
