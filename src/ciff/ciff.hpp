#ifndef TEAM0X00_INCLUDE_CIFF_CIFF_HPP
#define TEAM0X00_INCLUDE_CIFF_CIFF_HPP

#include <iostream>
#include <istream>
#include <vector>

template<typename T>
inline T readData(std::vector<uint8_t> const &input, uint64_t pos) {
    T number;
    T temp;
    number = input.at(pos);
    for (uint64_t i = 1; i < sizeof(T); ++i) {
        temp = input.at(pos + i);
        temp = temp << i*8;
        number += temp;
    }
    return number;
}

#endif //TEAM0X00_INCLUDE_CIFF_CIFF_HPP
