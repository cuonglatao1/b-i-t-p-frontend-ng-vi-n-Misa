/**
 * Education Value Popup
 * Xu ly popup them gia tri cho cac truong hoc van
 */

const EducationValuePopup = {
    overlay: null,
    currentType: null, // 'level', 'school', 'major'
    currentInput: null,

    /**
     * Khoi tao
     */
    init() {
        this.overlay = document.getElementById('educationValuePopup');
        this.bindEvents();
    },

    /**
     * Gan su kien
     */
    bindEvents() {
        // Nut dong
        document.getElementById('btnCloseEducationValue')?.addEventListener('click', () => this.close());
        document.getElementById('btnCancelEducationValue')?.addEventListener('click', () => this.close());

        // Click ngoai popup
        this.overlay?.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Nut luu
        document.getElementById('btnSaveEducationValue')?.addEventListener('click', () => this.save());

        // Enter de luu
        document.getElementById('educationValueInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.save();
            }
        });

        // Clear error khi nhap
        document.getElementById('educationValueInput')?.addEventListener('input', () => {
            this.clearError();
        });
    },

    /**
     * Mo popup
     * @param {string} type - 'level', 'school', 'major'
     * @param {HTMLElement} inputElement - Input element de them gia tri vao
     */
    open(type, inputElement) {
        this.currentType = type;
        this.currentInput = inputElement;

        // Set title va label theo type
        const titles = {
            'level': 'Them trinh do dao tao',
            'school': 'Them noi dao tao',
            'major': 'Them chuyen nganh'
        };

        const labels = {
            'level': 'Ten trinh do dao tao',
            'school': 'Ten noi dao tao',
            'major': 'Ten chuyen nganh'
        };

        const placeholders = {
            'level': 'Ten trinh do dao tao',
            'school': 'Ten noi dao tao',
            'major': 'Ten chuyen nganh'
        };

        document.getElementById('educationValueTitle').textContent = titles[type] || titles['school'];
        document.getElementById('educationValueLabel').textContent = labels[type] || labels['school'];
        document.getElementById('educationValueInput').placeholder = placeholders[type] || placeholders['school'];

        this.clearForm();
        this.overlay?.classList.add('show');

        // Focus vao input
        setTimeout(() => {
            document.getElementById('educationValueInput')?.focus();
        }, 100);
    },

    /**
     * Dong popup
     */
    close() {
        this.overlay?.classList.remove('show');
        this.clearForm();
        this.currentType = null;
        this.currentInput = null;
    },

    /**
     * Clear form
     */
    clearForm() {
        document.getElementById('educationValueInput').value = '';
        this.clearError();
    },

    /**
     * Hien thi loi
     */
    showError(message = 'Khong duoc de trong') {
        const input = document.getElementById('educationValueInput');
        const error = document.getElementById('educationValueError');
        input?.classList.add('error');
        if (error) {
            error.textContent = message;
            error.style.display = 'block';
        }
    },

    /**
     * Xoa loi
     */
    clearError() {
        const input = document.getElementById('educationValueInput');
        const error = document.getElementById('educationValueError');
        input?.classList.remove('error');
        if (error) {
            error.style.display = 'none';
        }
    },

    /**
     * Kiem tra gia tri da ton tai chua
     */
    isValueExists(value) {
        let datalistId = '';

        switch(this.currentType) {
            case 'level':
                datalistId = 'educationLevels';
                break;
            case 'school':
                datalistId = 'schools';
                break;
            case 'major':
                datalistId = 'majors';
                break;
        }

        const datalist = document.getElementById(datalistId);
        if (datalist) {
            const options = Array.from(datalist.options);
            return options.some(opt => opt.value.toLowerCase() === value.toLowerCase());
        }
        return false;
    },

    /**
     * Luu gia tri
     */
    save() {
        const value = document.getElementById('educationValueInput').value.trim();

        if (!value) {
            this.showError('Khong duoc de trong');
            return;
        }

        // Kiem tra trung lap
        if (this.isValueExists(value)) {
            const messages = {
                'level': 'Trinh do nay da ton tai',
                'school': 'Noi dao tao nay da ton tai',
                'major': 'Chuyen nganh nay da ton tai'
            };
            this.showError(messages[this.currentType] || 'Gia tri nay da ton tai');
            return;
        }

        // Them gia tri vao datalist tuong ung
        this.addValueToDatalist(value);

        // Set gia tri vao input
        if (this.currentInput) {
            this.currentInput.value = value;
        }

        this.close();
        Toast.success('Da them gia tri moi');
    },

    /**
     * Them gia tri vao datalist
     */
    addValueToDatalist(value) {
        let datalistId = '';

        switch(this.currentType) {
            case 'level':
                datalistId = 'educationLevels';
                break;
            case 'school':
                datalistId = 'schools';
                break;
            case 'major':
                datalistId = 'majors';
                break;
        }

        const datalist = document.getElementById(datalistId);
        if (datalist) {
            const option = document.createElement('option');
            option.value = value;
            datalist.appendChild(option);
        }
    }
};
