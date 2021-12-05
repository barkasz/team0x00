from app import app


class PostsException(Exception):
    pass


class CreatePostException(PostsException):
    pass


class CreateCommentException(PostsException):
    pass


class ReadPostException(PostsException):
    pass


class DeletePostException(PostsException):
    pass


class DeleteCommentException(PostsException):
    pass


class ReadCommentException(PostsException):
    pass


class CreateReplyException(PostsException):
    pass


class DeleteReplyException(PostsException):
    pass


class ReadReplyException(PostsException):
    pass


class RequiredFieldMissingException(PostsException):
    pass


class DeleteCommentException(PostsException):
    pass


class NoMatchingResultsException(PostsException):
    pass
