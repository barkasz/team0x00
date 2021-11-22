FROM python:3.8

WORKDIR /usr/src/app
COPY src /usr/src/app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENTRYPOINT [ "python3" ]
CMD [ "server.py" ]