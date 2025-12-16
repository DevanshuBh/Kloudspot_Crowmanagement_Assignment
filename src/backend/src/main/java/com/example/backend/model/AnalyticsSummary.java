package com.example.backend.model;

public record AnalyticsSummary(
        int liveOccupancy,
        int todaysFootfall,
        String avgDwellTime) {
}
