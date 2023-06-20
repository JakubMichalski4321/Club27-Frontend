import {IMemeComment} from './IMemeComment';

export interface IMeme{
  id: string;
  title: string;
  author: string;
  imagePath: string;
  memeLikes: number;
  createdDate: string;
  memeComments: Array<IMemeComment>;
}
