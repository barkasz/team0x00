
# the compiler: g++ for C++
CC = g++

# compiler flags:
#  -g     - this flag adds debugging information to the executable file
#  -Wall  - this flag is used to turn on most compiler warnings
CFLAGS = -wall -g

sources := src
ciff_folder := ciff
caff_folder := caff
depends_main := $(sources)/main.cpp
depends_ciff := $(sources)/$(ciff_folder)/ciff.cpp $(sources)/$(ciff_folder)/ciff.hpp $(sources)/cpplog.hpp
depends_caff := $(sources)/$(caff_folder)/caff_parser.cpp $(sources)/$(caff_folder)/caff.hpp $(sources)/cpplog.hpp $(sources)/$(caff_folder)/date_validator.hpp
output_ciff := ciff
output_caff := caff
output_parser := parser
output := $(output_parser) $(output_caff) $(output_ciff)

all: parser

parser: $(depends_ciff) $(depends_caff) $(depends_main)
	$(CC) -o $(output_parser) $(depends_main) $(depends_ciff) $(depends_caff)

clean:
	rm $(output)