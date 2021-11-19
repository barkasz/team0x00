cmake_minimum_required(VERSION 3.15.3)
project(CAFF_parser)

set(CMAKE_CXX_STANDARD 17)

include_directories(./src)

add_executable(parser
        src/main.cpp
        src/caff/caff.hpp
        src/caff/caff_parser.cpp
        src/cpplog.hpp
        src/caff/date_validator.hpp
        src/ciff/ciff.cpp
        src/ciff/ciff.hpp
        src/gif-h/gif.h)
