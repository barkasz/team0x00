#include <string>
#include <cstdint>
#include <vector>
#include <fstream>
#include <iostream>
#include <sstream>
#include "ciff.hpp"

using namespace std;

class CIFF{
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
        long header_size;
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
        void parseCiff(std::string const &filename){
            bool printInfo = true;

            std::ifstream ciffFile(filename, std::ios::binary);
            if (ciffFile.is_open()) {
                int64_t header_start = ciffFile.tellg();

                ciffFile.seekg(0, ciffFile.end);
                int64_t file_length = ciffFile.tellg();
                ciffFile.seekg(0, ciffFile.beg);

                // magic_chars
                magic_chars = readString(ciffFile, 4);
                if (magic_chars != "CIFF") {
                    cout << "BAD FILE: Missing magic characters" << endl;
                }

                // header_size
                header_size = readInt(ciffFile);
                if (header_size > file_length) {
                    cout << "BAD FILE: Too big header size" << endl;
                }

                int64_t header_end = header_start + header_size;

                // content_size
                content_size = readInt(ciffFile);
                if (content_size > file_length) {
                    cout << "BAD FILE: Too big content size" << endl;
                }

                if (printInfo) {
                    cout << magic_chars << endl;
                    cout << header_size << endl;
                    cout << content_size << endl;
                }

            }
        }


};


int main(int argc, char *argv[]){
    if (argc != 2){
        std::cerr << "Usage: ./ciff <filename>"<<std::endl;
        return 1;
    }
    //check input
    std::string filename = argv[1];
    std::cout << "Mukodik." << std::endl;
    CIFF test;
    test.parseCiff(filename);

    return 0;
}