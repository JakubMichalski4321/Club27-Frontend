export class Like {

  memeId: string;
  likeGiven: boolean;

  constructor(memeId: string, likeGiven: boolean) {
    this.memeId = memeId;
    this.likeGiven = likeGiven;
  }
}
