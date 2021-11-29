class CaffException(Exception):
    pass


class InvalidCredentialsException(CaffException):
    pass


class UsernameAlreadyExistsException(CaffException):
    pass


class AlreadyLoggedInException(CaffException):
    pass


class InternalServerException(CaffException):
    pass