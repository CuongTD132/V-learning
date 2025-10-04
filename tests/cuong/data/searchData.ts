import {SearchCase} from "../type/searchTypes";

export const searchData: { valid: SearchCase[], invalid: SearchCase[], cards: SearchCase[] } = {
    valid: [
        {id: "TC02", description: "Search with valid keywords", keyword: "node js", expectedType: "hasResult"},
        {
            id: "TC04",
            description: "Search with keyword without accent",
            keyword: "lap trinh web",
            expectedType: "hasResult"
        },
        {
            id: "TC05",
            description: "Search using the magnifying glass icon",
            keyword: "Front end",
            expectedType: "useButton"
        },
        {
            id: "TC06",
            description: "Search and filter courses by category: Back End",
            keyword: "JavaScript",
            expectedType: "withFilter",
            filter: {category: ["Back End"]}
        },
        {
            id: "TC07",
            description: "Search and filter courses by level: Cao cấp",
            keyword: "JavaScript",
            expectedType: "withFilter",
            filter: {level: ["Cao cấp"]}
        },
        {
            id: "TC08",
            description: "Search and filter courses by rating: 4 stars",
            keyword: "JavaScript",
            expectedType: "withFilter",
            filter: {rating: 4}
        },
        {
            id: "TC09",
            description: "Search and filter courses with multiple filters applied",
            keyword: "JavaScript",
            expectedType: "withFilter",
            filter: {category: ["Back End"], level: ["Cao cấp"], rating: 4}
        },
    ],
    invalid: [
        {
            id: "TC03",
            description: "Search with keywords not in system",
            keyword: "khongcodulieu",
            expectedType: "noResult"
        }
    ],
    cards: [
        {
            id: "TC10",
            description: "Verify each course card displays full information",
            keyword: "node js",
            expectedType: "verifyCards"
        }
    ]
};
