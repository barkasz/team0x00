//
// Created by akos on 2021. 11. 08..
//

#ifndef TEAM0X00_INCLUDE_CAFF_CAFF_HPP
#define TEAM0X00_INCLUDE_CAFF_CAFF_HPP

#include <cstdint>
#include <vector>
#include <string>

const int HEADER_BLOCK_ID = 0x01;
const int CREDITS_BLOCK_ID = 0x02;
const int ANIMATION_BLOCK_ID = 0x03;

struct caff_header_t {
	uint8_t magic[4];
	uint64_t header_size;
	uint64_t num_anim;
};

const int HEADER_MAGIC_LENGTH = sizeof(uint8_t) * 4;
const int HEADER_HEADER_SIZE_LENGTH = sizeof(uint64_t);
const int HEADER_NUM_ANIM_LENGTH = sizeof(uint64_t);

struct caff_credits_t {
	uint16_t year;
	uint8_t month;
	uint8_t day;
	uint8_t hour;
	uint8_t minute;
	uint64_t creator_len;
	std::string creator;
};

const int CREDITS_YEAR_LENGTH = sizeof(uint16_t);
const int CREDITS_MONTH_LENGTH = sizeof(uint8_t);
const int CREDITS_DAY_LENGTH = sizeof(uint8_t);
const int CREDITS_HOUR_LENGTH = sizeof(uint8_t);
const int CREDITS_MINUTE_LENGTH = sizeof(uint8_t);
const int CREDITS_CREATOR_LEN_LENGTH = sizeof(uint64_t);


struct caff_animation_t {
	uint64_t duration;
	uint8_t ciff; 		// TODO: replace with CIFF type
};

const int ANIMATION_DURATION_LENGTH = sizeof(uint64_t);

struct block_t {
	uint8_t id;
	uint64_t length;
	std::vector<uint8_t> data;
};

const int BLOCK_ID_LENGTH = sizeof(uint8_t);
const int BLOCK_LENGTH_LENGTH = sizeof(uint64_t);

struct caff_t {
	caff_header_t header;
	std::vector<caff_credits_t> credits;
	std::vector<caff_animation_t> animation;
};


#endif //TEAM0X00_INCLUDE_CAFF_CAFF_HPP
