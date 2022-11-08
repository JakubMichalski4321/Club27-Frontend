export class UploadMemeComment{

  content: string;
  author: string;
  memeId: string;

  constructor(content: string, author: string, memeId: string) {
    this.content = content;
    this.author = author;
    this.memeId = memeId;
  }
}
