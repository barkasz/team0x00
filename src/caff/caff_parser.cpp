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
		memcpy(&new_block.length, raw_file_content.data() + block_index, sizeof(uint64_t));
		block_index += 8;
		vector<uint8_t> data_v(&raw_file_content[block_index], &raw_file_content[block_index + new_block.length]);
		new_block.data = data_v;
		block_index += new_block.length;
		
		std::cout << "block id as hex: " << uint8_to_hex(new_block.id) << endl;
		std::cout << "length as uint32_t: " << new_block.length << endl;
		std::cout << "data as hex: " << uint8_vector_to_hex_string(new_block.data) << std::endl;
		
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
					caff.header = parse_caff_header(block.data);
					break;
				}
				case uint8_t(0x02):
				{
					caff.credits.push_back(parse_caff_credits(block.data));
					break;
				}
				case uint8_t(0x03):
				{
					caff.animation.push_back(parse_caff_animation(block.data));
					break;
				}
				default: break;
			}
		}
	}
	
	caff_header_t parse_caff_header(const std::vector<uint8_t> data) {
		caff_header_t header = {0};
		
		memcpy(&header.magic, data.data() + 0, sizeof(uint8_t) * 4);
		memcpy(&header.header_size, data.data() + 4, sizeof(uint64_t));
		memcpy(&header.num_anim, data.data() + 12, sizeof(uint64_t));
		
		std::cout << header.magic << std::endl;
		std::cout << header.header_size << std::endl;
		std::cout << header.num_anim << std::endl;
		
		return header;
	}
	
	caff_credits_t parse_caff_credits(const std::vector<uint8_t> data) {
		caff_credits_t credits = {0};
		
		memcpy(&credits.year, data.data() + 0, sizeof(uint8_t) * 2);
		memcpy(&credits.month, data.data() + 2, sizeof(uint8_t));
		memcpy(&credits.day, data.data() + 3, sizeof(uint8_t));
		memcpy(&credits.hour, data.data() + 4, sizeof(uint8_t));
		memcpy(&credits.minute, data.data() + 5, sizeof(uint8_t));
		memcpy(&credits.creator_len, data.data() + 6, sizeof(uint64_t));
		
		std::string l_creator(data.begin() + 14, data.end());
		credits.creator = l_creator;
		
		std::cout << credits.year << std::endl;
		std::cout << uint8_to_hex(credits.month) << std::endl;
		std::cout << uint8_to_hex(credits.day) << std::endl;
		std::cout << uint8_to_hex(credits.hour) << std::endl;
		std::cout << uint8_to_hex(credits.minute) << std::endl;
		std::cout << credits.creator_len << std::endl;
		std::cout << credits.creator << std::endl;
		
		return credits;
	}
	
	caff_animation_t parse_caff_animation(const std::vector<uint8_t> data) {
		caff_animation_t animation = {0};
		
		memcpy(&animation.duration, data.data() + 0, sizeof(uint64_t));
		std::cout << animation.duration << std::endl;
		
		// TODO: implement CAFF
		
		return animation;
	}
	
public:
	
	caff_t parseCaff(std::string const &path_to_file) {
		caff_t caff = {0};
		
		std::vector<uint8_t> file_content = read_file_to_uint8(path_to_file);
		std::vector<block_t> blocks = parse_blocks(file_content);
		process_blocks_contents(caff, blocks);
		
		return caff;
	}
	
};

