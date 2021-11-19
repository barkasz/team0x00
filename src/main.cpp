//
// Created by akos on 2021. 11. 08..
//
#define CPPLOG_FILTER_LEVEL 1

#include <iostream>
#include "caff/caff_parser.cpp"
#include "cpplog.hpp"
#include "gif-h/gif.h"

vector<uint8_t> convert(vector<pixel> pixels, uint64_t width, uint64_t height){
    vector<uint8_t> image(width*height*4);
    for (int i = 0; i < width*height; ++i) {
        image[i*4] = pixels[i].r;
        image[i*4+1] = pixels[i].g;
        image[i*4+2] = pixels[i].b;
        image[i*4+3] = 255;
    }
    return image;
}

int main(int argc, char *argv[]) {

	cpplog::StdErrLogger log;
    if (argc != 2) {
        LOG_ERROR(log) << "Usage: ./parser <filename>" << std::endl;
        return 1;
    }
	LOG_INFO(log) << "Parser started" << std::endl;
	//check input?????
    std::string filename = argv[1];
    if (filename.size() > FILENAME_MAX){
        LOG_ERROR(log) << "Too big file!" << std::endl;
        return 1;
    }
	std::string path_to_file = "./test-files/CAFF/official-test-file/2.caff";
	CaffParser parser;
	caff_t caff_file = parser.parseCaff(filename);

    //--------GIF converter--------//
    auto output_filename = "out3.gif";
    uint64_t width = caff_file.animation[0].ciff.getWidth();
    uint64_t height = caff_file.animation[0].ciff.getHeight();
    GifWriter g;
    GifBegin(&g, output_filename, width, height, caff_file.animation[0].duration);
    for (uint64_t i = 0; i < caff_file.header.num_anim; i++) {
        width = caff_file.animation[i].ciff.getWidth();
        height = caff_file.animation[i].ciff.getHeight();
        vector<uint8_t> image = convert(caff_file.animation[i].ciff.getPixels(), width, height);
        GifWriteFrame(&g, image.data(), width, height, caff_file.animation[i].duration);
    }
    GifEnd(&g);
	LOG_INFO(log) << "Parser finished" << std::endl;
	return 0;
}
