//
// Created by akos on 2021. 11. 08..
//
#define CPPLOG_FILTER_LEVEL 1

#include <iostream>
#include "caff/caff_parser.cpp"
#include "cpplog.hpp"

int main() {
	cpplog::StdErrLogger log;
	LOG_INFO(log) << "Parser started" << std::endl;
	
	std::string path_to_file = "./test-files/CAFF/official-test-file/2.caff";
	CaffParser parser;
	parser.parseCaff(path_to_file);
	
	LOG_INFO(log) << "Parser finished" << std::endl;
	return 0;
}
