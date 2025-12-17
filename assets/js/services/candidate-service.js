/**
 * Candidate Service
 * Business logic cho CRUD operations - KHÔNG có UI code
 */

const CandidateService = {
    /**
     * Lay tat ca ung vien
     * @returns {Array} Danh sach ung vien
     */
    getAll() {
        return Storage.getCandidates();
    },

    /**
     * Lay ung vien theo ID
     * @param {number} id - ID ung vien
     * @returns {Object|null} Ung vien hoac null
     */
    getById(id) {
        const candidates = this.getAll();
        return candidates.find(c => c.id === id) || null;
    },

    /**
     * Them ung vien moi
     * @param {Object} candidateData - Du lieu ung vien
     * @returns {Object} { success: boolean, data?: Object, error?: string }
     */
    create(candidateData) {
        try {
            // Validate
            const errors = Validator.validateCandidateForm(candidateData);
            if (Object.keys(errors).length > 0) {
                return { success: false, error: 'Validation failed', errors };
            }

            // Save
            const success = Storage.addCandidate(candidateData);

            if (success) {
                return { success: true, data: candidateData };
            } else {
                return { success: false, error: 'Failed to save to storage' };
            }
        } catch (error) {
            console.error('CandidateService.create error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Cap nhat ung vien
     * @param {Object} candidateData - Du lieu ung vien
     * @returns {Object} { success: boolean, data?: Object, error?: string }
     */
    update(candidateData) {
        try {
            // Validate
            const errors = Validator.validateCandidateForm(candidateData);
            if (Object.keys(errors).length > 0) {
                return { success: false, error: 'Validation failed', errors };
            }

            // Update
            const success = Storage.updateCandidate(candidateData);

            if (success) {
                return { success: true, data: candidateData };
            } else {
                return { success: false, error: 'Candidate not found' };
            }
        } catch (error) {
            console.error('CandidateService.update error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Xoa ung vien
     * @param {number} id - ID ung vien
     * @returns {Object} { success: boolean, error?: string }
     */
    delete(id) {
        try {
            const success = Storage.deleteCandidate(id);

            if (success) {
                return { success: true };
            } else {
                return { success: false, error: 'Candidate not found' };
            }
        } catch (error) {
            console.error('CandidateService.delete error:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Tim kiem ung vien
     * @param {string} keyword - Tu khoa tim kiem
     * @returns {Array} Danh sach ung vien tim duoc
     */
    search(keyword) {
        const candidates = this.getAll();

        if (!keyword || keyword.trim() === '') {
            return candidates;
        }

        return Helpers.filterByKeyword(candidates, keyword, [
            'fullName', 'email', 'phoneNumber', 'source', 'campaign', 'position'
        ]);
    },

    /**
     * Loc ung vien theo dieu kien
     * @param {Object} filters - Cac dieu kien loc
     * @returns {Array} Danh sach ung vien sau khi loc
     */
    filter(filters) {
        let candidates = this.getAll();

        // Filter by campaign
        if (filters.campaign && filters.campaign.length > 0) {
            candidates = candidates.filter(c => filters.campaign.includes(c.campaign));
        }

        // Filter by position
        if (filters.position && filters.position.length > 0) {
            candidates = candidates.filter(c => filters.position.includes(c.position));
        }

        // Filter by round
        if (filters.round && filters.round.length > 0) {
            candidates = candidates.filter(c => filters.round.includes(c.recruitmentRound));
        }

        // Filter by talent pool
        if (filters.talent && filters.talent.length > 0) {
            candidates = candidates.filter(c => filters.talent.includes(c.talentPool));
        }

        // Filter by status
        if (filters.status && filters.status.length > 0) {
            candidates = candidates.filter(c => filters.status.includes(c.status));
        }

        return candidates;
    }
};
