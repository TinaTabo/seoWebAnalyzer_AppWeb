export class PostAnalysisResponse {
    constructor(id: number,
                url: string,
                title: string,
                description: string,
                keywords: string[],
                titles: { [key: string]: number },
                html5: boolean,
                images: number,
                createdAt: string){}
}
