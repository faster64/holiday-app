import { Component } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent {
  codeMirrorOptions: any = {
    mode: "text/x-mysql",
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: false,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };

  response = {
    "total": 1,
    "data": [
      {
        name: "Ngày giải phóng Miền Nam thống nhất đất nước",
        description: `Ngày lễ 30 tháng 4, tên chính thức là Ngày Giải phóng miền Nam, thống nhất đất nước...`,
        date: "30-04",
        nextSolar: "30-04-2024",
        nextLunar: "22-03-2024",
        isSolar: true,
        dayOffValue: 1,
        categoryName: "Ngày lễ theo dương lịch",
        remainingSeconds: 13047225,
        offset: 0
      },
    ],
    "status": "success",
    "error": null
  };

  explain = {
    "total": "Tổng số ngày lễ",
    "status": "Success: nếu thành công - Failed: nếu thất bại",
    "error": "Message lỗi",
    "data": "Dữ liệu ngày lễ trả về, là 1 mảng các object ngày lễ",
    "holiday object": {
      "name": "Tên ngày lễ",
      "description": "Mô tả về ngày lễ",
      "date": "Ngày lễ",
      "nextSolar": "ngày dương lịch tiếp theo tính từ hiện tại",
      "nextLunar": "ngày âm lịch tiếp theo tính từ hiện tại",
      "isSolar": "true nếu ngày lễ thuộc loại lễ dương lịch, false nếu là âm lịch",
      "dayOffValue": "Số ngày được nghỉ",
      "categoryName": "Loại ngày lễ",
      "remainingSeconds": "Số giây còn lại tính từ hiện tại cho tới ngày lễ, ví dụ: 10000 = 2h 46p 40s"
    }
  }
}
