class AuthException(Exception):
    pass


class InvalidCredentialsException(AuthException):
    pass


class UsernameAlreadyExistsException(AuthException):
    pass


class AlreadyLoggedInException(AuthException):
    pass

