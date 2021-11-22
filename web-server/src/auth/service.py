

def login(username, password):
    return {
        "username": str(username),
        "password": str(password)
    }


def logout():
    return {
        "result": "logged out successfully!"
    }


def signup(signup_form):
    return signup_form
