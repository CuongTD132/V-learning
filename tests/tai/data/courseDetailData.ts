import { AllCourseDetailType, CourseDetailType, CourseSelectTypes, LabelTypes, LearningPathStructure } from "../type/courseDetailTypes";

export const LabelData: LabelTypes = {
    title: "Thông tin khóa học",
    subTitle: "Tiến lên và không chần chừ !!!",
    courseBenefitLabel: "Những gì bạn sẽ học",
    learningPathLabel: "Nội dung khóa học",
    lessonLabel: "Bài học",
    promotionPlaceholder: "Nhập mã",
    relatedCourseLabel: "Khóa học tham khảo"
}

const CourseBenefit: string[] = [
    "Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện với người dùng và phản ứng nhanh",
    "Đăng ký công việc được trả lương cao hoặc làm freelancer trong một trong những lĩnh vực được yêu cầu nhiều nhất mà bạn có thể tìm thấy trong web dev ngay bây giờ",
    "Cung cấp trải nghiệm người dùng tuyệt vời bằng cách tận dụng sức mạnh của JavaScript một cách dễ dàng",
    "Tìm hiểu tất cả về React Hooks và React Components",
    "Thông thạo chuỗi công cụ hỗ trợ React, bao gồm cú pháp Javascript NPM, Webpack, Babel và ES6 / ES2015",
    "Nhận ra sức mạnh của việc xây dựng các thành phần có thể kết hợp",
    "Hãy là kỹ sư giải thích cách hoạt động của Redux cho mọi người, bởi vì bạn biết rất rõ các nguyên tắc cơ bản",
    "Nắm vững các khái niệm cơ bản đằng sau việc cấu trúc các ứng dụng Redux"
]

const StructureData: LearningPathStructure = {
    "Mục 1: Giới thiệu": {
        title: [
            "Các khái niệm về React Component",
            "Thiết lập môi trường cho Windows",
            "Tạo ứng dụng React - React-Scripts",
            "Ghi chú nhanh về dấu ngoặc kép cho string interpolation"
        ],
        duration: [
            "14:35",
            "14:35",
            "14:35",
            "14:35"
        ]
    },
    "Mục 2: Kiến thức căn bản": {
        title: [
            "Trang chủ và thành phần thư mục",
            "Hướng dẫn khóa học + Liên kết Github",
            "Trang chủ thương mại điện tử + thiết lập SASS",
            "Tệp CSS và SCSS",
            "React 17: Cập nhật các gói + Phiên bản React mới nhất"
        ],
        duration: [
            "14:35",
            "14:35",
            "14:35",
            "14:35",
            "14:35"
        ]
    },
    "Mục 3: Kiến thức chuyên sâu": {
        title: [
            "connect() and mapStateToProps",
            "Trạng thái thư mục vào Redux",
            "Thành phần Tổng quan về Bộ sưu tập"
        ],
        duration: [
            "14:35",
            "14:35",
            "14:35"
        ]
    }
}

const CourseDetailData: CourseDetailType[] = [
    {
        title: "Javascript nâng caoqưeqwe",
        lecturer: "Robert Ngô Ngọc",
        domain: "Lập trình di động",
        reviewCount: "100 đánh giá",
        descriptionContent: 'React.js là thư viện JavaScript phổ biến nhất mà bạn có thể sử dụng và tìm hiểu ngày nay để xây dựng giao diện người dùng hiện đại, phản ứng cho web.Khóa học này dạy bạn về React chuyên sâu, từ cơ bản, từng bước đi sâu vào tất cả các kiến ​​thức cơ bản cốt lõi, khám phá rất nhiều ví dụ và cũng giới thiệu cho bạn các khái niệm nâng cao.Bạn sẽ nhận được tất cả lý thuyết, hàng tấn ví dụ và bản trình diễn, bài tập và bài tập cũng như vô số kiến ​​thức quan trọng bị hầu hết các nguồn khác bỏ qua - sau cùng, có một lý do tại sao khóa học này lại rất lớn! Và trong trường hợp bạn thậm chí không biết tại sao bạn lại muốn học React và bạn chỉ ở đây vì một số quảng cáo hoặc "thuật toán" - đừng lo lắng: ReactJS là một công nghệ quan trọng với tư cách là một nhà phát triển web và trong khóa học này, tôi sẽ cũng giải thích TẠI SAO điều đó lại quan trọng!',
        courseBenefitContent: CourseBenefit,
        structure: StructureData
    }
]

export const AllCourseDetailData: AllCourseDetailType = {
    1233123: CourseDetailData[0]
}

export const CourseSelectors: CourseSelectTypes = {
    thumbnail: "> img",
    domain: ".stikerCard",
    title: ".cardBodyGlobal",
    price: ".cardFooter"
}

export const SideBarDetailContentData: string[] = [
    "10 học viên",
    "18 giờ",
    "10",
    "14",
    "Người mới bắt đầu"
]