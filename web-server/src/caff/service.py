from caff import caffdb
import subprocess
import os
import time
import app


def remove_file(id):
    # check if delete was successful
    names = caffdb.delete_image(id)
    if names is None:
        return None
    # check delete was successful
    image_gif = caffdb.select_image(id, "gif")
    image_caff = caffdb.select_image(id, "caff")
    if image_gif is not None or image_caff is not None:
        return None
    filename_caff, filename_gif = names
    #remove from filesystem
    os.remove(os.path.join(app.app.config['UPLOAD_FOLDER'], filename_caff))
    os.remove(os.path.join(app.app.config['UPLOAD_FOLDER'], filename_gif))
    return {"id": id}


def download_file(id, file_type: str):
    return caffdb.select_image(id, file_type)


def upload(caff_image):
    time_stamp = str(int(time.time() * 1000))
    filename_caff = time_stamp + ".caff"
    filename_gif = time_stamp + ".gif"

    # Create files
    filesysname_caff = os.path.join(app.app.config['UPLOAD_FOLDER'], filename_caff)
    filesysname_gif = os.path.join(app.app.config['UPLOAD_FOLDER'], filename_gif)

    caff_image.save(filesysname_caff)

    program = "third_party/converter"
    args = filesysname_caff + " " + filesysname_gif
    cmd = program + " " + args
    try:
        result = subprocess.run([cmd], check=True, shell=True)
    except subprocess.CalledProcessError:
        print("Error while converting caff to gif...")
        print("returncode: {}".format(result.returncode))
        print(result.stderr)
        return None

    # save filenames to database
    file_id = caffdb.insert_images(filename_caff, filename_gif)
    return {"id": file_id}
