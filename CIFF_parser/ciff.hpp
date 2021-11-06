#pragma once
#include <iostream>
#include <istream>
#include <vector>

template<class T = int64_t>
inline T readInt(std::istream& file) {
    T number;
    file.read(reinterpret_cast<char*>(&number), sizeof(T));
    if (file.fail()) {
        std::cout << "BAD FILE: File is too short" << std::endl;
    }
    return number;
}

static std::vector<char> readData(std::istream& file, int64_t length) {
    auto data = std::vector<char>((unsigned long)length);
    file.read(data.data(), length);
    if (file.fail()) {
        std::cout << "BAD FILE: File is too short" << std::endl;
    }
    return data;
}

static std::string readString(std::istream& file, int64_t length) {
    auto data = readData(file, length);
    auto str = std::string(data.begin(), data.end());
    return str;
}