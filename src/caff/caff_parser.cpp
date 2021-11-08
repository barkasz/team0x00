//
// Created by akos on 2021. 11. 08..
//


#include "caff.hpp"
#include <stdint.h>
#include <vector>
#include <string>
#include <cstdint>
#include <fstream>
#include <iostream>
#include <sstream>

class CaffParser {
	std::vector<block> blocks;
	
	std::vector<char> readFileToChar(std::string const &filename){
		std::vector<char> buffer;
		std::ifstream caffFile(filename, std::ios::binary);
		if (caffFile.is_open()) {
			caffFile.seekg(0, std::ios_base::end);
			size_t length = caffFile.tellg();
			caffFile.seekg(0, std::ios_base::beg);
			
			buffer.reserve(length);
			std::copy(std::istreambuf_iterator<char>(caffFile), std::istreambuf_iterator<char>(), std::back_inserter(buffer));
		}
		return buffer;
	}
	
	std::vector<uint8_t> readFileToUint8(std::string const &path_to_file) {
		std::ifstream instream(path_to_file, std::ios::in | std::ios::binary);
		std::vector<uint8_t> data((std::istreambuf_iterator<char>(instream)), std::istreambuf_iterator<char>());
		return data;
	}
	
public:
	
	CaffParser() {}
	
	void parseCaff(std::string const &path_to_file) {
		//std::vector<char> file_content = readFile(path_to_file);
		std::vector<uint8_t> file_content = readFileToUint8(path_to_file);
	}
	
};

