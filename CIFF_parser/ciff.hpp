#pragma once

#include <iostream>
#include <istream>
#include <vector>

template<typename T>
inline T readData(std::istream &file) {
    T number;
    file.read(reinterpret_cast<char *>(&number), sizeof(T));
    if (file.fail()) {
        std::cerr << "BAD FILE: File is too short" << std::endl;
        exit(1);
    }
    return number;
}