export class Category {
    constructor(public Name: string, public ParentName: string, public ChildrenNames: string[],
                public Type: number, public Chapters: string[]) {}
  }
