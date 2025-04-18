import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/**
 * Common function to download data as an Excel file
 * @param {Array} data - The data to be converted to Excel.
 * @param {String} fileName - The name of the Excel file to download.
 */

export const downloadExcelFile = async (
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
    // ✅ Skip rows 2 and 3
    worksheet.addRow([]);
    worksheet.addRow([]);
  }
  // ✅ Add "Total Operator" and "Total Station" to the FIRST row

  // Define the header mapping for custom names

  // Extract the keys from the first data item and map them to custom headers
  const headers = Object.keys(data[0])?.map((key) => headerMapping[key] || key); // Use custom headers
  worksheet.addRow(headers);

  // Style headers (make them bold)
  headers.forEach((_, colIndex) => {
    const cell = worksheet.getRow(firstHeading ? 4 : 1).getCell(colIndex + 1);
    cell.font = { bold: true };
  });

  // Add data rows
  data.forEach((row) => {
    const rowData = headers.map((header) => {
      // Map the header back to the original key and get the value
      const originalKey = Object.keys(headerMapping).find(
        (key) => headerMapping[key] === header
      );
      return row[originalKey] || ""; // Use the original key to fetch the value
    });
    worksheet.addRow(rowData);
  });

  // Adjust column widths (set a fixed width for simplicity)
  worksheet.columns.forEach((column) => {
    column.width = 20; // Adjust dynamically or use a fixed width
  });

  // Generate and download the file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
