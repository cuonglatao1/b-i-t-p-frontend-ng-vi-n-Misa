/**
 * Main Application
 * Khoi tao toan bo ung dung
 */

// Cho DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    console.log('AMIS Tuyen Dung - App Starting...');

    // 1. Khoi tao du lieu mau (neu chua co)
    Storage.initializeSampleData();

    // 2. Khoi tao cac components
    Toast.init();
    EducationValuePopup.init();
    ReferrerPopup.init();
    ColumnSettings.init();
    ActivityPopup.init();
    Popup.init();
    Table.init();
    Pagination.init();
    Search.init();

    // 3. Khoi tao cac modules
    SidebarModule.init();
    CandidateModule.init();

    console.log('AMIS Tuyen Dung - App Started!');
    console.log('Total candidates:', Storage.getCandidates().length);
});

/**
 * Xóa các ứng viên đã chọn
 */
function deleteSelectedCandidates() {
    console.log('deleteSelectedCandidates called');
    const checkedBoxes = document.querySelectorAll('.row-checkbox:checked');
    console.log('Checked boxes:', checkedBoxes.length);

    if (checkedBoxes.length === 0) {
        console.log('No checkboxes selected');
        return;
    }

    // Xác nhận xóa
    const confirmMessage = `Bạn có chắc chắn muốn xóa ${checkedBoxes.length} ứng viên đã chọn?`;
    if (!confirm(confirmMessage)) {
        console.log('User cancelled delete');
        return;
    }

    // Lấy danh sách ID cần xóa
    const idsToDelete = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.id));
    console.log('IDs to delete:', idsToDelete);

    // Xóa từng ứng viên
    let successCount = 0;
    idsToDelete.forEach(id => {
        if (CandidateModule.delete(id, true)) { // true = không confirm lại
            successCount++;
        }
    });

    // Bỏ tích checkbox "Chọn tất cả"
    const checkAllCheckbox = document.getElementById('checkAll');
    if (checkAllCheckbox) {
        checkAllCheckbox.checked = false;
    }

    // Ẩn button xóa
    const deleteBtn = document.getElementById('btnDeleteSelected');
    if (deleteBtn) {
        deleteBtn.style.display = 'none';
    }

    // Hiển thị thông báo
    if (successCount > 0) {
        Toast.success(`Đã xóa thành công ${successCount} ứng viên`);
    }

    // Reload danh sách
    CandidateModule.loadCandidates();
}
