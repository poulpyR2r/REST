const PostController = require("../controller/postController");
const Post = require("../model/postModel");
const textApiProvider = require("../provider/textApiProvider");

jest.mock("../model/postModel");
jest.mock("../provider/textApiProvider");

describe("PostController Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Test get all posts", async () => {
    const mockPosts = [
      { title: "title1", content: "content1", author: "author1" },
      { title: "title2", content: "content2", author: "author2" },
    ];

    Post.find.mockResolvedValue(mockPosts);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await PostController.getFiles(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      results: mockPosts.length,
      data: { posts: mockPosts },
    });
  });

  test("should create a new post", async () => {
    const mockPostData = { title: "New Title", author: "Author Name" };
    const mockCreatedPost = { ...mockPostData, content: "Mocked random text", _id: "mockId" };

    textApiProvider.getLoremIpsum.mockResolvedValue("Mocked random text");
    Post.create.mockResolvedValue(mockCreatedPost);

    const req = { body: mockPostData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await PostController.createFile(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: { post: mockCreatedPost },
    });
  });

  test("should update a post", async () => {
    const postId = "existingPostId";
    const updateData = { title: "Updated Title", content: "Updated Content" };
    const mockUpdatedPost = { ...updateData, _id: postId };

    Post.findByIdAndUpdate.mockResolvedValue(mockUpdatedPost);

    const req = { params: { id: postId }, body: updateData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await PostController.updateFile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success post updated",
      data: { post: mockUpdatedPost },
    });
  });

  test("should delete a post", async () => {
    const postId = "existingPostId";

    Post.findByIdAndDelete.mockResolvedValue({ _id: postId });

    const req = { params: { id: postId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await PostController.deleteFile(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  test("should get a specific post", async () => {
    const postId = "existingPostId";
    const mockPost = { title: "Existing Title", content: "Existing Content", _id: postId };

    Post.findById.mockResolvedValue(mockPost);

    const req = { params: { id: postId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await PostController.getAFile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: { post: mockPost },
    });
  });

});
