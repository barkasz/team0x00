//
// Created by akos on 2021. 11. 08..
//
#define CPPLOG_FILTER_LEVEL 1

#include <iostream>
#include "caff/caff_parser.cpp"
#include "cpplog.hpp"
#include "gif_converter.h"
#include <string>


int main(int argc, char *argv[]) {

    cpplog::StdErrLogger log;
    if (argc != 3) {
        LOG_ERROR(log) << "Usage: ./converter <input filename> <output filename>" << std::endl;
        return 1;
    }
    LOG_INFO(log) << "Parser started" << std::endl;

    std::string filename = argv[1];
    if (filename.size() > FILENAME_MAX) {
        LOG_ERROR(log) << "Too big file!" << std::endl;
        return 1;
    }
    //std::string path_to_file = "./test-files/CAFF/official-test-file/2.caff";
    CaffParser parser;
    caff_t caff_file = parser.parseCaff(filename);
    LOG_INFO(log) << "Parser finished" << std::endl;

    //--------GIF converter--------//
    LOG_INFO(log) << "Creating GIF" << std::endl;
    std::string output_filename = argv[2];
    if (output_filename.size() > FILENAME_MAX) {
        LOG_ERROR(log) << "Too big file!" << std::endl;
        return 1;
    }
    int return_value = gif_converter::convert_gif(output_filename, caff_file);

    if (return_value != 0) {
        LOG_ERROR(log) << "Error while creating the gif file" << std::endl;
        return 1;
    }
    LOG_INFO(log) << "GIF created" << std::endl;

    return 0;
}
