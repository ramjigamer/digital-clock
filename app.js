/**
 * Digital Clock Application
 * Updates every second to display current time in HH:MM:SS format
 */

class DigitalClock {
    constructor() {
        this.clockElement = document.getElementById('digital-clock');
        this.intervalId = null;
        this.init();
    }

    /**
     * Initialize the clock
     */
    init() {
        if (!this.clockElement) {
            console.error('Clock element not found');
            return;
        }

        // Start the clock immediately
        this.updateTime();
        this.startClock();
    }

    /**
     * Format number with leading zero if needed
     * @param {number} num - Number to format
     * @returns {string} - Formatted number string
     */
    formatTimeUnit(num) {
        return num.toString().padStart(2, '0');
    }

    /**
     * Get current time formatted as HH:MM:SS
     * @returns {string} - Formatted time string
     */
    getCurrentTime() {
        try {
            const now = new Date();
            const hours = this.formatTimeUnit(now.getHours());
            const minutes = this.formatTimeUnit(now.getMinutes());
            const seconds = this.formatTimeUnit(now.getSeconds());
            
            return `${hours}:${minutes}:${seconds}`;
        } catch (error) {
            console.error('Error getting current time:', error);
            return '00:00:00';
        }
    }

    /**
     * Update the clock display with current time
     */
    updateTime() {
        const currentTime = this.getCurrentTime();
        if (this.clockElement) {
            this.clockElement.textContent = currentTime;
        }
    }

    /**
     * Start the clock interval
     */
    startClock() {
        // Clear any existing interval
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        // Update every 1000 milliseconds (1 second)
        this.intervalId = setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    /**
     * Stop the clock interval
     */
    stopClock() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    /**
     * Restart the clock
     */
    restartClock() {
        this.stopClock();
        this.updateTime();
        this.startClock();
    }
}

// Initialize the clock when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const clock = new DigitalClock();
    
    // Handle visibility change to ensure accuracy when tab becomes active
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Update immediately when tab becomes visible
            clock.updateTime();
        }
    });

    // Expose clock instance globally for debugging (optional)
    window.digitalClock = clock;
});

// Fallback initialization in case DOMContentLoaded has already fired
if (document.readyState === 'loading') {
    // DOMContentLoaded event will handle initialization
} else {
    // DOM is already loaded
    const clock = new DigitalClock();
    window.digitalClock = clock;
}