import {SafeResourceUrl} from "@angular/platform-browser";

export interface IJugoSafeUrl{
  id: string;
  title: string;
  videoURL: SafeResourceUrl;
  videoComment: string;
  videoLikes: number;
  createdDate: string;
}
