//
// Created by akos on 2021. 11. 08..
//

#ifndef TEAM0X00_INCLUDE_CAFF_CAFF_HPP
#define TEAM0X00_INCLUDE_CAFF_CAFF_HPP

#include <cstdint>
#include <vector>
#include <string>

struct caff_header_t {
	uint8_t magic[4];
	uint64_t header_size;
	uint64_t num_anim;
};

struct caff_credits_t {
	uint16_t year;
	uint8_t month;
	uint8_t day;
	uint8_t hour;
	uint8_t minute;
	uint64_t creator_len;
	std::string creator;
};

struct caff_animation_t {
	uint64_t duration;
	uint8_t ciff; 		// TODO: replace with CIFF type
};

struct block_t {
	uint8_t id;
	uint64_t length;
	std::vector<uint8_t> data;
};

struct caff_t {
	caff_header_t header;
	std::vector<caff_credits_t> credits;
	std::vector<caff_animation_t> animation;
};


#endif //TEAM0X00_INCLUDE_CAFF_CAFF_HPP
