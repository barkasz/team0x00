
# the compiler: g++ for C++
CC = g++

# compiler flags:
#  -g     - this flag adds debugging information to the executable file
#  -Wall  - this flag is used to turn on most compiler warnings
CXXFLAGS = -Wall -g -std=c++11

sources := src
ciff_folder := ciff
caff_folder := caff
gif_folder := gif-h
depends_main := $(sources)/main.cpp
depends_ciff := $(sources)/$(ciff_folder)/ciff.cpp $(sources)/$(ciff_folder)/ciff.hpp $(sources)/cpplog.hpp
depends_caff := $(sources)/$(caff_folder)/caff_parser.cpp $(sources)/$(caff_folder)/caff.hpp $(sources)/cpplog.hpp $(sources)/$(caff_folder)/date_validator.hpp
depends_gif	:= $(sources)/$(gif_folder)/gif.h
depends_converter:= $(sources)/gif_converter.cpp $(sources)/gif_converter.h $(depends_gif)
output_parser := converter
third_party_converter := web-server/third_party/$(output_parser)
output := $(output_parser)

all: parser

parser: $(depends_ciff) $(depends_caff) $(depends_main)
	$(CC) $(CXXFLAGS) -o $(output_parser) $(depends_main) $(depends_ciff) $(depends_caff) $(depends_converter)

webserver_converter: $(depends_ciff) $(depends_caff) $(depends_main)
	$(CC) $(CXXFLAGS) -o $(third_party_converter) $(depends_main) $(depends_ciff) $(depends_caff) $(depends_converter)

clean:
	rm $(output)

.PHONY: clean all webserver_converter