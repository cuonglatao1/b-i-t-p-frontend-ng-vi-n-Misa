/**
 * Pagination Component
 * Xử lý phân trang
 */

const Pagination = {
    currentPage: 1,
    pageSize: 25,
    totalRecords: 0,

    init() {
        this.bindEvents();
    },

    bindEvents() {
        // Thay đổi số bản ghi/trang
        document.getElementById('pageSize')?.addEventListener('change', (e) => {
            this.pageSize = parseInt(e.target.value);
            this.currentPage = 1;
            CandidateModule.loadCandidates();
        });

        // Các nút phân trang
        document.getElementById('btnFirstPage')?.addEventListener('click', () => this.goToPage(1));
        document.getElementById('btnPrevPage')?.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        document.getElementById('btnNextPage')?.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        document.getElementById('btnLastPage')?.addEventListener('click', () => {
            const lastPage = Math.ceil(this.totalRecords / this.pageSize);
            this.goToPage(lastPage);
        });
    },

    goToPage(page) {
        const totalPages = Math.ceil(this.totalRecords / this.pageSize);
        if (page < 1 || page > totalPages) return;

        this.currentPage = page;
        CandidateModule.loadCandidates();
    },

    update(totalRecords) {
        this.totalRecords = totalRecords;
        this.render();
    },

    render() {
        const totalPages = Math.ceil(this.totalRecords / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, this.totalRecords);

        // Cập nhật thông tin
        const totalRecordsEl = document.getElementById('totalRecords');
        const pageInfoEl = document.getElementById('pageInfo');

        if (totalRecordsEl) totalRecordsEl.textContent = this.totalRecords;
        if (pageInfoEl) pageInfoEl.textContent = `${start} - ${end} bản ghi`;

        // Cập nhật trạng thái các nút
        const btnFirstPage = document.getElementById('btnFirstPage');
        const btnPrevPage = document.getElementById('btnPrevPage');
        const btnNextPage = document.getElementById('btnNextPage');
        const btnLastPage = document.getElementById('btnLastPage');

        if (btnFirstPage) btnFirstPage.disabled = this.currentPage === 1;
        if (btnPrevPage) btnPrevPage.disabled = this.currentPage === 1;
        if (btnNextPage) btnNextPage.disabled = this.currentPage === totalPages || totalPages === 0;
        if (btnLastPage) btnLastPage.disabled = this.currentPage === totalPages || totalPages === 0;
    },

    reset() {
        this.currentPage = 1;
        this.render();
    }
};
