const CommentController = require("../controller/commentsController");
const Comment = require("../model/commentsModel");
const Post = require("../model/postModel");

jest.mock("../model/commentsModel");
jest.mock("../model/postModel");

describe("CommentController Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Test get all comments for a post", async () => {
    const postId = "mockPostId";
    const mockComments = [
      { name: "John Doe", message: "Comment 1", post: postId },
      { name: "Jane Doe", message: "Comment 2", post: postId },
    ];

    Comment.find.mockResolvedValue(mockComments);

    const req = { params: { id_post: postId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await CommentController.getAllcommentsForPost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      results: mockComments.length,
      data: { comments: mockComments },
    });
  });

  test("should create a comment for a post", async () => {
    const postId = "mockPostId";
    const mockCommentData = { name: "John Doe", message: "New Comment", post: postId };
    const mockCreatedComment = { ...mockCommentData, _id: "mockCommentId" };

    Comment.create.mockResolvedValue(mockCreatedComment);

    const req = { params: { id_post: postId }, body: mockCommentData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await CommentController.createCommentForPost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success comment created",
      data: { comments: mockCreatedComment },
    });
  });

  test("should update a comment", async () => {
    const commentId = "mockCommentId";
    const updateData = { name: "Jane Doe", message: "Updated Comment" };
    const mockUpdatedComment = { ...updateData, _id: commentId };

    Comment.findByIdAndUpdate.mockResolvedValue(mockUpdatedComment);

    const req = { params: { id_comment: commentId }, body: updateData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await CommentController.updateAComment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should delete a comment", async () => {
    const commentId = "mockCommentId";

    Comment.findByIdAndDelete.mockResolvedValue({ _id: commentId });

    const req = { params: { id_comment: commentId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await CommentController.deleteAComment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should get a specific comment", async () => {
    const commentId = "mockCommentId";
    const mockComment = { name: "John Doe", message: "Existing Comment", _id: commentId };

    Comment.findById.mockResolvedValue(mockComment);

    const req = { params: { id_comment: commentId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await CommentController.getAComment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success comment found",
      data: { comment: mockComment },
    });
  });

});
