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
    int64_t header_size;
    //TODO: SIZE???
    int64_t content_size;
    int64_t width;
    int64_t height;
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
    void parseCiff(std::string const &filename) {
        cout << filename << endl;
        std::ifstream ciffFile(filename, std::ios::binary);
        if (ciffFile.is_open()) {
            int64_t header_start = ciffFile.tellg();

            ciffFile.seekg(0, ciffFile.end);
            int64_t file_length = ciffFile.tellg();
            ciffFile.seekg(0, ciffFile.beg);
            int64_t readSize = 0;
            // magic_chars
            magic_chars.append(string(1, readData<char>(ciffFile)));
            magic_chars.append(string(1, readData<char>(ciffFile)));
            magic_chars.append(string(1, readData<char>(ciffFile)));
            magic_chars.append(string(1, readData<char>(ciffFile)));
#ifdef TESZT
            cout << "magic: " << magic_chars << endl;
#endif
            if (magic_chars != "CIFF") {
                cout << "BAD FILE: Missing magic characters" << endl;
                exit(1);
            } else {
                readSize += 4;
            }


            // header_size
            header_size = readInt(ciffFile);
#ifdef TESZT
            cout << "header: " << header_size << endl;
#endif
            if (header_size > file_length) {
                cout << "BAD FILE: Too big header size" << endl;
                exit(1);
            } else if (header_size < 0) {
                cout << "BAD FILE: header size < 0" << endl;
                exit(1);
            } else {
                readSize += 8;
            }


            int64_t header_end = header_start + header_size;

            // content_size
            content_size = readInt(ciffFile);
#ifdef TESZT
            cout << "content: " << content_size << endl;
#endif
            if (content_size > file_length) {
                cout << "BAD FILE: Too big content size" << endl;
                exit(1);
            } else if (content_size < 0) {
                cout << "BAD FILE: content size < 0" << endl;
                exit(1);
            } else {
                readSize += 8;
            }


            // width
            width = readData<int64_t>(ciffFile);
#ifdef TESZT
            cout << "width: " << width << endl;
#endif
            if (width < 0) {
                cout << "BAD FILE: image width < 0" << endl;
                exit(1);
            }


            height = readInt(ciffFile);
#ifdef TESZT
            cout << "height: " << height << endl;
#endif
            if (height < 0) {
                cout << "BAD FILE: image height < 0" << endl;
                exit(1);
            }


            if (width * height * 3 != content_size) {
                cout << "BAD FILE: content size != width x height x 3" << endl;
                exit(1);
            } else {
                readSize += 16;
            }

            getline(ciffFile, caption, '\n');
#ifdef TESZT
            cout << "caption: " << caption << endl;
#endif
            //   TODO check?
            readSize += caption.length() + 1;

            while (readSize < header_size) {
                string line;
                getline(ciffFile, line, '\0');
                tags.push_back(line);
                readSize += line.length() + 1;
            }
#ifdef TESZT
            for (const string &tag: tags)
                cout << tag << ", ";
            cout << endl;
#endif

            // pixelek

            vector<pixel> pixels;
            for (int i = 0; i < content_size; i += 3) {
                //readData><char>();
                struct pixel p = {readData<char>(ciffFile), readData<char>(ciffFile), readData<char>(ciffFile)};
                pixels.push_back(p);
            }

            ciffFile.close();
        } else {
            cout << "Ciff open failed." << endl;
            exit(1);
        }
    }
};

int main(int argc, char *argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: ./ciff <filename>" << std::endl;
        return 1;
    }
    //check input
    std::string filename = argv[1];
    std::cout << "Mukodik." << std::endl;
    CIFF test;
    test.parseCiff(filename);

    return 0;
}