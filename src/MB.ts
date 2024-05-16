export namespace MB {
  export interface Input<T> {
    posts: Map<string, Post<T>>;
  }

  export interface Post<T> {
    title: string;
    createTime: Date;
    updateTime: Date;
    getHTMLContents: () => string;
    extra: T;
  }
}
