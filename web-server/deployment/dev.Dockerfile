FROM python:3.8

WORKDIR /usr/src/app
COPY src /usr/src/app
COPY config/config.ini /usr/config/config.ini


RUN pip install --upgrade pip
RUN pip install -r requirements.txt

VOLUME [ "/usr/src/app", "/opt" ]

ENTRYPOINT [ "python3" ]
CMD [ "server.py" ]
