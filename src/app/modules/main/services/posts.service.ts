import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostResponse } from '../interfaces/post/post-response';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getPosts(): Observable<PostResponse> {
    return this._http.get<PostResponse>(this._apiUrl + '/user/posts');
  }

  public addPost(data: {
    text: string;
    user_id: number;
  }): Observable<PostResponse> {
    return this._http.post<PostResponse>(this._apiUrl + '/user/post/add', data);
  }

  public editPost(
    postId: number,
    editedPost: { text: string }
  ): Observable<PostResponse> {
    return this._http.post<PostResponse>(
      this._apiUrl + '/user/post/update/' + postId,
      editedPost
    );
  }

  public deletePost(postId: number): Observable<PostResponse> {
    return this._http.delete<PostResponse>(
      this._apiUrl + '/user/post/delete/' + postId
    );
  }

  public GetPostComments(postId: number): Observable<any> {
    console.log(postId);
    return this._http.get<any>(
      this._apiUrl + '/user/postcomments/get/' + postId
    );
  }
}
