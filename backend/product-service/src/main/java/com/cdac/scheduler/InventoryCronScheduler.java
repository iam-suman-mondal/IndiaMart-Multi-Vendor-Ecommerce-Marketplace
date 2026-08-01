package com.cdac.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cdac.service.ProductInventoryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class InventoryCronScheduler {

    private final ProductInventoryService inventoryService;

    // Runs automatically every 15 Min (900000 ms)
    @Scheduled(fixedDelay = 900000)
    public void executeExpiredStockCleanup() {
        log.debug("Cron Job: Sweeping expired stock reservations...");
        inventoryService.releaseExpiredReservations();
    }
}
