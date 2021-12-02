//
// Created by akos on 2021. 11. 08..
//

#include <cstdint>
#include <vector>
#include <fstream>
#include <iostream>
#include <cstring>
#include "caff.hpp"
#include "date_validator.hpp"
#include "../cpplog.hpp"

#ifndef TEAM0X00_INCLUDE_CAFF_CAFF_PARSER_CPP
#define TEAM0X00_INCLUDE_CAFF_CAFF_PARSER_CPP


class CaffParser {
	
	cpplog::StdErrLogger log;
	
	std::vector<uint8_t> read_file_to_uint8(std::string const &path_to_file) {
		std::ifstream instream(path_to_file,
                               std::ios::in | std::ios::binary);
        if(instream.is_open()) {
            std::vector<uint8_t> data((std::istreambuf_iterator<char>(instream)),
                                      std::istreambuf_iterator<char>());
            return data;
        }
        else{
            LOG_ERROR(log) << "The CAFF file doesn't exist!" << std::endl;
			exit(1);
        }
	}
	
	block_t parse_block(std::vector<uint8_t> raw_file_content, size_t& block_index) {
		block_t new_block = {0};
		
		new_block.id = raw_file_content.at(block_index);
		block_index += BLOCK_ID_LENGTH;

		memcpy(&new_block.length,
                raw_file_content.data() + block_index,
                BLOCK_LENGTH_LENGTH);
		block_index += BLOCK_LENGTH_LENGTH;

		std::vector<uint8_t> data_v(&raw_file_content[block_index],
                               &raw_file_content[block_index + new_block.length]);
		new_block.data = data_v;
		block_index += new_block.length;
		
		LOG_DEBUG(log) << "block parsing:" << std::endl;
		LOG_DEBUG(log) << "\tblock id as hex: " << (int)new_block.id << std::endl;
		LOG_DEBUG(log) << "\tlength as uint32_t: " << new_block.length << std::endl;
		
		return new_block;
	}
	
	std::vector<block_t> parse_blocks(const std::vector<uint8_t>& raw_file_content) {
		std::vector<block_t> blocks;

        size_t block_index = 0;
		while(block_index < raw_file_content.size()) {
			block_t block = parse_block(raw_file_content, block_index);
			blocks.push_back(block);
		}
		return blocks;
	}
	
	void process_blocks_contents(caff_t& caff, const std::vector<block_t>& blocks) {
	
		for (const block_t& block : blocks) {
			switch (block.id) {
				case CREDITS_BLOCK_ID:
					caff.credits.push_back(parse_caff_credits(block.data));
					break;
				case ANIMATION_BLOCK_ID:
					caff.animation.push_back(parse_caff_animation(block.data));
					break;
				default:
					LOG_ERROR(log) << "Invalid block ID..." << std::endl;
                    exit(1);
			}
		}
		
	}
	
	caff_header_t parse_caff_header(const std::vector<uint8_t>& data) {
		caff_header_t header = {0};
		int pointer = 0;
		
		memcpy(&header.magic,
                data.data(),
                HEADER_MAGIC_LENGTH);
		pointer += HEADER_MAGIC_LENGTH;

		memcpy(&header.header_size,
                data.data() + pointer,
                HEADER_HEADER_SIZE_LENGTH);
		pointer += HEADER_HEADER_SIZE_LENGTH;

		memcpy(&header.num_anim,
                data.data() + pointer,
                HEADER_NUM_ANIM_LENGTH);
		
		LOG_DEBUG(log) << "caff header: " << std::endl;
		LOG_DEBUG(log) << "\tmagic: " << header.magic << std::endl;
		LOG_DEBUG(log) << "\theader size: " << header.header_size << std::endl;
		LOG_DEBUG(log) << "\tnum_anim: " << header.num_anim << std::endl;
		
		return header;
	}
	
