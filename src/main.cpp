//
// Created by akos on 2021. 11. 08..
//
#define CPPLOG_FILTER_LEVEL 1

#include <iostream>
#include "caff/caff_parser.cpp"
#include "cpplog.hpp"

int main(int argc, char *argv[]) {

	cpplog::StdErrLogger log;
    if (argc != 2) {
        LOG_ERROR(log) << "Usage: ./ciff <filename>" << std::endl;
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
	parser.parseCaff(filename);
	
	LOG_INFO(log) << "Parser finished" << std::endl;
	return 0;
}
