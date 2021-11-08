//
// Created by akos on 2021. 11. 08..
//

#ifndef TEAM0X00_INCLUDE_CAFF_CAFF_HPP
#define TEAM0X00_INCLUDE_CAFF_CAFF_HPP

#include <stdint.h>
#include <vector>

struct caff_header {
	uint8_t magic[4];
	uint64_t header_size;
	uint64_t num_anim;
};

struct caff_credits {
	uint16_t year;
	uint8_t month;
	uint8_t day;
	uint8_t hour;
	uint8_t minute;
	uint64_t creator_len;
	std::vector<uint8_t> creator;
};

struct caff_animation {
	uint64_t duration;
	uint8_t ciff; 		// TODO: replace with CIFF type
};

struct block {
	uint8_t id;
	uint64_t length;
	std::vector<uint8_t> data;
};

#endif //TEAM0X00_INCLUDE_CAFF_CAFF_HPP
