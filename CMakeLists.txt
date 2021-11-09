cmake_minimum_required(VERSION 3.20)
project(CAFF_parser)

set(CMAKE_CXX_STANDARD 17)

include_directories(./src)

add_executable(CAFF_parser
        src/main.cpp
        src/caff/caff.hpp
        src/caff/caff_parser.cpp)

add_executable(CIFF_parser
        src/ciff/ciff.cpp
        src/ciff/ciff.hpp)
