/**
 * Candidate Controller
 * Điều phối giữa UI components và Business Service
 * Xử lý events và orchestrate flow
 */

const CandidateController = {
    /**
     * Khởi tạo controller
     */
    init() {
        this.bindEvents();
        this.loadCandidates();
    },

    /**
     * Gắn các sự kiện UI
     */
    bindEvents() {
        // Button: Thêm ứng viên
        document.getElementById('btnAddCandidate')?.addEventListener('click', () => {
            this.handleAddClick();
        });

        // Button: Lưu trong popup
        document.getElementById('btnSave')?.addEventListener('click', () => {
            this.handleSave();
        });
    },

    /**
     * Load và hiển thị danh sách ứng viên
     */
    loadCandidates(filters = null) {
        try {
            // Get data from service
            let candidates = filters
                ? CandidateService.filter(filters)
                : CandidateService.getAll();

            // Apply search if exists
            const keyword = Search.getKeyword();
            if (keyword) {
                candidates = CandidateService.search(keyword);
            }

            // Paginate
            const paginationData = Helpers.paginate(
                candidates,
                Pagination.currentPage,
                Pagination.pageSize
            );

            // Render UI
            Table.render(paginationData.data);
            Pagination.update(paginationData.totalRecords);

        } catch (error) {
            console.error('CandidateController.loadCandidates error:', error);
            Toast.error('Lỗi khi tải danh sách ứng viên');
        }
    },

    /**
     * Xử lý khi click nút "Thêm ứng viên"
     */
    handleAddClick() {
        Popup.openAdd();
    },

    /**
     * Xử lý khi click nút "Lưu"
     */
    handleSave() {
        try {
            // Get form data
            const formData = Popup.getFormData();
            const mode = Popup.getMode();

            // Call service
            let result;
            if (mode === 'add') {
                result = CandidateService.create(formData);
            } else {
                result = CandidateService.update(formData);
            }

            // Handle result
            if (result.success) {
                const message = mode === 'add'
                    ? Messages.ADD_SUCCESS
                    : Messages.UPDATE_SUCCESS;

                Toast.success(message);
                Popup.close();
                this.loadCandidates();
            } else {
                // Show validation errors
                if (result.errors) {
                    Validator.showErrors(result.errors);
                } else {
                    Toast.error(result.error || 'Có lỗi xảy ra');
                }
            }

        } catch (error) {
            console.error('CandidateController.handleSave error:', error);
            Toast.error('Lỗi khi lưu ứng viên');
        }
    },

    /**
     * Xử lý khi edit ứng viên
     * @param {number} id - ID ứng viên
     */
    handleEdit(id) {
        try {
            Popup.openEdit(id);
        } catch (error) {
            console.error('CandidateController.handleEdit error:', error);
            Toast.error('Lỗi khi mở form chỉnh sửa');
        }
    },

    /**
     * Xử lý khi xóa ứng viên
     * @param {number} id - ID ứng viên
     */
    handleDelete(id) {
        if (!confirm(Messages.CONFIRM_DELETE)) {
            return;
        }

        try {
            const result = CandidateService.delete(id);

            if (result.success) {
                Toast.success(Messages.DELETE_SUCCESS);
                this.loadCandidates();
            } else {
                Toast.error(result.error || Messages.DELETE_ERROR);
            }

        } catch (error) {
            console.error('CandidateController.handleDelete error:', error);
            Toast.error(Messages.DELETE_ERROR);
        }
    },

    /**
     * Xử lý tìm kiếm
     * @param {string} keyword - Từ khóa tìm kiếm
     */
    handleSearch(keyword) {
        try {
            Search.keyword = keyword;
            this.loadCandidates();
        } catch (error) {
            console.error('CandidateController.handleSearch error:', error);
            Toast.error('Lỗi khi tìm kiếm');
        }
    },

    /**
     * Xử lý lọc dữ liệu
     * @param {Object} filters - Các điều kiện lọc
     */
    handleFilter(filters) {
        try {
            this.loadCandidates(filters);
        } catch (error) {
            console.error('CandidateController.handleFilter error:', error);
            Toast.error('Lỗi khi lọc dữ liệu');
        }
    }
};
