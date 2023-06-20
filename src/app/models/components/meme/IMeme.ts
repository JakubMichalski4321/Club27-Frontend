import {IMemeComment} from './IMemeComment';

export interface IMeme{
  id: string;
  title: string;
  author: string;
  imagePath: string;
  memeLikes: string;
  createdDate: string;
  memeComments: Array<IMemeComment>;
}
