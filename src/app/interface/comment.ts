export interface IComment {

  id: string;
  user_id: string;
  dish_id: string;
  comment: string;
  rating: number;

}

export class Comment {

  id: string;
  user_id: string;
  dish_id: string;
  comment: string;
  rating: number;



  constructor(oneComment: IComment) {

    this.id = oneComment.id;
    this.user_id = oneComment.user_id;
    this.dish_id = oneComment.dish_id;
    this.comment = oneComment.comment;
    this.rating = oneComment.rating;

  }
}
