#pragma once

#include <iostream>
#include <istream>
#include <vector>

template<typename T>
inline T readData(std::vector<uint8_t> const &input, uint64_t pos) {
    T number, temp;
    number = input.at(pos);
    for (int i = 1; i < sizeof(T); ++i) {
        temp = input.at(pos + i);
        temp = temp << i*8;
        number += temp;
    }
//    file.read(reinterpret_cast<char *>(&number), sizeof(T));
//    if (file.fail()) {
//        std::cout << "BAD FILE: File is too short" << std::endl;
//        exit(1);
//    }
    return number;
}