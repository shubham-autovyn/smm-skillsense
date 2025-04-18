import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const evaluationData = {
  name: "John Doe",
  staffId: "EMP001",
  startDate: "2025-03-01",
  lineArea: "Assembly Line A",
  station: "Station 5",
  evaluations: [
    {
      attempt: 1,
      level: 1,
      supervisor: "Supervisor A",
      date: "2025-03-15",
      reevalDate: "2025-03-20",
      answers: {
        1: { level: "OK-O", remarks: "Good understanding" },
        2: { level: "NG-X", remarks: "Needs Improvement" },
        3: { level: "OK-O", remarks: "Satisfactory" },
        4: { level: "OK-O", remarks: "Excellent" },
      },
    },
    {
      attempt: 2,
      level: 1,
      supervisor: "Supervisor B",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
        4: { level: "OK-O", remarks: "Consistently good" },
      },
    },
    {
      attempt: 3,
      level: 1,
      supervisor: "Supervisor C",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
        4: { level: "OK-O", remarks: "Consistently good" },
      },
    },
    {
      attempt: 1,
      level: 2,
      supervisor: "Supervisor C",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
        4: { level: "OK-O", remarks: "Consistently good", isMaru: "true" },
      },
    },
    {
      attempt: 2,
      level: 2,
      supervisor: "Supervisor C",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
        4: { level: "OK-O", remarks: "Consistently good", isMaru: "true" },
      },
    },
    {
      attempt: 1,
      level: 3,
      supervisor: "Supervisor C",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
        4: { level: "OK-O", remarks: "Consistently good", isMaru: "true" },
      },
    },
    {
      attempt: 2,
      level: 3,
      supervisor: "Supervisor C",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
        4: { level: "OK-O", remarks: "Consistently good", isMaru: "true" },
        5: { level: "OK-O", remarks: "Consistently good", isMaru: "true" },
        6: { level: "OK-O", remarks: "Consistently good", isMaru: "true" },
        7: { level: "OK-O", remarks: "Consistently good", isMaru: "true" },
      },
    },
    {
      attempt: 1,
      level: 4,
      supervisor: "Supervisor C",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
      },
    },
    {
      attempt: 1,
      level: 4,
      supervisor: "Supervisor C",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
      },
    },
    {
      attempt: 3,
      level: 4,
      supervisor: "Supervisor C",
      date: "2025-03-22",
      reevalDate: "2025-03-25",
      answers: {
        1: { level: "OK-O", remarks: "Improved further" },
        2: { level: "OK-O", remarks: "Better understanding" },
        3: { level: "OK-O", remarks: "Improved" },
      },
    },
  ],
};

const level1Data = evaluationData.evaluations.filter(
  (item) => item.level === 1
);
const level2Data = evaluationData.evaluations.filter(
  (item) => item.level === 2
);
const level3Data = evaluationData.evaluations.filter(
  (item) => item.level === 3
);
const level4Data = evaluationData.evaluations.filter(
  (item) => item.level === 4
);

const maruLevel2Data = level2Data
  .map((attempt) => {
    const maruAnswers = Object.keys(attempt.answers)
      .filter((key) => attempt.answers[key].isMaru === "true")
      .reduce((obj, key) => {
        obj[key] = attempt.answers[key];
        return obj;
      }, {});

    return Object.keys(maruAnswers).length > 0
      ? { ...attempt, answers: maruAnswers }
      : null;
  })
  .filter(Boolean);

const maruLevel3Data = level3Data
  .map((attempt) => {
    const maruAnswers = Object.keys(attempt.answers)
      .filter((key) => attempt.answers[key].isMaru === "true")
      .reduce((obj, key) => {
        obj[key] = attempt.answers[key];
        return obj;
      }, {});

    return Object.keys(maruAnswers).length > 0
      ? { ...attempt, answers: maruAnswers }
      : null;
  })
  .filter(Boolean);

const questionsSet1 = {
  1: "1. Awareness: Process, Tools, 5S etc.",
  2: "2. Awareness: 'Safety precautions on the station'",
  3: "3. Awareness: Systems (A,AR,A/AR,CLW etc.), Defects & Non-adherence",
  4: "4. Awareness: Quality Management System (ISO 9001 awareness, Quality Policy etc.)",
};

const questionsSet2 = {
  1: "1. Awareness, 'TAKT/CYCLE Time' of the process",
  2: "2. Awareness/Training on station specific 'MOS/WIS'- Process, Tools, 5S etc.",
  3: "3. Check operator can use all appropriate tools for the work",
};

