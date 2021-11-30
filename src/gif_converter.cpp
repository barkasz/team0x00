//
// Created by czurkod on 21/11/2021.
//

#include "gif_converter.h"
#include "gif-h/gif.h"


vector<uint8_t> gif_converter::convert(vector<pixel> pixels, uint64_t width, uint64_t height) {
    vector<uint8_t> image(width * height * 4);
    for (uint64_t i = 0; i < width * height; ++i) {
        image[i * 4] = pixels[i].r;
        image[i * 4 + 1] = pixels[i].g;
        image[i * 4 + 2] = pixels[i].b;
        image[i * 4 + 3] = 255;
    }
    return image;
}

//parser.parseCaff(filename) is already called
int gif_converter::convert_gif(std::string output_filename, caff_t caff_file) {
    uint64_t width = caff_file.animation[0].ciff.getWidth();
    uint64_t height = caff_file.animation[0].ciff.getHeight();
    GifWriter g;

    if (GifBegin(&g, output_filename.c_str(), width, height, caff_file.animation[0].duration / 10)) {
        for (uint64_t i = 0; i < caff_file.header.num_anim; i++) {
            width = caff_file.animation[i].ciff.getWidth();
            height = caff_file.animation[i].ciff.getHeight();
            vector<uint8_t> image = convert(caff_file.animation[i].ciff.getPixels(), width, height);

            if (!GifWriteFrame(&g, image.data(), width, height, caff_file.animation[i].duration / 10))
                return 1;
        }
        GifEnd(&g);
        return 0;
    } else {
        return 1;
    }
}