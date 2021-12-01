# team0x00

## Wiki
https://github.com/barkasz/team0x00/wiki/Tervez%C3%A9si-f%C3%A1zis    


Logger: https://github.com/andrew-d/cpplog

# Postman may be faulty during file upload

curl command to test the /upload endpoint:
```
curl -b "session=837f3455-d05b-4ed5-9a3b-63af4391bc6c; Expires=Wed, 01 Dec 2021 18:09:19 GMT; HttpOnly; Path=/" -F "file=@/home/akos/GIT/team0x00/web-server/res/1.caff" localhost:5000/upload
```
