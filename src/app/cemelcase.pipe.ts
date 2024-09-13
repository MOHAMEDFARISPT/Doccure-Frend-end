import { PipeTransform,Pipe } from "@angular/core";




@Pipe({
    name:'camelCase',
    standalone:true
})

export class camelCase implements PipeTransform{
   
    transform(value: string): any {
        if (!value) return value;
    
        return value
          .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase()
          ).replace(/\s+/g, '');
      }

}