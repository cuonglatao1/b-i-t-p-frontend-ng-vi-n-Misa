/**
 * Toast Component
 * Hiển thị thông báo toast (thành công, lỗi,...)
 */

const Toast = {
    container: null,

    /**
     * Khởi tạo toast container
     */
    init() {
        this.container = document.getElementById('toastContainer');
    },

    /**
     * Hiển thị toast
     * @param {string} message - Nội dung thông báo
     * @param {string} type - Loại toast: 'success' hoặc 'error'
     * @param {number} duration - Thời gian hiển thị (ms), mặc định 3000ms
     */
    show(message, type = 'success', duration = 3000) {
        if (!this.container) {
            this.init();
        }

        // Tạo phần tử toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;

        // Thêm vào container
        this.container.appendChild(toast);

        // Tự động ẩn sau duration
        setTimeout(() => {
            this.hide(toast);
        }, duration);
    },

    /**
     * Ẩn toast
     * @param {HTMLElement} toast - Phần tử toast cần ẩn
     */
    hide(toast) {
        toast.style.animation = 'slideOut 0.3s ease';

        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    },

    /**
     * Hiển thị toast thành công
     * @param {string} message - Nội dung thông báo
     */
    success(message) {
        this.show(message, 'success');
    },

    /**
     * Hiển thị toast lỗi
     * @param {string} message - Nội dung thông báo
     */
    error(message) {
        this.show(message, 'error');
    }
};

// Thêm animation slideOut vào CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
