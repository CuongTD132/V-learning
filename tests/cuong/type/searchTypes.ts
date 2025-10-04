type ExpectedType = "hasResult" | "noResult" | "useButton" | "withFilter" | "verifyCards";

export interface SearchFilter {
    category?: ("Tất cả" | "Front End" | "Back End" | "HTML / CSS")[];
    level?: ("Tất cả" | "Mới bắt đầu" | "Trung cấp" | "Cao cấp")[];
    rating?: 1 | 2 | 3 | 4 | 5;
}

export interface SearchCase {
    id: string;
    description: string;
    keyword: string;
    expectedType: ExpectedType;
    filter?: SearchFilter;
}
