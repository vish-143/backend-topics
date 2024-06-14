// const xlsx = require("xlsx")
// const fs = require("fs")

// const convertJsonToXlsx = (data) => {
//     const workSheet = xlsx.utils.json_to_sheet(data)
//     const workBook = xlsx.utils.book_new()
//     xlsx.utils.book_append_sheet(workBook, workSheet, "Employee-data")
//     return workBook
// }

// fs.readFile("./employee.json", "utf8", (err, data) => {
//     if (err) {
//         console.log("err", err);
//     }
//     try {
//         const employeeData=JSON.parse(data)
//         console.log('employeeData: ', employeeData);
//         const workBookContent=convertJsonToXlsx(employeeData)
//         const outputPath="employee-data.xlsx"
//         xlsx.writeFile(workBookContent,outputPath)
//     } catch (error) {
//         console.log('error: ', error);
//     }
// })

const fs = require("fs");
const xlsx = require("xlsx");

const convertJsonToXlsx = (data) => {
    const workSheet = xlsx.utils.json_to_sheet(data)
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, "Employee-data");
    return workBook;
};

const readStream = fs.createReadStream("employee.json", { encoding: "utf8" });
let rawData = "";
readStream.on("data", (chunk) => {
    rawData += chunk;
});

readStream.on("end", () => {
    try {
        const employeeData = JSON.parse(rawData);
        const workBookContent = convertJsonToXlsx(employeeData);
        const outputPath = "employee-data.xlsx";
        xlsx.writeFile(workBookContent, outputPath);
        console.log(`Excel file "${outputPath}" created successfully.`);
    } catch (error) {
        console.log('Error:', error);
    }
});

readStream.on("error", (err) => {
    console.log('Error reading file:', err);
});
