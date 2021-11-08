//
// Created by akos on 2021. 11. 08..
//


#include "caff.hpp"
#include "../aixlog.hpp"
#include <stdint.h>
#include <vector>
#include <string>
#include <cstdint>
#include <fstream>
#include <iostream>
#include <sstream>
#include <cstring>

using namespace std;

class CaffParser {
	
	std::vector<uint8_t> read_file_to_uint8(std::string const &path_to_file) {
		std::ifstream instream(path_to_file, std::ios::in | std::ios::binary);
		std::vector<uint8_t> data((std::istreambuf_iterator<char>(instream)), std::istreambuf_iterator<char>());
		return data;
	}
	
	std::string uint8_vector_to_hex_string(const vector<uint8_t>& v) {
		std::string result;
		result.reserve(v.size() * 2);   // two digits per character
		static constexpr char hex[] = "0123456789ABCDEF";
		for (uint8_t c : v)
		{
			result.push_back(hex[c / 16]);
			result.push_back(hex[c % 16]);
		}
		return result;
	}
	
	std::string uint8_to_hex(const uint8_t& c) {
		std::string result;
		static constexpr char hex[] = "0123456789ABCDEF";
		result.push_back(hex[c / 16]);
		result.push_back(hex[c % 16]);
		return result;
	}
	
	block_t parse_block(std::vector<uint8_t> raw_file_content, int& block_index) {
		block_t new_block = {0};
		
		new_block.id = raw_file_content.at(block_index);	// extracting id
		block_index++;
		
		std::cout << "raw file size: " << raw_file_content.size() << endl;
		std::cout << "block id as hex: " << uint8_to_hex(new_block.id) << endl;
		/////////////////////////////////
		uint64_t length = 0;
		vector<uint8_t> length_v(&raw_file_content[block_index], &raw_file_content[block_index + 8]);
		memcpy(&length, length_v.data() + 0, sizeof(uint64_t));
		block_index += 8;
		
		std::cout << "block length as hex: " << uint8_vector_to_hex_string(length_v) << endl;
		std::cout << "length as uint32_t: " << length << endl;
		/////////////////////////////////
		vector<uint8_t> data(&raw_file_content[block_index], &raw_file_content[block_index + length]);
		block_index += length;
		std::cout << "data as hex: " << uint8_vector_to_hex_string(data) << std::endl;
		std::cout << block_index << std::endl;
		
		return new_block;
	}
	
	std::vector<block_t> parse_blocks(std::vector<uint8_t> raw_file_content) {
		std::vector<block_t> blocks;

		int block_index = 0;
		while(block_index < raw_file_content.size()) {
			block_t block = parse_block(raw_file_content, block_index);
			blocks.push_back(block);
		}
		
		return blocks;
	}
	
	void process_blocks_contents(caff_t& caff, std::vector<block_t>& blocks) {
		for (block_t block : blocks) {
			switch (block.id) {
				case uint8_t(0x01):
				{
					caff_header_t header = parse_caff_header(block.data);
					break;
				}
				case uint8_t(0x02):
				{
					caff_credits_t credits = parse_caff_credits(block.data);
					break;
				}
				case uint8_t(0x03):
				{
					caff_animation_t animation = parse_caff_animation(block.data);
					break;
				}
			}
		}
	}
	
	caff_header_t parse_caff_header(const std::vector<uint8_t>& data) {
		caff_header_t header = {0};
		return header;
	}
	
	caff_credits_t parse_caff_credits(const std::vector<uint8_t>& data) {
		caff_credits_t credits = {0};
		return credits;
	}
	
	caff_animation_t parse_caff_animation(const std::vector<uint8_t>& data) {
		caff_animation_t animation = {0};
		return animation;
	}
	
public:
	
	caff_t parseCaff(std::string const &path_to_file) {
		caff_t caff = {0};
		
		std::vector<uint8_t> file_content = read_file_to_uint8(path_to_file);
		//std::cout << uint8_vector_to_hex_string(file_content);
		std::vector<block_t> blocks = parse_blocks(file_content);
		process_blocks_contents(caff, blocks);
		
		return caff;
	}
	
	
};

