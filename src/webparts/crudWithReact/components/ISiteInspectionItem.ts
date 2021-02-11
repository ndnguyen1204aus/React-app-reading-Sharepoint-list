
export interface ISiteInspectionItem {
    Id: number;
    Title: string;
    FormtabID: string;
    InspectionType: string;
    PDFlink: string;
    Date: string;  
    Time: string;
    Description: string;
    ProjectNumber: string;
    Level: string;
    Zone: string;
    Submitter:{
        id: number;
        displayName: string;
        email: string;
    };
}
