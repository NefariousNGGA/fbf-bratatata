class NexusAutomation {
    constructor() {
        this.backendUrl = 'YOUR_RAILWAY_URL_HERE'; // We'll update this later
        this.isRunning = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.log('System initialized');
        this.updateStatus('ready');
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startAutomation();
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            this.stopAutomation();
        });
    }

    async startAutomation() {
        if (this.isRunning) return;

        const appstate = document.getElementById('appstate').value.trim();
        const message = document.getElementById('message').value.trim();
        const count = parseInt(document.getElementById('count').value) || 5;
        const delay = parseInt(document.getElementById('delay').value) || 15;
        const url = document.getElementById('url').value.trim();

        // Validation
        if (!appstate) {
            this.showError('Please enter AppState JSON');
            return;
        }

        if (!message) {
            this.showError('Please enter a message');
            return;
        }

        try {
            this.isRunning = true;
            this.updateUI(true);
            this.log('Starting automation...');
            this.updateStatus('running');

            // This will call the backend (we'll implement later)
            this.log('Backend integration coming soon...');
            
            // Simulate work for now
            setTimeout(() => {
                this.isRunning = false;
                this.updateUI(false);
                this.log('Automation completed (simulated)');
                this.updateStatus('ready');
            }, 2000);

        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
            this.updateStatus('error');
            this.isRunning = false;
            this.updateUI(false);
        }
    }

    stopAutomation() {
        if (this.isRunning) {
            this.isRunning = false;
            this.updateUI(false);
            this.log('Automation stopped by user');
            this.updateStatus('ready');
        }
    }

    updateUI(running) {
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        
        startBtn.disabled = running;
        stopBtn.disabled = !running;
    }

    updateStatus(status) {
        const statusEl = document.getElementById('status');
        statusEl.className = 'status ' + status;
        
        const texts = {
            ready: 'Ready to start',
            running: 'Automation running...',
            error: 'Error occurred'
        };
        
        statusEl.querySelector('.status-text').textContent = texts[status] || 'Ready to start';
    }

    log(message, type = 'info') {
        const logs = document.getElementById('logs');
        const timestamp = new Date().toLocaleTimeString();
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `> [${timestamp}] ${message}`;
        
        logs.appendChild(logEntry);
        logs.scrollTop = logs.scrollHeight;
        
        // Keep only last 20 entries
        while (logs.children.length > 20) {
            logs.removeChild(logs.firstChild);
        }
    }

    showError(message) {
        this.log(`ERROR: ${message}`, 'error');
        alert(message); // Simple error display
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.nexus = new NexusAutomation();
});