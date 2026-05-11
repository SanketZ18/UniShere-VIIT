package com.unishare.util;

public final class FileNameSanitizer {

    private FileNameSanitizer() {
    }

    public static String sanitize(String fileName) {
        return fileName == null ? "file" : fileName.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
