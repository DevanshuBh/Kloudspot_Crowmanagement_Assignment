package com.example.backend.controller;

import com.example.backend.model.AnalyticsSummary;
import com.example.backend.model.VisitorEntry;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CrowdController {

    // 1. Login endpoint
    @PostMapping("/auth/login")
    public Map<String, String> login(@RequestBody Map<String, String> creds) {
        if ("parking_solutions".equals(creds.get("email"))) {
            return Map.of("token", "dummy-token", "redirect", "/dashboard");
        }
        throw new RuntimeException("Invalid Login");
    }

    // 2. Dashboard Summary
    @PostMapping("/analytics/summary")
    public AnalyticsSummary getSummary() {
        return new AnalyticsSummary(734, 2436, "08min 30sec");
    }

    // 3. Demographics Chart
    @PostMapping("/analytics/demographics")
    public Map<String, Object> getDemographics() {
        return Map.of(
                "male", 55,
                "female", 45,
                "trend", List.of(100, 120, 110, 140));
    }

    // 4. Entries Table
    @PostMapping("/analytics/entry-exit")
    public Map<String, Object> getEntries(@RequestParam(defaultValue = "1") int page) {
        List<VisitorEntry> entries = new ArrayList<>();
        entries.add(new VisitorEntry("1", "Alice Johnson", "Female", "11:05 AM", "--", "--"));
        entries.add(new VisitorEntry("2", "Brian Smith", "Male", "11:03 AM", "--", "--"));
        entries.add(new VisitorEntry("3", "David Brown", "Male", "10:50 AM", "11:10 AM", "00:20"));

        return Map.of("data", entries, "totalPages", 5, "currentPage", page);
    }
}
