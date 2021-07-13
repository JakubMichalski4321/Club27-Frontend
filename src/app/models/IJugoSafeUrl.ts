import {SafeResourceUrl} from "@angular/platform-browser";

export interface IJugoSafeUrl{
  title: string;
  videoURL: SafeResourceUrl;
  videoComment: string;
  videoLikes: number;
  createdDate: string;
}
