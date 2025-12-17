/**
 * Validator Module
 * Xu ly validation cac truong du lieu trong form
 */

const Validator = {
    /**
     * Kiem tra truong bat buoc (required)
     * @param {string} value - Gia tri can kiem tra
     * @returns {boolean} True neu hop le
     */
    required(value) {
        return value !== null && value !== undefined && value.trim() !== '';
    },

    /**
     * Kiem tra dinh dang email
     * @param {string} email - Email can kiem tra
     * @returns {boolean} True neu hop le
     */
    isEmail(email) {
        if (!email) return true; // Cho phep trong neu khong bat buoc

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Kiem tra dinh dang so dien thoai
     * @param {string} phone - So dien thoai can kiem tra
     * @returns {boolean} True neu hop le
     */
    isPhoneNumber(phone) {
        if (!phone) return true; // Cho phep trong neu khong bat buoc

        // Loai bo khoang trang va dau -
        const cleaned = phone.replace(/[\s-]/g, '');

        // Kiem tra chi chua so va co do dai hop ly (9-11 so)
        const phoneRegex = /^[0-9]{9,11}$/;
        return phoneRegex.test(cleaned);
    },

    /**
     * Kiem tra do dai toi thieu
     * @param {string} value - Gia tri can kiem tra
     * @param {number} min - Do dai toi thieu
     * @returns {boolean} True neu hop le
     */
    minLength(value, min) {
        if (!value) return true; // Cho phep trong neu khong bat buoc
        return value.trim().length >= min;
    },

    /**
     * Kiem tra do dai toi da
     * @param {string} value - Gia tri can kiem tra
     * @param {number} max - Do dai toi da
     * @returns {boolean} True neu hop le
     */
    maxLength(value, max) {
        if (!value) return true; // Cho phep trong neu khong bat buoc
        return value.trim().length <= max;
    },

    /**
     * Validate form ung vien
     * @param {Object} formData - Du lieu form can validate
     * @returns {Object} Doi tuong chua errors {fieldName: errorMessage}
     */
    validateCandidateForm(formData) {
        const errors = {};

        // Ho va ten (bat buoc)
        if (!this.required(formData.fullName)) {
            errors.fullName = 'Ho va ten la bat buoc';
        } else if (!this.minLength(formData.fullName, 2)) {
            errors.fullName = 'Ho va ten phai co it nhat 2 ky tu';
        }

        // Email (neu co thi phai dung dinh dang)
        if (formData.email && !this.isEmail(formData.email)) {
            errors.email = 'Email khong hop le';
        }

        // So dien thoai (neu co thi phai dung dinh dang)
        if (formData.phoneNumber && !this.isPhoneNumber(formData.phoneNumber)) {
            errors.phoneNumber = 'So dien thoai khong hop le';
        }

        return errors;
    },

    /**
     * Hien thi loi validation tren form
     * @param {Object} errors - Doi tuong chua errors {fieldName: errorMessage}
     */
    showErrors(errors) {
        // Xoa tat ca loi cu
        this.clearErrors();

        // Hien thi loi moi
        Object.keys(errors).forEach(fieldName => {
            const input = document.getElementById(fieldName);
            const errorMessage = errors[fieldName];

            if (input) {
                // Them class error cho input
                input.classList.add('error');

                // Hien thi thong bao loi
                const errorSpan = input.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('error-message')) {
                    errorSpan.textContent = errorMessage;
                    errorSpan.style.display = 'block';
                }
            }
        });
    },

    /**
     * Xoa tat ca thong bao loi tren form
     */
    clearErrors() {
        // Xoa class error tu tat ca input
        document.querySelectorAll('.form-input.error').forEach(input => {
            input.classList.remove('error');
        });

        // An tat ca thong bao loi
        document.querySelectorAll('.error-message').forEach(errorSpan => {
            errorSpan.textContent = '';
            errorSpan.style.display = 'none';
        });
    },

    /**
     * Validate 1 truong cu the khi nguoi dung nhap
     * @param {HTMLElement} input - Input element can validate
     * @param {string} validationType - Loai validation (required, email, phone,...)
     */
    validateField(input, validationType) {
        const value = input.value;
        let isValid = true;
        let errorMessage = '';

        switch (validationType) {
            case 'required':
                isValid = this.required(value);
                errorMessage = 'Truong nay la bat buoc';
                break;
            case 'email':
                isValid = this.isEmail(value);
                errorMessage = 'Email khong hop le';
                break;
            case 'phone':
                isValid = this.isPhoneNumber(value);
                errorMessage = 'So dien thoai khong hop le';
                break;
        }

        // Hien thi/an loi
        if (!isValid) {
            input.classList.add('error');
            const errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = errorMessage;
                errorSpan.style.display = 'block';
            }
        } else {
            input.classList.remove('error');
            const errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }
        }

        return isValid;
    }
};
