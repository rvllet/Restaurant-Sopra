import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Dish } from '../interface/dish';
import { Comment } from '../interface/comment';

fdescribe('CommentsService', () => {
  let service: CommentsService;
  let controller: HttpTestingController;
  const dishMock: Dish = {
    id: '1',
    name: '',
    description: '',
    ingredients: '',
    price: 0,
    category: '',
    image: ''
  }
  const commentsListMock: Comment[] = [];
  const commentMock: Comment = {
    id: '2',
    user_id: '3',
    dish_id: '1',
    comment: '',
    rating: 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a comment[] with getComments', (done: DoneFn) => {
    service.getComments(dishMock.id).subscribe((response) => {
      expect(response).toEqual(commentsListMock);
      done();
    });
    const req = controller.expectOne(`comments?dish_id=${dishMock.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(commentsListMock);
  });

  it('should add a comment with addComment', (done: DoneFn) => {
    const getCommentsSpy = spyOn(service, 'getComments');

    service.addComment(commentMock);
    const req = controller.expectOne(`comments`, dishMock.id);
    expect(req.request.method).toBe('POST');
    req.flush(commentsListMock);
    done();

    expect(getCommentsSpy).toHaveBeenCalled();
  });

});
