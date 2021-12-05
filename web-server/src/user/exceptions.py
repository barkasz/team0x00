class UserException(Exception):
    pass


class UserNotExistsException(UserException):
    pass


class DeleteUserException(UserException):
    pass


class PasswordChangeException(UserException):
    pass
