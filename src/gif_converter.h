//
// Created by czurkod on 21/11/2021.
//

#ifndef CAFF_PARSER_GIF_CONVERTER_H
#define CAFF_PARSER_GIF_CONVERTER_H


#include <string>
#include "caff/caff_parser.cpp"
#include <vector>

class gif_converter {
private:
    static vector<uint8_t> convert(vector<pixel> pixels, uint64_t width, uint64_t height);

public:
    static int convert_gif(std::string output_filename, caff_t caff_file);


};


#endif //CAFF_PARSER_GIF_CONVERTER_H
