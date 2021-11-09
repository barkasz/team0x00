//
// Created by akos on 2021. 11. 08..
//
#define CPPLOG_FILTER_LEVEL 1

#include <iostream>
#include "caff/caff_parser.cpp"
#include "cpplog.hpp"

int main() {
	cpplog::StdErrLogger log;
	LOG_INFO(log) << "Program started" << std::endl;
	std::string path_to_file = "./1.caff";
	CaffParser parser;
	parser.parseCaff(path_to_file);
	
	return 0;
}
