import {ISoundboard} from './ISoundboard';

export class SoundboardListObject {

  list: Array<ISoundboard>;
  nameOfList: string;

  constructor(list: Array<ISoundboard>, nameOfList: string) {
    this.list = list;
    this.nameOfList = nameOfList;
  }

}
