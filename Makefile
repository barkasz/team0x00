# the compiler: g++ for C++
CC = g++

# compiler flags:
#  -g     - this flag adds debugging information to the executable file
#  -Wall  - this flag is used to turn on most compiler warnings
CFLAGS = -std=c++11 -wall -g

sources := src
target := target
caff_folder := caff
depends := $(sources)/$(caff_folder)/caff_parser.cpp $(sources)/main.cpp $(sources)/$(caff_folder)/caff.hpp $(sources)/aixlog.hpp
output = parser

caff: $(depends)
	$(CC) -o $(output) $(depends)

clean:
	rm $(output)