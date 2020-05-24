const downloadBtn = document.querySelector('#downloadAsExcel');
const dataTable = document.querySelector('#dataTableATT');


downloadBtn.addEventListener('click', () => {
    $('#dataTableATT').tableExport({ type: 'excel' });
});
