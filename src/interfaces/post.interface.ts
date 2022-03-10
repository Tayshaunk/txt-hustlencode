import { OnChange, OnMount } from '@monaco-editor/react';
import { IHustlencodeUser } from './user.interface';

export interface IHustlencodePost {
  _id: string;
  userId: string;
  html: string;
  css: string;
  js: string;
  linesOfCode: number;
  firstName: string;
  lastName: string;
  username: string;
  user?: IHustlencodeUser;
  createdOn: Date;
  updatedOn: Date;
}

export interface ICode {
  html: string;
  css: string;
  js: string;
  linesOfCode: number;
}


export interface IUsePost{
  value: IHustlencodePost | null
  isLoading: boolean;
  setValue: (p:IHustlencodePost) =>void
}