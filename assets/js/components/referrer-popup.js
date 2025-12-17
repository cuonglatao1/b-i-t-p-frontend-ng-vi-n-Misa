/**
 * Referrer Popup Component
 * Xu ly popup them nguoi gioi thieu
 */

const ReferrerPopup = {
    overlay: null,
    dropdown: null,
    allReferrers: [],
    selectedReferrers: [],

    /**
     * Khoi tao popup
     */
    init() {
        this.overlay = document.getElementById('referrerPopup');
        this.dropdown = document.getElementById('referrerDropdown');
        this.bindEvents();
        this.loadSampleReferrers();
    },

    /**
     * Load du lieu mau nguoi gioi thieu
     */
    loadSampleReferrers() {
        this.allReferrers = [
            {
                id: 1,
                name: 'Lai Lan Anh',
                email: '',
                department: 'Phong Ky Thuat',
                avatar: 'LA'
            },
            {
                id: 2,
                name: 'Hoang Anh Minh',
                email: 'hoanganhh319323@gmail.com',
                department: 'Phong Kinh Doanh',
                avatar: 'HAM'
            },
            {
                id: 3,
                name: 'Dinh Nga QTHT NPNAM',
                email: 'anhhienn.test90@gmail.com',
                department: 'Phong Nhan Su',
                avatar: 'DN'
            }
        ];
        this.renderDropdownList();
    },

    /**
     * Gan cac su kien
     */
    bindEvents() {
        // Nut hien dropdown search
        document.getElementById('btnShowReferrerSearch')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Nut them moi - mo popup
        document.getElementById('btnAddNewReferrer')?.addEventListener('click', () => {
            this.hideDropdown();
            this.openPopup();
        });

        // Search input
        document.getElementById('referrerSearchInput')?.addEventListener('input', (e) => {
            this.filterReferrers(e.target.value);
        });

        // Nut dong popup
        document.getElementById('btnCloseReferrer')?.addEventListener('click', () => this.closePopup());
        document.getElementById('btnCancelReferrer')?.addEventListener('click', () => this.closePopup());

        // Click ngoai popup de dong
        this.overlay?.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closePopup();
            }
        });

        // Nut luu popup
        document.getElementById('btnSaveReferrer')?.addEventListener('click', () => this.saveNewReferrer());

        // Click ngoai dropdown de dong
        document.addEventListener('click', (e) => {
            if (!this.dropdown?.contains(e.target) && e.target.id !== 'btnShowReferrerSearch') {
                this.hideDropdown();
            }
        });
    },

    /**
     * Toggle dropdown
     */
    toggleDropdown() {
        this.dropdown?.classList.toggle('show');
        if (this.dropdown?.classList.contains('show')) {
            document.getElementById('referrerSearchInput').value = '';
            this.renderDropdownList();
        }
    },

    /**
     * Hien dropdown
     */
    showDropdown() {
        this.dropdown?.classList.add('show');
    },

    /**
     * An dropdown
     */
    hideDropdown() {
        this.dropdown?.classList.remove('show');
    },

    /**
     * Render danh sach trong dropdown
     */
    renderDropdownList(filteredList = null) {
        const list = document.getElementById('referrerDropdownList');
        if (!list) return;

        const referrers = filteredList || this.allReferrers;

        list.innerHTML = referrers.map(ref => `
            <div class="referrer-dropdown-item" data-id="${ref.id}">
                <div class="referrer-avatar">${ref.avatar}</div>
                <div class="referrer-info">
                    <div class="referrer-name">${ref.name}</div>
                    ${ref.email ? `<div class="referrer-email">${ref.email}</div>` : ''}
                </div>
            </div>
        `).join('');

        // Gan su kien click cho cac item
        list.querySelectorAll('.referrer-dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.selectReferrer(id);
            });
        });
    },

    /**
     * Filter referrers theo keyword
     */
    filterReferrers(keyword) {
        if (!keyword.trim()) {
            this.renderDropdownList();
            return;
        }

        const filtered = this.allReferrers.filter(ref =>
            ref.name.toLowerCase().includes(keyword.toLowerCase()) ||
            (ref.email && ref.email.toLowerCase().includes(keyword.toLowerCase()))
        );

        this.renderDropdownList(filtered);
    },

    /**
     * Chon nguoi gioi thieu tu dropdown
     */
    selectReferrer(id) {
        const referrer = this.allReferrers.find(r => r.id === id);
        if (!referrer) return;

        // Kiem tra da chon chua
        if (this.selectedReferrers.find(r => r.id === id)) {
            Toast.error('Nguoi gioi thieu da duoc chon');
            return;
        }

        this.selectedReferrers.push(referrer);
        this.addReferrerToSelectedList(referrer);
        this.hideDropdown();
        Toast.success('Da them nguoi gioi thieu');
    },

    /**
     * Them referrer vao danh sach da chon
     */
    addReferrerToSelectedList(referrer) {
        const list = document.getElementById('referrerSelectedList');
        if (!list) return;

        const item = document.createElement('div');
        item.className = 'referrer-item';
        item.dataset.id = referrer.id;
        item.innerHTML = `
            <div class="referrer-avatar">${referrer.avatar}</div>
            <div class="referrer-info">
                <div class="referrer-name">${referrer.name}</div>
                ${referrer.email ? `<div class="referrer-email">${referrer.email}</div>` : ''}
            </div>
            <button type="button" class="btn-remove-item" onclick="ReferrerPopup.removeReferrer(this)">-</button>
        `;
        list.appendChild(item);
    },

    /**
     * Xoa referrer khoi danh sach da chon
     */
    removeReferrer(btn) {
        const item = btn.closest('.referrer-item');
        if (item) {
            const id = parseInt(item.dataset.id);
            // Xoa khoi mang selectedReferrers
            this.selectedReferrers = this.selectedReferrers.filter(r => r.id !== id);
            // Xoa khoi DOM
            item.remove();
            Toast.success('Da xoa nguoi gioi thieu');
        }
    },

    /**
     * Mo popup them moi
     */
    openPopup() {
        this.clearForm();
        this.overlay?.classList.add('show');
    },

    /**
     * Dong popup
     */
    closePopup() {
        this.overlay?.classList.remove('show');
        this.clearForm();
    },

    /**
     * Xoa du lieu form
     */
    clearForm() {
        document.getElementById('referrerForm')?.reset();
    },

    /**
     * Luu nguoi gioi thieu moi
     */
    saveNewReferrer() {
        const name = document.getElementById('referrerName').value.trim();
        const department = document.getElementById('referrerDepartment').value;

        if (!name) {
            Toast.error('Vui long nhap ho va ten');
            return;
        }

        if (!department) {
            Toast.error('Vui long chon phong ban');
            return;
        }

        // Tao avatar tu ten
        const words = name.split(' ');
        let avatar = '';
        if (words.length >= 2) {
            avatar = words[words.length - 2][0] + words[words.length - 1][0];
        } else {
            avatar = words[0].substring(0, 2);
        }

        const referrer = {
            id: Date.now(),
            name: name,
            email: '',
            department: department,
            avatar: avatar.toUpperCase()
        };

        // Them vao danh sach tat ca
        this.allReferrers.push(referrer);

        // Them vao danh sach da chon
        this.selectedReferrers.push(referrer);
        this.addReferrerToSelectedList(referrer);

        this.closePopup();
        Toast.success('Da them nguoi gioi thieu moi');
    },

    /**
     * Lay danh sach nguoi gioi thieu da chon
     */
    getSelectedReferrers() {
        return this.selectedReferrers;
    }
};
