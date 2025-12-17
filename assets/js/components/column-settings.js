/**
 * Column Settings Component
 * Thiết lập hiển thị cột - ẩn/hiện cột trên bảng
 */

const ColumnSettings = {
    overlay: null,
    popup: null,
    draggedItem: null,
    columns: [
        { id: 'phone', label: 'Số điện thoại', visible: true, order: 1 },
        { id: 'source', label: 'Nguồn ứng viên', visible: true, order: 2 },
        { id: 'name', label: 'Họ và tên', visible: true, order: 3 },
        { id: 'email', label: 'Email', visible: true, order: 4 },
        { id: 'campaign', label: 'Chiến dịch tuyển dụng', visible: true, order: 5 },
        { id: 'position', label: 'Vị trí tuyển dụng', visible: true, order: 6 },
        { id: 'news', label: 'Tin tuyển dụng', visible: true, order: 7 },
        { id: 'round', label: 'Vòng tuyển dụng', visible: true, order: 8 },
        { id: 'rating', label: 'Đánh giá', visible: true, order: 9 },
        { id: 'applicationDate', label: 'Ngày ứng tuyển', visible: true, order: 10 },
        { id: 'education', label: 'Trình độ đào tạo', visible: true, order: 11 },
        { id: 'school', label: 'Nơi đào tạo', visible: true, order: 12 },
        { id: 'major', label: 'Chuyên ngành', visible: true, order: 13 },
        { id: 'workplace', label: 'Nơi làm việc gần đây', visible: true, order: 14 },
        { id: 'recruiter', label: 'Nhân sự khai thác', visible: true, order: 15 },
        { id: 'department', label: 'Đơn vị sử dụng', visible: true, order: 16 },
        { id: 'match', label: 'Phù hợp với chân dung', visible: true, order: 17 },
        { id: 'location', label: 'Khu vực', visible: true, order: 18 },
        { id: 'referrer', label: 'Người giới thiệu', visible: true, order: 19 },
        { id: 'reception', label: 'Thông tin tiếp nhận', visible: true, order: 20 },
        { id: 'talent', label: 'Thuộc kho tiềm năng', visible: true, order: 21 },
        { id: 'status', label: 'Trạng thái', visible: true, order: 22 }
    ],

    init() {
        // Load saved settings from localStorage
        const saved = localStorage.getItem('columnSettings');
        if (saved) {
            try {
                const savedColumns = JSON.parse(saved);
                // Merge with default columns to ensure all columns exist
                this.columns = this.columns.map(defaultCol => {
                    const savedCol = savedColumns.find(c => c.id === defaultCol.id);
                    return savedCol ? { ...defaultCol, ...savedCol } : defaultCol;
                });
                // Sort by order
                this.columns.sort((a, b) => a.order - b.order);
            } catch (e) {
                console.error('Error loading column settings:', e);
            }
        }

        this.createPopup();
        this.bindEvents();
    },

    createPopup() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        this.overlay.style.display = 'none';

        // Create popup
        this.popup = document.createElement('div');
        this.popup.className = 'popup-container column-settings-popup';
        this.popup.innerHTML = `
            <div class="popup-header">
                <h3 class="popup-title">Thiết lập hiển thị cột</h3>
                <button class="btn-close" onclick="ColumnSettings.close()">
                    <i class="icon-default icon-close"></i>
                </button>
            </div>
            <div class="popup-body">
                <div class="form-group" style="margin-bottom: 16px;">
                    <input type="text" class="form-input" id="columnSearch" placeholder="Tìm kiếm cột...">
                </div>
                <div class="column-actions" style="margin-bottom: 16px;">
                    <button class="btn btn-secondary" onclick="ColumnSettings.selectAll()" style="margin-right: 8px;">Chọn tất cả</button>
                    <button class="btn btn-secondary" onclick="ColumnSettings.deselectAll()">Bỏ chọn tất cả</button>
                </div>
                <div class="column-list" id="columnList">
                    ${this.renderColumnList()}
                </div>
            </div>
            <div class="popup-footer">
                <button class="btn btn-secondary" onclick="ColumnSettings.close()">Hủy</button>
                <button class="btn btn-primary" onclick="ColumnSettings.apply()">Lưu</button>
            </div>
        `;

        this.overlay.appendChild(this.popup);
        document.body.appendChild(this.overlay);
    },

    renderColumnList() {
        return this.columns.map((col, index) => `
            <div class="column-item" draggable="true" data-index="${index}">
                <input type="checkbox" class="checkbox" ${col.visible ? 'checked' : ''}
                    onchange="ColumnSettings.toggleColumn(${index}, this.checked)">
                <span>${col.label}</span>
            </div>
        `).join('');
    },

    toggleColumn(index, checked) {
        this.columns[index].visible = checked;
    },

    selectAll() {
        this.columns.forEach(col => col.visible = true);
        this.refreshColumnList();
    },

    deselectAll() {
        this.columns.forEach(col => col.visible = false);
        this.refreshColumnList();
    },

    refreshColumnList() {
        const columnList = document.getElementById('columnList');
        if (columnList) {
            columnList.innerHTML = this.renderColumnList();
            this.bindDragEvents();
        }
    },

    bindEvents() {
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Search functionality
        document.addEventListener('input', (e) => {
            if (e.target.id === 'columnSearch') {
                this.filterColumns(e.target.value);
            }
        });

        // Bind drag events initially
        this.bindDragEvents();
    },

    bindDragEvents() {
        const columnList = document.getElementById('columnList');
        if (!columnList) return;

        const items = columnList.querySelectorAll('.column-item');

        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                this.draggedItem = item;
                item.style.opacity = '0.5';
                e.dataTransfer.effectAllowed = 'move';
            });

            item.addEventListener('dragend', () => {
                item.style.opacity = '1';
                this.draggedItem = null;
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';

                if (!this.draggedItem) return;

                const afterElement = this.getDragAfterElement(columnList, e.clientY);
                if (afterElement == null) {
                    columnList.appendChild(this.draggedItem);
                } else {
                    columnList.insertBefore(this.draggedItem, afterElement);
                }
            });

            item.addEventListener('drop', (e) => {
                e.preventDefault();
                this.updateColumnOrder();
            });
        });
    },

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.column-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    },

    updateColumnOrder() {
        const columnList = document.getElementById('columnList');
        const items = columnList.querySelectorAll('.column-item');

        const newColumns = [];
        items.forEach((item, newIndex) => {
            const oldIndex = parseInt(item.dataset.index);
            const col = this.columns[oldIndex];
            col.order = newIndex + 1;
            newColumns.push(col);
        });

        this.columns = newColumns;
        this.refreshColumnList();
    },

    filterColumns(keyword) {
        const items = this.popup.querySelectorAll('.column-item');
        const lowerKeyword = keyword.toLowerCase();

        items.forEach(item => {
            const label = item.querySelector('span').textContent.toLowerCase();
            if (label.includes(lowerKeyword)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    },

    open() {
        if (!this.overlay) this.init();
        const columnList = document.getElementById('columnList');
        if (columnList) {
            columnList.innerHTML = this.renderColumnList();
            this.bindDragEvents();
        }
        this.overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    close() {
        if (this.overlay) {
            this.overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    apply() {
        // Save settings to localStorage
        localStorage.setItem('columnSettings', JSON.stringify(this.columns));

        // Debug: log column order
        console.log('Applying column settings:');
        this.columns.forEach(col => {
            console.log(`${col.label} - order: ${col.order}, visible: ${col.visible}`);
        });

        // Update table headers and cells
        this.updateTableDisplay();

        Toast.success('Đã cập nhật hiển thị cột');
        this.close();
    },

    updateTableDisplay() {
        const table = document.getElementById('candidateTable');
        if (!table) return;

        console.log('Updating table display...');

        // Get original header cells and body rows
        const thead = table.querySelector('thead tr');
        const tbody = table.querySelector('tbody');
        const originalHeaders = Array.from(thead.querySelectorAll('th'));
        const originalRows = Array.from(tbody.querySelectorAll('tr'));

        // Keep checkbox column
        const checkboxHeader = originalHeaders[0];

        // Create a map from column ID to original header index
        const columnLabels = {
            'phone': 'Số điện thoại',
            'source': 'Nguồn ứng viên',
            'name': 'Họ và tên',
            'email': 'Email',
            'campaign': 'Chiến dịch tuyển dụng',
            'position': 'Vị trí tuyển dụng',
            'news': 'Tin tuyển dụng',
            'round': 'Vòng tuyển dụng',
            'rating': 'Đánh giá',
            'applicationDate': 'Ngày ứng tuyển',
            'education': 'Trình độ đào tạo',
            'school': 'Nơi đào tạo',
            'major': 'Chuyên ngành',
            'workplace': 'Nơi làm việc gần đây',
            'recruiter': 'Nhân sự khai thác',
            'department': 'Đơn vị sử dụng',
            'match': 'Phù hợp với chân dung',
            'location': 'Khu vực',
            'referrer': 'Người giới thiệu',
            'reception': 'Thông tin tiếp nhận',
            'talent': 'Thuộc kho tiềm năng',
            'status': 'Trạng thái'
        };

        // Build map from column ID to original index by matching text content
        const columnToIndex = {};
        originalHeaders.forEach((header, index) => {
            if (index === 0) return; // Skip checkbox
            const headerText = header.textContent.trim();
            for (const [id, label] of Object.entries(columnLabels)) {
                if (headerText === label) {
                    columnToIndex[id] = index;
                    break;
                }
            }
        });

        console.log('Column to index map:', columnToIndex);

        // Sort columns by order
        const sortedColumns = [...this.columns].sort((a, b) => a.order - b.order);
        console.log('Sorted columns:', sortedColumns.map(c => `${c.label} (order: ${c.order})`));

        // Rebuild header
        thead.innerHTML = '';
        thead.appendChild(checkboxHeader);

        sortedColumns.forEach(col => {
            const originalIndex = columnToIndex[col.id];
            if (originalIndex !== undefined && originalHeaders[originalIndex]) {
                const header = originalHeaders[originalIndex].cloneNode(true);
                header.style.display = col.visible ? '' : 'none';
                thead.appendChild(header);
                console.log(`Added header: ${col.label} from index ${originalIndex}, visible: ${col.visible}`);
            }
        });

        // Rebuild each row
        originalRows.forEach(row => {
            const originalCells = Array.from(row.querySelectorAll('td'));
            const checkboxCell = originalCells[0];

            row.innerHTML = '';
            row.appendChild(checkboxCell);

            sortedColumns.forEach(col => {
                const originalIndex = columnToIndex[col.id];
                if (originalIndex !== undefined && originalCells[originalIndex]) {
                    const cell = originalCells[originalIndex].cloneNode(true);
                    cell.style.display = col.visible ? '' : 'none';
                    row.appendChild(cell);
                }
            });
        });

        console.log('Table updated!');
    }
};
