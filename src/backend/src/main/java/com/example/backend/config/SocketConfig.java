package com.example.backend.config;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import jakarta.annotation.PreDestroy;
import java.util.Map;

@Component
public class SocketConfig {

    private SocketIOServer server;

    @Bean
    public SocketIOServer socketIOServer() {
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(9092);
        server = new SocketIOServer(config);

        // Start the server
        server.start();

        // Start a thread to emit live data updates every 5 seconds
        Thread liveDataThread = new Thread(() -> {
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    Thread.sleep(5000);
                    int randomOccupancy = 700 + (int) (Math.random() * 50);
                    server.getBroadcastOperations().sendEvent("live_occupancy",
                            Map.of("count", randomOccupancy));
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
        liveDataThread.setDaemon(true);
        liveDataThread.start();

        return server;
    }

    @PreDestroy
    public void stopServer() {
        if (server != null) {
            server.stop();
        }
    }
}
