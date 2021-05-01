import {IMemeComment} from './IMemeComment';

export interface IMem{
  id: string;
  title: string;
  author: string;
  imagePath: string;
  memeLikes: string;
  createdDate: string;
  commentsList: Array<IMemeComment>;
}
