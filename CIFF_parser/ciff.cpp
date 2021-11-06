#include <string>
#include <cstdint>
#include <vector>
#include <fstream>
#include <iostream>


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
        char magic_chars[5] = "CIFF";
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

        void parseCiff(std::string const &filename){
            std::ifstream input( filename, std::ios::binary |std::ios::in );
            if(!input){
                std::cout << "Cannot open file." << std::endl;
                exit(1);
            }
            //std::vector<unsigned char> buffer(std::istreambuf_iterator<char>(input), {});
            //std::cout << sizeof(buffer) << std::endl;
            char magic_chars[5];
            //input.read(magic_chars, 4 * sizeof(char));
            input.close();
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