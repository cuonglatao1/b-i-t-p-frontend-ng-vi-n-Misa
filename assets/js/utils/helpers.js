/**
 * Helpers Module
 * Các hàm tiện ích dùng chung
 */

const Helpers = {
    /**
     * Định dạng ngày tháng
     * @param {string} dateString - Chuỗi ngày dạng yyyy-mm-dd
     * @returns {string} Ngày đã định dạng dd/mm/yyyy
     */
    formatDate(dateString) {
        if (!dateString) return '--';

        try {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch (error) {
            return dateString;
        }
    },

    /**
     * Định dạng số điện thoại
     * @param {string} phone - Số điện thoại
     * @returns {string} Số điện thoại đã định dạng
     */
    formatPhoneNumber(phone) {
        if (!phone) return '--';
        return phone;
    },

    /**
     * Tạo avatar chữ cái đầu từ tên
     * @param {string} fullName - Họ tên
     * @returns {string} Chữ cái đầu (VD: "Nguyen Van A" -> "NVA")
     */
    getInitials(fullName) {
        if (!fullName) return '?';

        const words = fullName.trim().split(' ');
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }

        // Lấy chữ cái đầu của tên và họ
        const firstInitial = words[0].charAt(0);
        const lastInitial = words[words.length - 1].charAt(0);
        return (firstInitial + lastInitial).toUpperCase();
    },

    /**
     * Tạo màu ngẫu nhiên cho avatar
     * @param {string} text - Text để tạo màu
     * @returns {string} Mã màu hex
     */
    getAvatarColor(text) {
        const colors = [
            '#f44336', '#e91e63', '#9c27b0', '#673ab7',
            '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
            '#009688', '#4caf50', '#8bc34a', '#cddc39',
            '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
        ];

        // Sử dụng độ dài chuỗi để chọn màu
        const index = (text || '').length % colors.length;
        return colors[index];
    },

    /**
     * Debounce function - Trễ thời gian thực thi hàm
     * @param {Function} func - Hàm cần debounce
     * @param {number} delay - Thời gian trễ (ms)
     * @returns {Function} Hàm đã được debounce
     */
    debounce(func, delay = 300) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Lọc danh sách theo từ khóa tìm kiếm
     * @param {Array} list - Danh sách cần lọc
     * @param {string} keyword - Từ khóa tìm kiếm
     * @param {Array} fields - Các trường cần tìm kiếm
     * @returns {Array} Danh sách đã lọc
     */
    filterByKeyword(list, keyword, fields) {
        console.log('Helpers.filterByKeyword - keyword:', keyword, 'list length:', list.length);
        if (!keyword || keyword.trim() === '') {
            console.log('No keyword, returning full list');
            return list;
        }

        const lowerKeyword = keyword.toLowerCase().trim();
        console.log('Lowercase keyword:', lowerKeyword);

        const result = list.filter(item => {
            return fields.some(field => {
                const value = item[field];
                if (value === null || value === undefined) return false;
                const match = String(value).toLowerCase().includes(lowerKeyword);
                if (match) {
                    console.log('Match found in', field, ':', value);
                }
                return match;
            });
        });

        console.log('Filter result count:', result.length);
        return result;
    },

    /**
     * Sắp xếp danh sách theo trường
     * @param {Array} list - Danh sách cần sắp xếp
     * @param {string} field - Tên trường sắp xếp
     * @param {string} order - Thứ tự: 'asc' hoặc 'desc'
     * @returns {Array} Danh sách đã sắp xếp
     */
    sortBy(list, field, order = 'asc') {
        return [...list].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            if (aValue === bValue) return 0;

            let result = 0;
            if (aValue < bValue) result = -1;
            if (aValue > bValue) result = 1;

            return order === 'asc' ? result : -result;
        });
    },

    /**
     * Phân trang danh sách
     * @param {Array} list - Danh sách cần phân trang
     * @param {number} page - Trang hiện tại (bắt đầu từ 1)
     * @param {number} pageSize - Số phần tử trên 1 trang
     * @returns {Object} {data, totalPages, totalRecords}
     */
    paginate(list, page, pageSize) {
        const totalRecords = list.length;
        const totalPages = Math.ceil(totalRecords / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const data = list.slice(startIndex, endIndex);

        return {
            data,
            totalPages,
            totalRecords,
            currentPage: page,
            pageSize
        };
    },

    /**
     * Escape HTML để tránh XSS
     * @param {string} text - Text cần escape
     * @returns {string} Text đã escape
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    },

    /**
     * Copy text vào clipboard
     * @param {string} text - Text cần copy
     * @returns {Promise<boolean>} True nếu thành công
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Failed to copy:', error);
            return false;
        }
    },

    /**
     * Kiểm tra 2 object có bằng nhau không (deep compare)
     * @param {Object} obj1 - Object 1
     * @param {Object} obj2 - Object 2
     * @returns {boolean} True nếu bằng nhau
     */
    isEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
};
