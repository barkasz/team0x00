import json


def read_responses(path_to_file):
    with open(path_to_file, mode='r') as f:
        responses = json.loads(f.read())

    return responses


def get_response_codes(key=None):
    responses = read_responses('responses.json')

    if key is not None and key in responses.keys():
        return {**dict(responses[key]),
                **dict(responses["common"])}

    return responses["common"]
