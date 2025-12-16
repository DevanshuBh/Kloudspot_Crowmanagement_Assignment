package com.example.backend.model;

public record VisitorEntry(
        String id,
        String name,
        String sex,
        String entryTime,
        String exitTime,
        String dwellTime) {
}
