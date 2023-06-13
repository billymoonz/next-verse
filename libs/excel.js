import ExcelJS from 'exceljs';

export function generateReport(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Table');
    worksheet.addRows(data);
    return workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        return blob;
    }).catch(() => {
        return null;
    })
}