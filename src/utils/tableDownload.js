import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/**
 * Function to generate and download an Excel file in the required format.
 * @param {Array} responseData - The API response containing multiple date records.
 * @param {String} fileName - The name of the Excel file.
 */
export const generateTableExcel = async (
  responseData,
  fileName = "data.xlsx"
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Step 1: Define fixed headers (first 9 columns)
  const staticHeaders = [
    "Division Clust",
    "Plant Name",
    "Dept Name",
    "Online/Offline",
    "Sub-Category",
    "Group",
    "Line",
    "Area",
    "Parameter",
  ];

  // Step 2: Extract all unique dates from the dataset

  const uniqueDates = [
    ...new Set(
      responseData?.flatMap((item) => item?.date_records?.map((d) => d.date))
    ),
  ];

  // Format dates to "dd/MM/yyyy"
  const formattedDates = uniqueDates?.map((date) =>
    date?.split("-").reverse().join("/")
  );

  // Step 3: Combine headers (static headers + dynamic date headers)
  const headerRow = worksheet.addRow([...staticHeaders, ...formattedDates]);

  // Apply styles to the header row (Yellow background with black text)
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "171C8F" }, //  background color
    };
    cell.font = {
      bold: true,
      color: { argb: "FFFFFF" }, //  text color
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Step 4: Define keys for row-wise transformation
  const keysMapping = {
    basic_requirement: "Basic Requirement",
    absenteeism: "Absenteeism",
    attrition: "Attrition",
    overlapping: "Overlapping",
    total_manpower_req: "Total Manpower Req",
    relieving: "Relievings",
    joining: "Joining",
    actual_manpower: "Actual Manpower",
    gap: "Gap",
  };

  // Step 5: Loop through each object and format it correctly
  responseData?.forEach((data) => {
    const staticData = [
      data.division_clust,
      data.plant_name,
      data.dept_name,
      data.online_offline,
      data["sub-category"],
      data.group,
      data.line,
      data.area,
    ];

    // Process each parameter and create rows dynamically
    Object.entries(keysMapping).forEach(([key, label]) => {
      const rowData = [...staticData, label];

      // Fill date values in the correct columns
      uniqueDates.forEach((date) => {
        const record = data.date_records.find((d) => d.date === date);
        rowData.push(record ? record[key] ?? "" : "");
      });

      worksheet.addRow(rowData);
    });
  });

  // Step 6: Auto-adjust column width
  worksheet.columns.forEach((column) => {
    column.width = 15; // Adjust width for better readability
  });

  // Step 7: Generate and download the Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, fileName);
};
