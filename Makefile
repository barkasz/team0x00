
# the compiler: g++ for C++
CC = g++

# compiler flags:
#  -g     - this flag adds debugging information to the executable file
#  -Wall  - this flag is used to turn on most compiler warnings
CFLAGS = -wall -g

ciff_folder := CIFF_parser
depends := $(ciff_folder)/ciff.cpp $(ciff_folder)/ciff.hpp
output = $(ciff_folder)/ciff

all: ciff

ciff: $(depends)
	$(CC) -o $(output) $(depends)

clean: 
	rm $(output)