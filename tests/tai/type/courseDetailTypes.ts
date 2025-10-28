export type specifyDataCheck = {
    id: number,
    field: keyof CourseDetailType
} 

export interface LabelTypes {
    title: string,
    subTitle: string,
    courseBenefitLabel: string,
    learningPathLabel: string,
    lessonLabel: string,
    promotionPlaceholder: string,
    relatedCourseLabel: string
}

type ChapterDetail = {
    title: string[];
    duration: string[];
}
export interface LearningPathStructure {
    [key: string]: ChapterDetail
}

export interface CourseDetailType {
    title: string,
    lecturer: string,
    domain: string,
    reviewCount: string,
    descriptionContent: string,
    courseBenefitContent: string[],
    structure: LearningPathStructure
}

export interface AllCourseDetailType {
    [key: number]: CourseDetailType
}

export interface CourseSelectTypes {
    thumbnail: string,
    domain: string,
    title: string,
    price: string
}