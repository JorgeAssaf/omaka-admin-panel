export interface typeButton{
    text?:string,
    action:Function;
    disabled?:boolean;
    type:string;
    color?:string;
    textColor?:string;
    loading?:boolean;
    width?:string
}

export interface typeRoundedButton{
    text:string,
    action:any;
    type:string;
    color?:string;
    textColor:string;
    tagColor?:string;
    tagValue?:number;
    tagTextColor?:string
}