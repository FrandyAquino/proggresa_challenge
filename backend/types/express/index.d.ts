declare namespace Express {
  interface Request<TBody = any, TQuery = any, TParams = any> {
    user: {
      _id: any;
      username: string;
      preferences: {
          topics: string[];
          sources: string[];
      };
    }
    ctx: {
      body: TBody
      params: TParams
      query: TQuery
    }
  }
}