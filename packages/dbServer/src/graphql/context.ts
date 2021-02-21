import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { ICategory, IProduct, IOrder, ICustomer } from '../models';

/*
  {
    "authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb0RldkNvIiwiaWF0IjoxNjEzMzczNjU5LCJleHAiOjE2NDQ5MDk2NTksImF1ZCI6InNhbXBsZS5jb20iLCJzdWIiOiIzNDkzODQ3MzkiLCJmaXJzdE5hbWUiOiJKb2hubnkiLCJsYXN0TmFtZSI6IlJvY2tldCIsImVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOlsiTWFuYWdlciIsIlByb2plY3QgQWRtaW5pc3RyYXRvciJdfQ.UAI4-en-Pcgl78KesM1QIiSPqljcOZJxme2ZR7RrBVc"
  }

  {
    "iss": "CoDevCo",
    "iat": 1613373659,
    "exp": 1644909659,
    "aud": "sample.com",
    "sub": "349384739",
    "firstName": "Johnny",
    "lastName": "Rocket",
    "email": "jrocket@example.com",
    "role": [
        "Manager",
        "Project Administrator"
    ]
  }
*/

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
  sub: string;
  iat: number;
}

export interface Context {
  req: Request;
  res: Response;
  user?: User;
  loaders: {
    category: DataLoader<string, ICategory>;
    product: DataLoader<string, IProduct>;
    order: DataLoader<string, IOrder>;
    customer: DataLoader<string, ICustomer>;
  };
}
