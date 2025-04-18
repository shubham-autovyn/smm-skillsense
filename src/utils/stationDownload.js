import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const stationDownloadExcelFile = async (
  firstHeading = null,
  data,
  headerMapping,
  fileName = "data.xlsx"
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  if (!Array.isArray(data) || data.length === 0) {
    alert("Error: Data array is empty or not provided.");
    console.error("Error: Data is empty or not provided.");
    return;
  }

  if (firstHeading) {
    const firstRow = worksheet.addRow(firstHeading);
    firstRow.eachCell((cell) => {
      cell.font = { bold: true };
    });
    worksheet.addRow([]); // Blank row
    worksheet.addRow([]); // Blank row
  }

  // Define headers
  const headers = Object.values(headerMapping);
  worksheet.addRow(headers);

  // Style headers
  headers.forEach((_, colIndex) => {
    const cell = worksheet.getRow(firstHeading ? 4 : 1).getCell(colIndex + 1);
    cell.font = { bold: true };
  });

  // Add data rows
  data.forEach((item) => {
    const deployedOperators = Array.isArray(item.deployedOperator)
      ? item.deployedOperator
      : [""];

    const level3Operators = Array.isArray(item.level3) ? item.level3 : [""];

    const level4Operators = Array.isArray(item.level4) ? item.level4 : [""];

    const maxRows = Math.max(
      deployedOperators.length || 1,
      level3Operators.length || 1,
      level4Operators.length || 1
    );
    const maxDeployedRows = Math.max(deployedOperators.length || 1);
    const maxLevel3Rows = Math.max(level3Operators.length || 1);
    const maxLevel4Rows = Math.max(level4Operators.length || 1);

    // Store the row number where merging should start
    const startRow = worksheet.lastRow ? worksheet.lastRow.number + 1 : 2;

    for (
      let i = 0, f = 0, g = 0;
      i < maxDeployedRows || f < maxLevel3Rows || g < maxLevel4Rows;
      i++, f++, g++
    ) {
      const rowData = [
        i === 0 ? item.stationName : "", // Only set value on the first row
        i === 0 ? item.stationDescription : "",
        i === 0 ? item.maruAAR : "",
        deployedOperators[i] || "",
        level3Operators[f] || "",
        level4Operators[g] || "",
        i === 0 ? item.additionalColumn1 : "", // Add new column values
        i === 0 ? item.additionalColumn2 : "",
        i === 0 ? item.additionalColumn3 : "",
      ];

      const row = worksheet.addRow(rowData);

      // Apply text wrapping to relevant columns
      row.getCell(4).alignment = { wrapText: true, vertical: "none" };
      row.getCell(5).alignment = { wrapText: true, vertical: "none" };
      row.getCell(6).alignment = { wrapText: true, vertical: "none" };
    }

    // Merge first three columns over required rows
    const endRow = startRow + maxRows - 1;
    worksheet.mergeCells(startRow, 1, endRow, 1); // Merge Column A
    worksheet.mergeCells(startRow, 2, endRow, 2); // Merge Column B
    worksheet.mergeCells(startRow, 3, endRow, 3); // Merge Column C

    // Merge Columns 4, 5, and 6 if they have fewer rows
    if (maxDeployedRows < maxRows) {
      worksheet.mergeCells(startRow, 4, endRow, 4); // Merge Column D
    }
    if (maxLevel3Rows < maxRows) {
      worksheet.mergeCells(startRow, 5, endRow, 5); // Merge Column E
    }
    if (maxLevel4Rows < maxRows) {
      worksheet.mergeCells(startRow, 6, endRow, 6); // Merge Column F
    }

    // **Merge additional columns (G, H, I, etc.) like Column A**
    const additionalColumns = [7, 8, 9, 10, 11, 12, 13, 14, 15]; // Adjust based on your columns
    additionalColumns.forEach((col) => {
      worksheet.mergeCells(startRow, col, endRow, col);
    });

    // Apply alignment to merged cells
    [1, 2, 3, 4, 5, 6, ...additionalColumns].forEach((col) => {
      worksheet.getCell(startRow, col).alignment = {
        vertical: "middle",
        horizontal: "none",
      };
    });
  });

  // Adjust column widths
  worksheet.columns.forEach((column) => {
    column.width = 30;
  });

  // Generate and download the file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
