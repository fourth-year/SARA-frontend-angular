import { PostData } from './post-data';

export interface PostResponse {
  success: boolean;
  message: string;
  data: PostData[] | PostData;
}
