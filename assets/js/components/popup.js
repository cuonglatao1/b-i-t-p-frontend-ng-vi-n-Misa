/**
 * Popup Component
 * Xử lý mở/đóng popup thêm/sửa ứng viên
 */

const Popup = {
    overlay: null,
    currentCandidateId: null,
    educationCount: 1,
    experienceCount: 0,

    /**
     * Khởi tạo popup
     */
    init() {
        this.overlay = document.getElementById('candidatePopup');
        this.bindEvents();
    },

    /**
     * Gắn các sự kiện
     */
    bindEvents() {
        // Nút đóng popup
        document.getElementById('btnClosePopup')?.addEventListener('click', () => this.close());
        document.getElementById('btnCancel')?.addEventListener('click', () => this.close());

        // Click ngoài popup để đóng
        this.overlay?.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Ngăn form submit mặc định
        document.getElementById('candidateForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        // Upload CV area click
        document.getElementById('uploadArea')?.addEventListener('click', () => {
            document.getElementById('cvFile')?.click();
        });

        // CV file change
        document.getElementById('cvFile')?.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const fileName = e.target.files[0].name;
                document.querySelector('.upload-link').textContent = `Đã chọn: ${fileName}`;
            }
        });

        // Avatar placeholder click
        document.getElementById('avatarPlaceholder')?.addEventListener('click', () => {
            document.getElementById('avatarFile')?.click();
        });

        // Avatar file change
        document.getElementById('avatarFile')?.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    const avatarPlaceholder = document.getElementById('avatarPlaceholder');
                    avatarPlaceholder.style.backgroundImage = `url(${event.target.result})`;
                    avatarPlaceholder.style.backgroundSize = 'cover';
                    avatarPlaceholder.style.backgroundPosition = 'center';
                    avatarPlaceholder.querySelector('span').style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });

        // Thêm học vấn
        document.getElementById('btnAddEducation')?.addEventListener('click', () => {
            this.addEducationItem();
        });

        // Thêm kinh nghiệm
        document.getElementById('btnAddExperience')?.addEventListener('click', () => {
            this.addExperienceItem();
        });
    },

    /**
     * Mở popup thêm mới ứng viên
     */
    openAdd() {
        this.currentCandidateId = null;
        document.getElementById('popupTitle').textContent = 'Thêm Ứng Viên';
        this.clearForm();
        this.show();
    },

    /**
     * Mở popup chỉnh sửa ứng viên
     * @param {number} candidateId - ID ứng viên cần chỉnh sửa
     */
    openEdit(candidateId) {
        this.currentCandidateId = candidateId;
        document.getElementById('popupTitle').textContent = 'Chỉnh sửa thông tin ứng viên';

        // Load dữ liệu ứng viên
        const candidate = Storage.getCandidateById(candidateId);
        if (candidate) {
            this.fillForm(candidate);
            this.show();
        }
    },

    /**
     * Hiển thị popup
     */
    show() {
        this.overlay?.classList.add('show');
        Validator.clearErrors();
    },

    /**
     * Đóng popup
     */
    close() {
        this.overlay?.classList.remove('show');
        this.clearForm();
        Validator.clearErrors();
        this.currentCandidateId = null;
    },

    /**
     * Xóa dữ liệu form
     */
    clearForm() {
        document.getElementById('candidateForm')?.reset();
        document.querySelector('.upload-link').textContent = 'Kéo thả hoặc bấm vào đây để tải CV lên';

        // Reset avatar
        const avatarPlaceholder = document.getElementById('avatarPlaceholder');
        if (avatarPlaceholder) {
            avatarPlaceholder.style.backgroundImage = '';
            const span = avatarPlaceholder.querySelector('span');
            if (span) span.style.display = '';
        }

        // Reset education list - chỉ giữ 1 item mặc định
        const educationList = document.getElementById('educationList');
        if (educationList) {
            educationList.innerHTML = this.getEducationItemHTML(0);
            this.educationCount = 1;
        }

        // Reset experience list
        const experienceList = document.getElementById('experienceList');
        if (experienceList) {
            experienceList.innerHTML = '';
            this.experienceCount = 0;
        }
    },

    /**
     * Điền dữ liệu vào form
     * @param {Object} candidate - Đối tượng ứng viên
     */
    fillForm(candidate) {
        // Thông tin cơ bản
        document.getElementById('fullName').value = candidate.fullName || '';
        document.getElementById('dateOfBirth').value = candidate.dateOfBirth || '';
        document.getElementById('gender').value = candidate.gender || '';
        document.getElementById('location').value = candidate.location || '';
        document.getElementById('phoneNumber').value = candidate.phoneNumber || '';
        document.getElementById('email').value = candidate.email || '';
        document.getElementById('address').value = candidate.address || '';

        // Học vấn - fill vào item đầu tiên
        const educationItem = document.querySelector('.education-item');
        if (educationItem) {
            educationItem.querySelector('.education-level').value = candidate.education || '';
            educationItem.querySelector('.education-school').value = candidate.school || '';
            educationItem.querySelector('.education-major').value = candidate.major || '';
        }

        // Thông tin tuyển dụng
        document.getElementById('applicationDate').value = candidate.applicationDate || '';
        document.getElementById('source').value = candidate.source || '';
        document.getElementById('recruiter').value = candidate.recruiter || '';
        document.getElementById('collaborator').value = candidate.collaborator || '';

        // Nơi làm việc gần đây
        document.getElementById('recentWorkplace').value = candidate.workplace || '';

        // Kinh nghiệm mặc định
        document.getElementById('defaultWorkplace').value = candidate.workplace || '';
        document.getElementById('defaultWorkStartDate').value = candidate.workStartDate || '';
        document.getElementById('defaultWorkEndDate').value = candidate.workEndDate || '';
        document.getElementById('defaultJobPosition').value = candidate.jobPosition || '';
        document.getElementById('defaultJobDescription').value = candidate.jobDescription || '';
    },

    /**
     * Lấy dữ liệu từ form
     * @returns {Object} Đối tượng ứng viên
     */
    getFormData() {
        // Lấy thông tin học vấn từ item đầu tiên
        const educationItem = document.querySelector('.education-item');
        let education = '';
        let school = '';
        let major = '';

        if (educationItem) {
            education = educationItem.querySelector('.education-level')?.value.trim() || '';
            school = educationItem.querySelector('.education-school')?.value.trim() || '';
            major = educationItem.querySelector('.education-major')?.value.trim() || '';
        }

        // Lấy kinh nghiệm từ mục mặc định
        let workplace = document.getElementById('defaultWorkplace')?.value.trim() || '';
        let workStartDate = document.getElementById('defaultWorkStartDate')?.value || '';
        let workEndDate = document.getElementById('defaultWorkEndDate')?.value || '';
        let jobPosition = document.getElementById('defaultJobPosition')?.value.trim() || '';
        let jobDescription = document.getElementById('defaultJobDescription')?.value.trim() || '';

        return {
            id: this.currentCandidateId,
            fullName: document.getElementById('fullName').value.trim(),
            dateOfBirth: document.getElementById('dateOfBirth').value,
            gender: document.getElementById('gender').value,
            location: document.getElementById('location').value,
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            email: document.getElementById('email').value.trim(),
            address: document.getElementById('address').value.trim(),

            // Học vấn
            education: education,
            school: school,
            major: major,
            graduationYear: '',
            graduationRank: '',

            // Thông tin tuyển dụng
            applicationDate: document.getElementById('applicationDate').value || new Date().toISOString().split('T')[0],
            source: document.getElementById('source').value || '--',
            recruiter: document.getElementById('recruiter').value || '--',
            collaborator: document.getElementById('collaborator').value || '--',
            position: '--',
            campaign: '--',
            status: 'Ứng tuyển',

            // Kinh nghiệm
            workplace: workplace,
            workStartDate: workStartDate,
            workEndDate: workEndDate,
            jobPosition: jobPosition,
            jobDescription: jobDescription
        };
    },

    /**
     * Thêm mục học vấn mới
     */
    addEducationItem() {
        const educationList = document.getElementById('educationList');
        if (educationList) {
            const newItem = document.createElement('div');
            newItem.innerHTML = this.getEducationItemHTML(this.educationCount);
            educationList.appendChild(newItem.firstElementChild);
            this.educationCount++;
        }
    },

    /**
     * Tạo HTML cho education item
     */
    getEducationItemHTML(index) {
        return `
            <div class="education-item">
                ${index > 0 ? '<button type="button" class="btn-remove-item" onclick="Popup.removeEducationItem(this)">-</button>' : ''}
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Trình độ đào tạo</label>
                        <div class="input-with-actions">
                            <input type="text" class="form-input education-level" list="educationLevels" placeholder="Nhập trình độ đào tạo">
                            <button type="button" class="btn-action-add" onclick="Popup.showDatalistDropdown(this)"><i class="icon icon-add"></i></button>
                            <button type="button" class="btn-action-expand" onclick="Popup.toggleEducationExpand(this)"><i class="icon icon-arrow-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Nơi đào tạo</label>
                        <div class="input-with-actions">
                            <input type="text" class="form-input education-school" list="schools" placeholder="Nhập nơi đào tạo">
                            <button type="button" class="btn-action-add" onclick="Popup.showDatalistDropdown(this)"><i class="icon icon-add"></i></button>
                            <button type="button" class="btn-action-expand" onclick="Popup.toggleEducationExpand(this)"><i class="icon icon-arrow-down"></i></button>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Chuyên ngành</label>
                        <div class="input-with-actions">
                            <input type="text" class="form-input education-major" list="majors" placeholder="Nhập chuyên ngành">
                            <button type="button" class="btn-action-add" onclick="Popup.showDatalistDropdown(this)"><i class="icon icon-add"></i></button>
                            <button type="button" class="btn-action-expand" onclick="Popup.toggleEducationExpand(this)"><i class="icon icon-arrow-down"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Xóa education item
     */
    removeEducationItem(btn) {
        const item = btn.closest('.education-item');
        if (item) {
            item.remove();
        }
    },

    /**
     * Toggle education expand - Mở dropdown datalist
     */
    toggleEducationExpand(btn) {
        const input = btn.closest('.input-with-actions').querySelector('input');
        if (input && input.list) {
            // Focus vào input để mở datalist dropdown
            input.focus();

            // Trigger dropdown bằng cách dispatch event
            const event = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            input.dispatchEvent(event);
        }
    },

    /**
     * Show datalist dropdown - Mở popup thêm giá trị
     */
    showDatalistDropdown(btn) {
        const input = btn.closest('.input-with-actions').querySelector('input');
        if (!input) return;

        // Xác định type dựa vào class của input
        let type = 'school'; // mặc định
        if (input.classList.contains('education-level')) {
            type = 'level';
        } else if (input.classList.contains('education-school')) {
            type = 'school';
        } else if (input.classList.contains('education-major')) {
            type = 'major';
        }

        // Mở popup
        EducationValuePopup.open(type, input);
    },

    /**
     * Thêm kinh nghiệm làm việc
     */
    addExperienceItem() {
        const experienceList = document.getElementById('experienceList');
        if (experienceList) {
            const newItem = document.createElement('div');
            newItem.innerHTML = this.getExperienceItemHTML();
            experienceList.appendChild(newItem.firstElementChild);
            this.experienceCount++;
        }
    },

    /**
     * Tạo HTML cho experience item
     */
    getExperienceItemHTML() {
        return `
            <div class="experience-item">
                <button type="button" class="btn-remove-item" onclick="Popup.removeExperienceItem(this)">-</button>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Nơi làm việc</label>
                        <input type="text" class="form-input exp-workplace" placeholder="Nhập nơi làm việc">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Thời gian</label>
                        <div class="time-range">
                            <input type="text" class="form-input exp-start-date" placeholder="MM/yyyy">
                            <span class="time-range-separator">-</span>
                            <input type="text" class="form-input exp-end-date" placeholder="MM/yyyy">
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Vị trí công việc</label>
                        <input type="text" class="form-input exp-position" placeholder="Nhập vị trí công việc">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Mô tả công việc</label>
                        <textarea class="form-textarea exp-description" rows="3" placeholder="Nhập mô tả công việc"></textarea>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Xóa experience item
     */
    removeExperienceItem(btn) {
        const item = btn.closest('.experience-item');
        if (item) {
            item.remove();
        }
    },

    /**
     * Kiểm tra chế độ hiện tại
     * @returns {string} 'add' hoặc 'edit'
     */
    getMode() {
        return this.currentCandidateId ? 'edit' : 'add';
    }
};
