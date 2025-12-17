/**
 * Candidate Module
 * Module xử lý nghiệp vụ CRUD ứng viên
 */

const CandidateModule = {
    /**
     * Khởi tạo module
     */
    init() {
        this.bindEvents();
        this.loadCandidates();
    },

    /**
     * Gắn các sự kiện
     */
    bindEvents() {
        // Nút thêm ứng viên
        document.getElementById('btnAddCandidate')?.addEventListener('click', () => {
            Popup.openAdd();
        });

        // Nút lưu trong popup
        document.getElementById('btnSave')?.addEventListener('click', () => {
            this.save();
        });
    },

    /**
     * Load danh sách ứng viên
     */
    loadCandidates() {
        console.log('CandidateModule.loadCandidates called');
        // Lấy tất cả ứng viên từ storage
        let candidates = Storage.getCandidates();
        console.log('Total candidates from storage:', candidates.length);

        // Tìm kiếm
        const keyword = Search.getKeyword();
        console.log('Search keyword:', keyword);
        if (keyword) {
            candidates = Helpers.filterByKeyword(candidates, keyword, [
                'fullName', 'email', 'phoneNumber', 'source', 'campaign', 'position'
            ]);
            console.log('Filtered candidates count:', candidates.length);
        }

        // Phân trang
        const paginationData = Helpers.paginate(
            candidates,
            Pagination.currentPage,
            Pagination.pageSize
        );
        console.log('Pagination data:', paginationData);

        // Render
        Table.render(paginationData.data);
        Pagination.update(paginationData.totalRecords);
    },

    /**
     * Thêm mới hoặc cập nhật ứng viên
     */
    save() {
        // Lấy dữ liệu từ form
        const formData = Popup.getFormData();

        // Validate
        const errors = Validator.validateCandidateForm(formData);

        if (Object.keys(errors).length > 0) {
            Validator.showErrors(errors);
            return;
        }

        // Lưu vào storage
        const mode = Popup.getMode();
        let success = false;

        if (mode === 'add') {
            success = Storage.addCandidate(formData);
            if (success) {
                Toast.success('Thêm ứng viên thành công!');
            } else {
                Toast.error('Thêm ứng viên thất bại!');
            }
        } else {
            success = Storage.updateCandidate(formData);
            if (success) {
                Toast.success('Cập nhật ứng viên thành công!');
            } else {
                Toast.error('Cập nhật ứng viên thất bại!');
            }
        }

        if (success) {
            Popup.close();
            this.loadCandidates();
        }
    },

    /**
     * Chỉnh sửa ứng viên
     * @param {number} id - ID ứng viên
     */
    edit(id) {
        Popup.openEdit(id);
    },

    /**
     * Xóa ứng viên
     * @param {number} id - ID ứng viên
     * @param {boolean} skipConfirm - Bỏ qua xác nhận
     */
    delete(id, skipConfirm = false) {
        if (!skipConfirm && !confirm('Bạn có chắc chắn muốn xóa ứng viên này?')) {
            return false;
        }

        const success = Storage.deleteCandidate(id);

        if (success) {
            if (!skipConfirm) {
                Toast.success('Xóa ứng viên thành công!');
                this.loadCandidates();
            }
            return true;
        } else {
            if (!skipConfirm) {
                Toast.error('Xóa ứng viên thất bại!');
            }
            return false;
        }
    }
};
