export class UploadSoundboard{

  title: string;
  pathToFile: string;
  whoIs: string;

  constructor(title: string, pathToFile: string, whoIs: string) {

    this.title = title;
    this.pathToFile = pathToFile;
    this.whoIs = whoIs;
  }

}
