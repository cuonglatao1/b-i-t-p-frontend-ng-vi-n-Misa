/**
 * Activity Popup Component
 * Xem hoat dong ung vien
 */

const ActivityPopup = {
    overlay: null,
    popup: null,
    currentCandidate: null,

    init() {
        this.createPopup();
        this.bindEvents();
    },

    createPopup() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        this.overlay.style.display = 'none';

        // Create popup
        this.popup = document.createElement('div');
        this.popup.className = 'popup-container activity-popup';
        this.popup.innerHTML = `
            <div class="popup-header">
                <h3 class="popup-title">Hoat dong: <span id="activityCandidateName">Ha Duc Hiep</span></h3>
                <button class="btn-close" onclick="ActivityPopup.close()">×</button>
            </div>
            <div class="popup-body">
                <div class="activity-tabs">
                    <button class="activity-tab active" data-tab="history">
                        <i class="icon icon-history"></i> Lich su
                    </button>
                    <button class="activity-tab" data-tab="like">
                        <i class="icon icon-like"></i> Thich
                    </button>
                    <button class="activity-tab" data-tab="comment">
                        <i class="icon icon-comment"></i> Binh luan
                    </button>
                    <button class="activity-tab" data-tab="task">
                        <i class="icon icon-task"></i> Nhiem vu
                    </button>
                </div>
                <div class="activity-content" id="activityContent">
                    <div class="empty-state">
                        <p>Khong co du lieu</p>
                    </div>
                </div>
            </div>
        `;

        this.overlay.appendChild(this.popup);
        document.body.appendChild(this.overlay);
    },

    bindEvents() {
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Tab switching
        this.popup.addEventListener('click', (e) => {
            const tab = e.target.closest('.activity-tab');
            if (tab) {
                this.switchTab(tab.dataset.tab);
            }
        });
    },

    switchTab(tabName) {
        // Update active tab
        const tabs = this.popup.querySelectorAll('.activity-tab');
        tabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update content
        const content = document.getElementById('activityContent');
        content.innerHTML = '<div class="empty-state"><p>Khong co du lieu</p></div>';
    },

    open(candidateName = 'Ha Duc Hiep') {
        if (!this.overlay) this.init();
        this.currentCandidate = candidateName;
        document.getElementById('activityCandidateName').textContent = candidateName;
        this.overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    close() {
        if (this.overlay) {
            this.overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
};
