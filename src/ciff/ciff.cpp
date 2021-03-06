#include <string>
#include <cstdint>
#include <vector>
#include <iostream>
#include "ciff.hpp"

//#define  main

// Severity levels:
// Note: Giving a value for CPPLOG_FILTER_LEVEL will log all messages at
//       or above that level.
//  0 - Trace
//  1 - Debug
//  2 - Info
//  3 - Warning
//  4 - Error
//  5 - Fatal (always logged)
//Prevents all log messages with level less than <level> from being emitted.
#define CPPLOG_FILTER_LEVEL 1

#include "../cpplog.hpp"

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
    uint64_t content_size;
public:
    const string &getMagicChars() const {
        return magic_chars;
    }

    uint64_t getHeaderSize() const {
        return header_size;
    }

    uint64_t getContentSize() const {
        return content_size;
    }

    uint64_t getWidth() const {
        return width;
    }

    uint64_t getHeight() const {
        return height;
    }

    const string &getCaption() const {
        return caption;
    }

    const vector<std::string> &getTags() const {
        return tags;
    }

private:
    uint64_t width;
    uint64_t height;
    std::string caption;
    std::vector<std::string> tags;
    cpplog::StdErrLogger log;
    vector<pixel> pixels;
public:
    const vector<pixel> &getPixels() const {
        return pixels;
    }

public:

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
        // mininm header_size is 38
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
        readPos += 8;


        height = readData<int64_t>(ciff, readPos);
        LOG_DEBUG(log) << "height: " << height << endl;
        readPos += 8;


        if (width * height * 3 != content_size) {
            LOG_ERROR(log) << "BAD FILE: content size != width x height x 3" << endl;
            exit(1);
        }

        //!!!

        char header_left[header_size - readPos + 1];
        bool line_break = false;
        for (uint64_t i = 0; i < header_size - readPos; ++i) {
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
        auto temp = string(header_left);
        caption = temp.substr(0, temp.find('\n'));

        readPos += caption.length() + 1;
        uint64_t tempPos = caption.length() + 1;
        LOG_DEBUG(log) << "caption: " << caption << endl;
        while (readPos < header_size) {
            auto line = string(&header_left[tempPos]);
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

        // pixele
        for (uint64_t i = 0; i < content_size; i += 3) {
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


#ifdef main

std::vector<uint8_t> read_file_to_uint8(std::string const &path_to_file) {
    std::ifstream instream(path_to_file, std::ios::in | std::ios::binary);
    std::vector<uint8_t> data((std::istreambuf_iterator<char>(instream)), std::istreambuf_iterator<char>());
    return data;
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: ./ciff <filename>" << std::endl;
        return 1;
    }
    //check input
    std::string filename = argv[1];
    auto file = read_file_to_uint8(filename);
    CIFF test;
    test.parseCiff(file);

    return 0;
}
#endif