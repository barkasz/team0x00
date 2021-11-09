#include <string>
#include <cstdint>
#include <vector>
#include <fstream>
#include <iostream>
#include <filesystem>
#include <sstream>
#include "ciff.hpp"

#define TESZT


using namespace std;

struct pixel {
    char r;
    char g;
    char b;
};


class CIFF {
    /*
    Constructor for CIFF images
    :param magic_chars: the magic "CIFF" characters
    :param header_size_long: size of the header in bytes (8-byte-long int)
    :param content_size_long: size of content in bytes 8-byte-long int)
    :param width_long: width of the image (8-byte-long int)
    :param height_long: height of the image (8-byte-long int)
    :param caption_string: caption of the image (string)
    :param tags_list: list of tags in the image
    :param pixels_list: list of pixels to display
    */
private:
    std::string magic_chars;
    uint64_t header_size;
    //TODO: SIZE???
    uint64_t content_size;
    uint64_t width;
    uint64_t height;
    std::string caption;
    std::vector<std::string> tags;

public:
    CIFF() {

    }
    /*
        $ xxd -l 15 test1.ciff
        00000000: 4349 4646 5100 0000 0000 0000 6888 1e    CIFFQ.......h..
    */
    /*
        https://www.cplusplus.com/reference/istream/istream/read/
    */
    void parseCiff(std::vector<uint8_t> const &ciff) {
        uint64_t file_length = ciff.size();
        LOG_DEBUG(log) << "CIFF size: " << file_length << endl;
        uint64_t readPos = 0;
        // magic_chars
        for (int i = 0; i < 4; ++i) {
            magic_chars.append(string(1, readData<char>(ciff, readPos)));
            readPos++;
        }

        LOG_DEBUG(log) << "magic: " << magic_chars << endl;
        if (magic_chars != "CIFF") {
            LOG_ERROR(log) << "BAD FILE: Missing magic characters" << endl;
            exit(1);
        }


        // header_size
        header_size = readData<int64_t>(ciff, readPos);
        LOG_DEBUG(log) << "header: " << header_size << endl;
        if (header_size > file_length) {
            LOG_ERROR(log) << "BAD FILE: Too big header size" << endl;
            exit(1);
        } else if (header_size < 38) {
            LOG_ERROR(log) << "BAD FILE: header size < 38" << endl;
            exit(1);
        } else {
            readPos += 8;
        }

        // content_size
        content_size = readData<int64_t>(ciff, readPos);
        LOG_DEBUG(log) << "content: " << content_size << endl;
        if (content_size > file_length) {
            LOG_ERROR(log) << "BAD FILE: Too big content size" << endl;
            exit(1);
        } else if (content_size < 0) {
            LOG_ERROR(log) << "BAD FILE: content size < 0" << endl;
            exit(1);
        } else {
            readPos += 8;
        }

        if (content_size + header_size != file_length) {
            LOG_ERROR(log) << "Content size + header size != file size" << endl;
            exit(1);
        }

        // width
        width = readData<int64_t>(ciff, readPos);
        LOG_DEBUG(log) << "width: " << width << endl;
        if (width < 0) {
            LOG_ERROR(log) << "BAD FILE: image width < 0" << endl;
            exit(1);
        } else {
            readPos += 8;
        }


        height = readData<int64_t>(ciff, readPos);
        LOG_DEBUG(log) << "height: " << height << endl;
        if (height < 0) {
            LOG_ERROR(log) << "BAD FILE: image height < 0" << endl;
            exit(1);
        } else {
            readPos += 8;
        }


        if (width * height * 3 != content_size) {
            LOG_ERROR(log) << "BAD FILE: content size != width x height x 3" << endl;
            exit(1);
        }

        //!!!

        char header_left[header_size - readPos + 1];
        bool line_break = false;
        for (int64_t i = 0; i < header_size - readPos; ++i) {
            header_left[i] = readData<char>(ciff, readPos + i);
            if (header_left[i] == '\n') {
                if (line_break) {
                    LOG_ERROR(log) << "Invalid tag" << endl;
                    exit(1);
                }
                line_break = true;
            }
            if (header_left[i] == '\0' && !line_break) {
                LOG_ERROR(log) << "Invalid caption" << endl;
                exit(1);
            }
        }


        header_left[header_size - readPos] = '\0';
        string temp = string(header_left);
        caption = temp.substr(0, temp.find('\n'));

        readPos += caption.length() + 1;
        uint64_t tempPos = caption.length() + 1;
        LOG_DEBUG(log) << "caption: " << caption << endl;
        while (readPos < header_size) {
            string line = string(&header_left[tempPos]);
            if (line.length() + readPos + 1 > header_size) {
                LOG_ERROR(log) << "Too long tag." << endl;
                exit(1);
            }
            tags.push_back(line);
            readPos += line.length() + 1;
            tempPos += line.length() + 1;
        }

        for (const string &tag: tags)
            LOG_DEBUG(log) << tag << endl;

        // pixelek

        vector<pixel> pixels;
        for (int i = 0; i < content_size; i += 3) {
            //readData><char>();
            struct pixel p = {
                    readData<char>(ciff, readPos),
                    readData<char>(ciff, readPos + 1),
                    readData<char>(ciff, readPos + 2)
            };

            pixels.push_back(p);
            readPos += 3;
        }
    }
};

std::vector<uint8_t> read_file_to_uint8(std::string const &path_to_file) {
    std::ifstream instream(path_to_file, std::ios::in | std::ios::binary);
    std::vector<uint8_t> data((std::istreambuf_iterator<char>(instream)), std::istreambuf_iterator<char>());
    return data;
}

#ifdef main
int main(int argc, char *argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: ./ciff <filename>" << std::endl;
        return 1;
    }
    //check input
    std::string filename = argv[1];
    auto file = read_file_to_uint8(filename);
    CIFF test;
    test.parseCiff(filename);

    return 0;
}