const maruQuestionsSet = {
  4: "4. Whether Operator MOS/WIS training\nFeedback form filled?\nNote: Please refer Format K002-3",
};

const questionsSet3 = {
  1: "1. Check operator is Maintaining 5 'S'",
  2: "2. Check operator is working within Cycle/takt time and with safety",
  3: "3. Check operator has knowledge on Effect of defect / knowledge on defects",
};
const maruQuestionsSet2 = {
  4: "1. Station specific Maru-A, AR, A/AR process/Part etc.",
  5: "2. Understanding of impact of non-compliance of Maru-A, AR, A/AR Operations",
  6: "3. Past problems related to Maru-A, AR, A/AR operations",
  7: "4. Escalation or communication in case of any abnormality",
};
const questionsSet4 = {
  1: "1. Operator able to catch or solve defect/problem of the assigned station",
  2: "2. Operator able to communicate or explain (WIS/MOS etc.) to others",
  3: "3. Whether operator has secured 100% score in Questionnaire evaluation?",
};

const createHeaderRow = (worksheet, headers, rowHeight = 70) => {
  const row = worksheet.addRow(headers);
  row.eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thick" },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
    cell.font = { bold: true, size: 10 };
    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
  });
  worksheet.getRow(row.number).height = rowHeight;
};

const createDataRows = (
  worksheet,
  data,
  startRow = 6,
  rowHeight = 50,
  customRowHeights = {},
  cellStyles = {}
) => {
  data.forEach((rowData, index) => {
    const rowIndex = startRow + index;
    const row = worksheet.addRow(rowData);

    row.height = customRowHeights[rowIndex] || rowHeight;

    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thick" },
      };

      cell.font = {
        bold: cellStyles.bold || false,
        size: cellStyles.fontSize || 12,
        color: { argb: cellStyles.fontColor || "000000" },
      };

      cell.alignment = {
        vertical: cellStyles.verticalAlign || "middle",
        horizontal: cellStyles.horizontalAlign || "left",
        wrapText:
          cellStyles.wrapText !== undefined ? cellStyles.wrapText : true,
      };

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: colNumber === 1 ? "D3D3D3" : "FFFFFF" },
      };
    });
  });
};

const createDataRows2 = (
  worksheet,
  evaluationData,
  questions,
  startRow = 6,
  rowHeight = 50
) => {
  Object.keys(questions).forEach((key) => {
    const rowData = [questions[key]];

    evaluationData.forEach((attempt) => {
      const answer = attempt.answers[key] || { level: "", remarks: "" };
      rowData.push(answer.level, answer.remarks);
    });

    while (rowData.length < 7) rowData.push("", "");

    const row = worksheet.addRow(rowData);
    row.height = rowHeight;

    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thick" },
      };

      cell.font = { bold: false, size: 12, color: { argb: "000000" } };
      cell.alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };

      if (colNumber === 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "D3D3D3" },
        };
      } else if ((colNumber - 1) % 2 === 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "E0E0E0" },
        };
      }
    });
  });
};

const createMergedCells = (worksheet, ranges, height = 30) => {
  ranges.forEach((range) => worksheet.mergeCells(range));
  ranges.forEach((range) => {
    const cell = worksheet.getCell(range.split(":")[0]);
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thick" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFF" },
    };
  });
  ranges.forEach(
    (range) =>
      (worksheet.getRow(worksheet.getCell(range.split(":")[0]).row).height =
        height)
  );
};

const createSupervisorDateRows = (
  worksheet,
  evaluationData,
  startRow = 10,
  customFields = []
) => {
  const dataRows = [];

  const standardFields = [
    { label: "Area Supervisor", key: "supervisor" },
    { label: "Date", key: "date" },
    {
      label: "Re-evaluation item / date / results (if any)",
      key: "reevalDate",
    },
  ];

  const allFields = [...standardFields, ...customFields];

  allFields.forEach((field) => {
    const row = [field.label];

    evaluationData.forEach((attempt) => {
      const value = field.key ? attempt[field.key] : "";
      row.push(value, "");
    });

    while (row.length < 7) row.push("", "");

    dataRows.push(row);
  });

  createDataRows(
    worksheet,
    dataRows,
    startRow,
    50,
    {},
    {
      fontSize: 12,
      bold: true,
      verticalAlign: "middle",
      horizontalAlign: "center",
      wrapText: true,
    }
  );

  let mergeRanges = [];
  for (let rowIndex = 0; rowIndex < allFields.length; rowIndex++) {
    for (let i = 1; i < dataRows[rowIndex].length; i += 2) {
      const colLetter1 = String.fromCharCode(66 + i - 1);
      const colLetter2 = String.fromCharCode(66 + i);
      mergeRanges.push(
        `${colLetter1}${startRow + rowIndex}:${colLetter2}${
          startRow + rowIndex
        }`
      );
    }
  }

  createMergedCells(worksheet, mergeRanges);
};

