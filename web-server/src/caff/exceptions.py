class CaffException(Exception):
    pass


class FileIdMissingException(CaffException):
    pass


class InternalServerException(CaffException):
    pass


class NoImageTypeException(CaffException):
    pass


class DeleteIDException(CaffException):
    pass
