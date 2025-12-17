/**
 * Storage Module
 * Xu ly tat ca cac thao tac voi LocalStorage
 */

const Storage = {
    // Key luu tru danh sach ung vien trong localStorage
    CANDIDATES_KEY: 'candidates',

    // Key luu tru trang thai sidebar (thu gon hay mo rong)
    SIDEBAR_STATE_KEY: 'sidebarCollapsed',

    /**
     * Lay danh sach ung vien tu localStorage
     * @returns {Array} Mang cac ung vien
     */
    getCandidates() {
        try {
            const data = localStorage.getItem(this.CANDIDATES_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting candidates from localStorage:', error);
            return [];
        }
    },

    /**
     * Luu danh sach ung vien vao localStorage
     * @param {Array} candidates - Mang cac ung vien can luu
     */
    saveCandidates(candidates) {
        try {
            localStorage.setItem(this.CANDIDATES_KEY, JSON.stringify(candidates));
        } catch (error) {
            console.error('Error saving candidates to localStorage:', error);
        }
    },

    /**
     * Them ung vien moi vao dau danh sach
     * @param {Object} candidate - Doi tuong ung vien moi
     * @returns {boolean} True neu them thanh cong
     */
    addCandidate(candidate) {
        try {
            const candidates = this.getCandidates();

            // Tao ID moi (lay ID lon nhat + 1)
            const maxId = candidates.length > 0
                ? Math.max(...candidates.map(c => c.id))
                : 0;
            candidate.id = maxId + 1;

            // Them vao dau mang
            candidates.unshift(candidate);

            this.saveCandidates(candidates);
            return true;
        } catch (error) {
            console.error('Error adding candidate:', error);
            return false;
        }
    },

    /**
     * Cap nhat thong tin ung vien
     * @param {Object} candidate - Doi tuong ung vien can cap nhat
     * @returns {boolean} True neu cap nhat thanh cong
     */
    updateCandidate(candidate) {
        try {
            const candidates = this.getCandidates();
            const index = candidates.findIndex(c => c.id === candidate.id);

            if (index !== -1) {
                candidates[index] = candidate;
                this.saveCandidates(candidates);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating candidate:', error);
            return false;
        }
    },

    /**
     * Xoa ung vien theo ID
     * @param {number} id - ID cua ung vien can xoa
     * @returns {boolean} True neu xoa thanh cong
     */
    deleteCandidate(id) {
        try {
            const candidates = this.getCandidates();
            const filtered = candidates.filter(c => c.id !== id);

            this.saveCandidates(filtered);
            return true;
        } catch (error) {
            console.error('Error deleting candidate:', error);
            return false;
        }
    },

    /**
     * Tim ung vien theo ID
     * @param {number} id - ID cua ung vien can tim
     * @returns {Object|null} Doi tuong ung vien hoac null neu khong tim thay
     */
    getCandidateById(id) {
        try {
            const candidates = this.getCandidates();
            return candidates.find(c => c.id === id) || null;
        } catch (error) {
            console.error('Error getting candidate by ID:', error);
            return null;
        }
    },

    /**
     * Khoi tao du lieu mau neu chua co du lieu
     */
    initializeSampleData() {
        const candidates = this.getCandidates();

        // Neu chua co du lieu, load du lieu mau tu CANDIDATE_DATA
        if (candidates.length === 0 && typeof CANDIDATE_DATA !== 'undefined') {
            this.saveCandidates(CANDIDATE_DATA);
            console.log('Sample data initialized:', CANDIDATE_DATA.length, 'candidates');
        }
    },

    /**
     * Lay trang thai sidebar (thu gon hay mo rong)
     * @returns {boolean} True neu sidebar dang thu gon
     */
    getSidebarState() {
        try {
            const state = localStorage.getItem(this.SIDEBAR_STATE_KEY);
            return state === 'true';
        } catch (error) {
            console.error('Error getting sidebar state:', error);
            return false;
        }
    },

    /**
     * Luu trang thai sidebar
     * @param {boolean} collapsed - True neu sidebar dang thu gon
     */
    saveSidebarState(collapsed) {
        try {
            localStorage.setItem(this.SIDEBAR_STATE_KEY, collapsed.toString());
        } catch (error) {
            console.error('Error saving sidebar state:', error);
        }
    },

    /**
     * Xoa tat ca du lieu trong localStorage
     */
    clearAll() {
        try {
            localStorage.removeItem(this.CANDIDATES_KEY);
            localStorage.removeItem(this.SIDEBAR_STATE_KEY);
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};