export const handleDownloadExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Skill Evaluation");

  worksheet.mergeCells("A1:H1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = "SKILL EVALUATION & APPROVAL SHEET";
  titleCell.alignment = { horizontal: "center", vertical: "middle" };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "D3D3D3" },
  };
  titleCell.font = { bold: true, size: 14 };
  worksheet.getRow(1).height = 40;

  worksheet.mergeCells("A2:A3");
  worksheet.getCell(
    "A2"
  ).value = `Name & Staff ID: ${evaluationData.name} (${evaluationData.staffId})`;

  const headers = ["START DATE", "LINE/AREA", "STATION"];
  const values = [
    evaluationData.startDate,
    evaluationData.lineArea,
    evaluationData.station,
  ];

  headers.forEach((header, index) => {
    let cell = `B${index + 2}`;
    worksheet.getCell(cell).value = header;
    worksheet.getCell(cell).font = { bold: true };
    worksheet.getCell(cell).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getCell(cell).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell(cell).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
  });

  values.forEach((value, index) => {
    let cell = `C${index + 2}`;
    worksheet.getCell(cell).value = value;
    worksheet.getCell(cell).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getCell(cell).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  worksheet.columns = [
    { width: 50 },
    { width: 20 },
    { width: 45 },
    { width: 20 },
    { width: 45 },
    { width: 20 },
    { width: 45 },
  ];

  createHeaderRow(worksheet, [
    "For Achieving LEVEL1 Requirements\nUnder Training , Cannot Work",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
  ]);

  createDataRows2(worksheet, level1Data, questionsSet1);
  createSupervisorDateRows(worksheet, level1Data, 10);

  createHeaderRow(worksheet, [
    "Level 1 --> Level 2 Requirements:\nCan Work Under Supervision",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
  ]);

  createDataRows2(worksheet, level2Data, questionsSet2);

  worksheet.mergeCells("A17:G17");
  const MAruCell = worksheet.getCell("A17");
  MAruCell.value = "For Maru-A, AR & A/AR Operation Evaluation Only";
  MAruCell.alignment = { horizontal: "left", vertical: "middle" };
  MAruCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "D3D3D3" },
  };
  MAruCell.font = { bold: true, size: 14 };
  worksheet.getRow(17).height = 30;

  createDataRows2(worksheet, maruLevel2Data, maruQuestionsSet);
  createSupervisorDateRows(worksheet, level2Data, 19);

  createHeaderRow(worksheet, [
    "Level 2 --> Level 3 Requirements:\nCan Work as per WIS/Standard within\nCycle/takt time independently and\n and safety",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
  ]);

  createDataRows2(worksheet, level3Data, questionsSet3);

  worksheet.mergeCells("A26:G26");
  const MAruCell2 = worksheet.getCell("A26");
  MAruCell2.value = "For Maru-A, AR & A/AR Operation Evaluation Only";
  MAruCell2.alignment = { horizontal: "left", vertical: "middle" };
  MAruCell2.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "D3D3D3" },
  };
  MAruCell2.font = { bold: true, size: 14 };
  worksheet.getRow(26).height = 30;

  const extraFieldsForlevel2 = [{ label: "Line in Charge", key: "lineCharge" }];
  createDataRows2(worksheet, maruLevel3Data, maruQuestionsSet2);
  createSupervisorDateRows(worksheet, level3Data, 31, extraFieldsForlevel2);

  createHeaderRow(worksheet, [
    "Level 3 --> Level 4 Requirements:\nCan Train Others",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
    "Please fill\nOK-O\nNG-X\nNot Applicable-N/A",
    "Observation Remarks\n[OK (discretionary) & NG (mandatory)]",
  ]);

  const extraFieldsForlevel4 = [
    {
      label: "Overall Comment of Supervisor witnessing the evaluation",
      key: null,
    },
    { label: "Line in Charge", key: null },
  ];
  createDataRows2(worksheet, level4Data, questionsSet4);
  createSupervisorDateRows(worksheet, level4Data, 39, extraFieldsForlevel4);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "Skill_Evaluation.xlsx");
};
