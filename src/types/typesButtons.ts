export interface typeButton{
    text:string,
    action:Function;
    disabled?:boolean;
    type:string;
    color?:string;
    textColor:string;
    width?:string
}

export interface typeRoundedButton{
    text:string,
    action:any;
    type:string;
    color?:string;
    textColor:string;
    width?:string;
    tagColor?:string;
    tagValue?:number;
    tagTextColor?:string
}