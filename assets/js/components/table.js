/**
 * Table Component
 * Render bang du lieu ung vien
 */

const Table = {
    tbody: null,
    checkAllCheckbox: null,

    init() {
        this.tbody = document.getElementById('candidateTableBody');
        this.checkAllCheckbox = document.getElementById('checkAll');
        this.bindCheckboxEvents();
    },

    bindCheckboxEvents() {
        // Xử lý checkbox "Chọn tất cả"
        if (this.checkAllCheckbox) {
            this.checkAllCheckbox.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                const rowCheckboxes = this.tbody.querySelectorAll('.row-checkbox');
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
                this.updateDeleteButton();
            });
        }

        // Xử lý khi click vào các checkbox dòng
        this.tbody.addEventListener('change', (e) => {
            if (e.target.classList.contains('row-checkbox')) {
                const rowCheckboxes = this.tbody.querySelectorAll('.row-checkbox');
                const checkedCount = this.tbody.querySelectorAll('.row-checkbox:checked').length;
                this.checkAllCheckbox.checked = checkedCount === rowCheckboxes.length;
                this.updateDeleteButton();
            }
        });
    },

    updateDeleteButton() {
        const deleteBtn = document.getElementById('btnDeleteSelected');
        const checkedCount = this.tbody.querySelectorAll('.row-checkbox:checked').length;

        if (checkedCount > 0) {
            deleteBtn.style.display = 'flex';
        } else {
            deleteBtn.style.display = 'none';
        }
    },

    render(candidates) {
        if (!this.tbody) this.init();

        if (candidates.length === 0) {
            this.tbody.innerHTML = `
                <tr>
                    <td colspan="23" style="text-align: center; padding: 40px;">Khong co du lieu</td>
                </tr>
            `;
            return;
        }

        this.tbody.innerHTML = candidates.map(c => this.renderRow(c)).join('');
        this.bindRowEvents();
    },

    renderRow(candidate) {
        const initials = Helpers.getInitials(candidate.fullName);
        const avatarColor = Helpers.getAvatarColor(candidate.fullName);
        const stars = this.renderStars(candidate.rating || 0);
        const matchPercent = this.renderMatchPercent(candidate.matchPercent || 0);

        return `
            <tr data-id="${candidate.id}">
                <td><input type="checkbox" class="checkbox row-checkbox" data-id="${candidate.id}"></td>
                <td>${candidate.phoneNumber || '--'}</td>
                <td>${candidate.source || '--'}</td>
                <td>
                    <div class="candidate-info">
                        <div class="candidate-avatar" style="background-color: ${avatarColor}; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: 600; margin-right: 8px;">
                            ${initials}
                        </div>
                        ${candidate.fullName}
                    </div>
                </td>
                <td>${candidate.email || '--'}</td>
                <td>${candidate.campaign || '--'}</td>
                <td>${candidate.position || '--'}</td>
                <td>${candidate.recruitmentNews || '--'}</td>
                <td>${candidate.recruitmentRound || '--'}</td>
                <td>${stars}</td>
                <td>${candidate.applicationDate || '--'}</td>
                <td>${candidate.education || '--'}</td>
                <td>${candidate.school || '--'}</td>
                <td>${candidate.major || '--'}</td>
                <td>${candidate.workplace || '--'}</td>
                <td>${candidate.recruiter || '--'}</td>
                <td>${candidate.department || '--'}</td>
                <td>${matchPercent}</td>
                <td>${candidate.location || '--'}</td>
                <td>${candidate.referrer || '--'}</td>
                <td>${candidate.receptionInfo || '--'}</td>
                <td>${candidate.talentPool || '--'}</td>
                <td>${candidate.status || '--'}</td>
            </tr>
        `;
    },

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        let html = '<div class="rating-stars">';
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                html += '<span class="star star-filled">★</span>';
            } else {
                html += '<span class="star star-empty">☆</span>';
            }
        }
        html += '</div>';
        return html;
    },

    renderMatchPercent(percent) {
        if (!percent) return '--';
        const arrow = percent >= 50 ? '↑' : '↓';
        const color = percent >= 50 ? '#10b981' : '#ef4444';
        return `<span style="color: ${color}; font-weight: 600;">${percent}% ${arrow}</span>`;
    },

    bindRowEvents() {
        this.tbody.querySelectorAll('tr').forEach(row => {
            const id = parseInt(row.dataset.id);
            if (id) {
                row.addEventListener('dblclick', () => {
                    CandidateModule.edit(id);
                });
            }
        });
    }
};
