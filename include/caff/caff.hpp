//
// Created by akos on 2021. 11. 08..
//

#ifndef TEAM0X00_INCLUDE_CAFF_CAFF_HPP
#define TEAM0X00_INCLUDE_CAFF_CAFF_HPP

#include <stdint.h>
#include <vector>

struct caff_header {
	uint8_t[4] magic;
	uint64_t header_size;
	uint64_t num_anim;
} caff_header;

struct caff_credits {
	uint16_t year;
	uint8_t month;
	uint8_t day;
	uint8_t hour;
	uint8_t minute;
	uint64_t creator_len;
	std::vector<uint8_t> creator;
} caff_credits_t;

struct caff_animation {
	uint64_t duration;
	uint8_t ciff; 		// TODO: replace with CIFF type
} caff_animation_t;

struct block {
	uint8_t id;
	uint64_t length;
	std::vector<uint8_t> data;
} block_t;

#endif //TEAM0X00_INCLUDE_CAFF_CAFF_HPP
