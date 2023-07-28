export class PostAnalysisResponse {
    constructor(public id: number,
                public url: string,
                public title: string,
                public description: string,
                public keywords: string[],
                public titles: { [key: string]: number },
                public html5: boolean,
                public images: number,
                public createdAt: string,
                public isNew: boolean){}
}
