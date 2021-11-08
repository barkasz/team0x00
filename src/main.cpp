//
// Created by akos on 2021. 11. 08..
//

#include <iostream>
#include <string>
#include <vector>
#include <stdint.h>
#include "caff/caff_parser.cpp"

int main() {
	std::string path_to_file = "./1.caff";
	CaffParser parser;
	parser.parseCaff(path_to_file);
	
	std::cout << "Finished" << std::endl;
	return 0;
}