	caff_credits_t parse_caff_credits(const std::vector<uint8_t>& data) {
		caff_credits_t credits = {0};
		int pointer = 0;
		
		memcpy(&credits.year,
                data.data(),
                CREDITS_YEAR_LENGTH);
		pointer += CREDITS_YEAR_LENGTH;

		memcpy(&credits.month,
                data.data() + pointer,
                CREDITS_MONTH_LENGTH);
		pointer += CREDITS_MONTH_LENGTH;

		memcpy(&credits.day,
                data.data() + pointer,
                CREDITS_DAY_LENGTH);
		pointer += CREDITS_DAY_LENGTH;

		memcpy(&credits.hour,
                data.data() + pointer,
                CREDITS_HOUR_LENGTH);
		pointer += CREDITS_HOUR_LENGTH;

		memcpy(&credits.minute,
                data.data() + pointer,
                CREDITS_MINUTE_LENGTH);
		pointer += CREDITS_MINUTE_LENGTH;

		memcpy(&credits.creator_len,
                data.data() + pointer,
                CREDITS_CREATOR_LEN_LENGTH);
		pointer += CREDITS_CREATOR_LEN_LENGTH;

		std::string l_creator(data.begin() + pointer, data.end());
		credits.creator = l_creator;
		
		LOG_DEBUG(log) << "credits header: " <<  std::endl;
		LOG_DEBUG(log) << "\tyear: " << (int)credits.year << std::endl;
		LOG_DEBUG(log) << "\tmonth: " << (int)credits.month << std::endl;
		LOG_DEBUG(log) << "\tday: " << (int)credits.day << std::endl;
		LOG_DEBUG(log) << "\thour: " << (int)credits.hour << std::endl;
		LOG_DEBUG(log) << "\tminute: " << (int)credits.minute << std::endl;
		LOG_DEBUG(log) << "\tcreator_len: " << credits.creator_len << std::endl;
		LOG_DEBUG(log) << "\tcreator: " << credits.creator << std::endl;
		
		if(!is_valid_date((int)credits.day,
                          (int)credits.month,
                          (int)credits.year)) {
			LOG_ERROR(log) << "Invalid date!" << std::endl;
			exit(1);
		}
		
		if(!is_valid_time((int)credits.hour,
                          (int)credits.minute)) {
			LOG_ERROR(log) << "Invalid hour and minute!" << std::endl;
			exit(1);
		}
		
		return credits;
	}
	
	caff_animation_t parse_caff_animation(const std::vector<uint8_t>& data) {
		caff_animation_t animation = {0};
		int pointer = 0;
		
		memcpy(&animation.duration,
                data.data(),
                ANIMATION_DURATION_LENGTH);
		pointer += ANIMATION_DURATION_LENGTH;
		
		LOG_DEBUG(log) << "animation header: " <<  std::endl;
		LOG_DEBUG(log) << "\tduration: " << animation.duration << std::endl;
		
		std::vector<uint8_t> data_v(&data[pointer], &data[data.size()]);
		animation.ciff.parseCiff(data_v);
		
		return animation;
	}
	
	bool is_num_anim_valid(const std::vector<block_t>& blocks, uint64_t num_anim_expected) const {
        uint64_t num_of_anim_blocks = 0;
		for(const block_t& block : blocks) {
			if(block.id == ANIMATION_BLOCK_ID)
				num_of_anim_blocks++;
		}
		
		return num_of_anim_blocks == num_anim_expected;
	}
	
public:
	
	caff_t parseCaff(std::string const &path_to_file) {
		caff_t caff = {0};
		
		try {
            std::vector<uint8_t> file_content = read_file_to_uint8(path_to_file);
            std::vector<block_t> blocks = parse_blocks(file_content);

            if(blocks.at(0).id != HEADER_BLOCK_ID) {
                LOG_ERROR(log) << "Missing header!" << std::endl;
                exit(1);
            }

            caff.header = parse_caff_header(blocks.at(0).data);
            blocks.erase(blocks.begin()); // remove the first processed block.

            if(!is_num_anim_valid(blocks, caff.header.num_anim)) {
                LOG_ERROR(log) << "Number of animation blocks doesn't match!" << std::endl;
                exit(1);
            }
		
		process_blocks_contents(caff, blocks);
			
		} catch (const std::exception& e) {
			LOG_ERROR(log) << "Caff parsing failed!: " << e.what() << std::endl;
            exit(1);
		}
		
		return caff;
	}
	
};

#endif