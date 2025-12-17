/**
 * Search Component
 * Xử lý tìm kiếm
 */

const Search = {
    keyword: '',

    init() {
        this.bindEvents();
    },

    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        console.log('Search.bindEvents - searchInput:', searchInput);

        if (searchInput) {
            // Sử dụng debounce để tránh tìm kiếm quá nhiều lần
            searchInput.addEventListener('input', Helpers.debounce((e) => {
                console.log('Search input event - value:', e.target.value);
                this.keyword = e.target.value;
                console.log('Search.keyword set to:', this.keyword);
                Pagination.reset();
                CandidateModule.loadCandidates();
            }, 300));
            console.log('Search event listener added');
        } else {
            console.error('searchInput element not found!');
        }
    },

    getKeyword() {
        return this.keyword;
    },

    clear() {
        this.keyword = '';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
    }
};
