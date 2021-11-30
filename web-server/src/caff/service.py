from caff import caffdb
from caff import exceptions
import subprocess
import os
from werkzeug.utils import secure_filename
import time
import app

def download_file(id, file_type : str):
    return caffdb.select_image(id, file_type)

def upload(caff_image):
    time_stamp = str(int(time.time()*1000))
    filename_caff = time_stamp + ".caff"
    filename_gif = time_stamp + ".gif"

    #Create files
    filesysname_caff = os.path.join(app.app.config['UPLOAD_FOLDER'], filename_caff)
    filesysname_gif = os.path.join(app.app.config['UPLOAD_FOLDER'], filename_gif)

    caff_image.save(filesysname_caff)

    program = "third_party/converter"
    args = filesysname_caff + " " + filesysname_gif
    cmd = program + " " + args
    try:
        result = subprocess.run([cmd], check=True, shell=True, capture_output=True)
    except subprocess.CalledProcessError:
        print("Error while converting caff to gif...")
        print("returncode: {}".format(result.returncode))
        print(result.stderr)
        return None

    #save filenames to database
    file_id = caffdb.insert_images(filename_caff, filename_gif)
    return {"id" : file_id}


