
export const stringCutting = (text: string, limit: number) => {
    if(text?.length > limit){
        return(text.substring(0,limit)+'...')
    }else{
        return(text)
    }
}


export function removeAccentsMarks(texto : string) {
    // Reemplazar los acentos y diéresis por sus equivalentes sin acentos.
    texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
    // Remover los signos de puntuación.
    texto = texto.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  
    return texto;
}