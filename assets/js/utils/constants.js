/**
 * Constants and Enums
 * Định nghĩa các hằng số và enum cho toàn bộ project
 */

// Trạng thái ứng viên
const CandidateStatus = Object.freeze({
    APPLIED: 'Ứng tuyển',
    INTERVIEW: 'Phỏng vấn',
    OFFER: 'Offer',
    HIRED: 'Đã tuyển',
    PROBATION: 'Thử việc',
    REJECTED: 'Từ chối'
});

// Nguồn ứng viên
const CandidateSource = Object.freeze({
    WEBSITE: 'Website',
    REFERRAL: 'Giới thiệu',
    LINKEDIN: 'LinkedIn',
    FACEBOOK: 'Facebook',
    RECRUITMENT_FAIR: 'Hội chợ'
});

// Trình độ đào tạo
const EducationLevel = Object.freeze({
    HIGH_SCHOOL: 'Trung học',
    COLLEGE: 'Cao đẳng',
    BACHELOR: 'Đại học',
    MASTER: 'Thạc sĩ',
    PHD: 'Tiến sĩ'
});

// Giới tính
const Gender = Object.freeze({
    MALE: 'Nam',
    FEMALE: 'Nữ',
    OTHER: 'Khác'
});

// Loại thông báo toast
const ToastType = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
});

// Các key LocalStorage
const StorageKeys = {
    CANDIDATES: 'candidates',
    NEXT_ID: 'nextCandidateId',
    COLUMN_SETTINGS: 'columnSettings',
    FILTER_SETTINGS: 'filterSettings'
};

// Các ID DOM element
const DOMIds = {
    // Table
    CANDIDATE_TABLE: 'candidateTable',
    CANDIDATE_TABLE_BODY: 'candidateTableBody',

    // Popup
    CANDIDATE_POPUP: 'candidatePopup',
    POPUP_TITLE: 'popupTitle',
    BTN_CLOSE_POPUP: 'btnClosePopup',

    // Form
    CANDIDATE_FORM: 'candidateForm',

    // Search & Filter
    SEARCH_INPUT: 'searchInput',
    FILTER_SEARCH: 'filterSearch',

    // Pagination
    TOTAL_RECORDS: 'totalRecords',

    // Toast
    TOAST_CONTAINER: 'toastContainer'
};

// Các class CSS
const CSSClasses = {
    // Layout
    OVERLAY: 'overlay',
    POPUP_CONTAINER: 'popup-container',
    POPUP_SMALL: 'popup-small',

    // Buttons
    BTN_PRIMARY: 'btn btn-primary',
    BTN_SECONDARY: 'btn btn-secondary',
    BTN_ICON: 'btn-icon',
    BTN_CLOSE: 'btn-close',

    // Icons
    ICON: 'icon',
    ICON_DEFAULT: 'icon-default',

    // Form
    FORM_INPUT: 'form-input',
    FORM_ERROR: 'form-error',

    // Toast
    TOAST: 'toast',
    TOAST_SUCCESS: 'toast-success',
    TOAST_ERROR: 'toast-error',
    TOAST_WARNING: 'toast-warning',
    TOAST_INFO: 'toast-info'
};

// Thông báo
const Messages = {
    // Success
    ADD_SUCCESS: 'Thêm ứng viên thành công',
    UPDATE_SUCCESS: 'Cập nhật ứng viên thành công',
    DELETE_SUCCESS: 'Xóa ứng viên thành công',
    EXPORT_SUCCESS: 'Xuất file thành công',
    FILTER_APPLIED: 'Đã áp dụng bộ lọc',
    FILTER_CLEARED: 'Đã xóa bộ lọc',

    // Error
    LOAD_ERROR: 'Lỗi khi tải dữ liệu',
    SAVE_ERROR: 'Lỗi khi lưu dữ liệu',
    DELETE_ERROR: 'Lỗi khi xóa dữ liệu',
    VALIDATION_ERROR: 'Vui lòng kiểm tra lại thông tin',

    // Warning
    NO_DATA: 'Không có dữ liệu',
    CONFIRM_DELETE: 'Bạn có chắc chắn muốn xóa?',

    // Info
    LOADING: 'Đang tải...',
    PROCESSING: 'Đang xử lý...'
};

// Validation rules
const ValidationRules = {
    PHONE_REGEX: /^[0-9\s\-\+\(\)]{8,15}$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    REQUIRED_FIELDS: ['fullName', 'phoneNumber'],
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx']
};

// Pagination settings
const PaginationSettings = {
    DEFAULT_PAGE_SIZE: 25,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
    MAX_VISIBLE_PAGES: 5
};

// Column settings
const TableColumns = {
    PHONE: { id: 'phone', label: 'Số điện thoại', index: 1 },
    SOURCE: { id: 'source', label: 'Nguồn ứng viên', index: 2 },
    NAME: { id: 'name', label: 'Họ và tên', index: 3 },
    EMAIL: { id: 'email', label: 'Email', index: 4 },
    CAMPAIGN: { id: 'campaign', label: 'Chiến dịch tuyển dụng', index: 5 },
    POSITION: { id: 'position', label: 'Vị trí tuyển dụng', index: 6 },
    NEWS: { id: 'news', label: 'Tin tuyển dụng', index: 7 },
    ROUND: { id: 'round', label: 'Vòng tuyển dụng', index: 8 },
    RATING: { id: 'rating', label: 'Đánh giá', index: 9 },
    APPLICATION_DATE: { id: 'applicationDate', label: 'Ngày ứng tuyển', index: 10 },
    EDUCATION: { id: 'education', label: 'Trình độ đào tạo', index: 11 },
    SCHOOL: { id: 'school', label: 'Nơi đào tạo', index: 12 },
    MAJOR: { id: 'major', label: 'Chuyên ngành', index: 13 },
    WORKPLACE: { id: 'workplace', label: 'Nơi làm việc gần đây', index: 14 },
    RECRUITER: { id: 'recruiter', label: 'Nhân sự khai thác', index: 15 },
    DEPARTMENT: { id: 'department', label: 'Đơn vị sử dụng', index: 16 },
    MATCH: { id: 'match', label: 'Phù hợp với chân dung', index: 17 },
    LOCATION: { id: 'location', label: 'Khu vực', index: 18 },
    REFERRER: { id: 'referrer', label: 'Người giới thiệu', index: 19 },
    RECEPTION: { id: 'reception', label: 'Thông tin tiếp nhận', index: 20 },
    TALENT: { id: 'talent', label: 'Thuộc kho tiềm năng', index: 21 },
    STATUS: { id: 'status', label: 'Trạng thái', index: 22 }
};

// Filter types
const FilterTypes = {
    CAMPAIGN: 'campaign',
    POSITION: 'position',
    ROUND: 'round',
    TALENT: 'talent',
    STATUS: 'status'
};

// Export this for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CandidateStatus,
        CandidateSource,
        EducationLevel,
        Gender,
        ToastType,
        StorageKeys,
        DOMIds,
        CSSClasses,
        Messages,
        ValidationRules,
        PaginationSettings,
        TableColumns,
        FilterTypes
    };
}
