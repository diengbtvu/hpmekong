package com.happyworld.mekong.util;

import org.springframework.stereotype.Component;
import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

@Component
public class SlugUtils {

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");
    private static final Pattern EDGESDHASHES = Pattern.compile("(^-|-$)");

    public String generateSlug(String input) {
        if (input == null || input.isEmpty()) {
            return "";
        }

        // Convert Vietnamese characters
        String slug = convertVietnamese(input);

        // Normalize and convert to lowercase
        String noWhitespace = WHITESPACE.matcher(slug).replaceAll("-");
        String normalized = Normalizer.normalize(noWhitespace, Normalizer.Form.NFD);
        String slug2 = NONLATIN.matcher(normalized).replaceAll("");
        slug2 = EDGESDHASHES.matcher(slug2).replaceAll("");

        return slug2.toLowerCase(Locale.ENGLISH);
    }

    private String convertVietnamese(String str) {
        str = str.replaceAll("[àáạảãâầấậẩẫăằắặẳẵ]", "a");
        str = str.replaceAll("[èéẹẻẽêềếệểễ]", "e");
        str = str.replaceAll("[ìíịỉĩ]", "i");
        str = str.replaceAll("[òóọỏõôồốộổỗơờớợởỡ]", "o");
        str = str.replaceAll("[ùúụủũưừứựửữ]", "u");
        str = str.replaceAll("[ỳýỵỷỹ]", "y");
        str = str.replaceAll("đ", "d");
        
        str = str.replaceAll("[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]", "A");
        str = str.replaceAll("[ÈÉẸẺẼÊỀẾỆỂỄ]", "E");
        str = str.replaceAll("[ÌÍỊỈĨ]", "I");
        str = str.replaceAll("[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]", "O");
        str = str.replaceAll("[ÙÚỤỦŨƯỪỨỰỬỮ]", "U");
        str = str.replaceAll("[ỲÝỴỶỸ]", "Y");
        str = str.replaceAll("Đ", "D");
        
        return str;
    }

    public String generateUniqueSlug(String baseSlug, int attempt) {
        if (attempt == 0) {
            return baseSlug;
        }
        return baseSlug + "-" + attempt;
    }
}

