/**
 * Export Component
 * Xuat du lieu ra Excel
 */

const ExportModule = {
    exportToExcel() {
        // Get all candidates
        const candidates = Storage.getCandidates();

        if (candidates.length === 0) {
            Toast.warning('Khong co du lieu de xuat');
            return;
        }

        // Create CSV content
        const headers = [
            'So dien thoai',
            'Nguon ung vien',
            'Ho va ten',
            'Email',
            'Chien dich tuyen dung',
            'Vi tri tuyen dung',
            'Tin tuyen dung',
            'Vong tuyen dung',
            'Danh gia',
            'Ngay ung tuyen',
            'Trinh do dao tao',
            'Noi dao tao',
            'Chuyen nganh',
            'Noi lam viec gan day',
            'Nhan su khai thac',
            'Don vi su dung',
            'Phu hop voi chan dung',
            'Khu vuc',
            'Nguoi gioi thieu',
            'Thong tin tiep nhan',
            'Thuoc kho tiem nang',
            'Trang thai'
        ];

        const rows = candidates.map(c => [
            c.phoneNumber || '--',
            c.source || '--',
            c.fullName || '--',
            c.email || '--',
            c.campaign || '--',
            c.position || '--',
            c.recruitmentNews || '--',
            c.recruitmentRound || '--',
            c.rating || '0',
            c.applicationDate || '--',
            c.education || '--',
            c.school || '--',
            c.major || '--',
            c.workplace || '--',
            c.recruiter || '--',
            c.department || '--',
            (c.matchPercent || 0) + '%',
            c.location || '--',
            c.referrer || '--',
            c.receptionInfo || '--',
            c.talentPool || '--',
            c.status || '--'
        ]);

        // Create CSV string
        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });

        // Create BOM for UTF-8
        const BOM = '\uFEFF';
        const csvContent = BOM + csv;

        // Download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `danh-sach-ung-vien-${new Date().getTime()}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Toast.success('Da xuat file thanh cong');
    }
};
