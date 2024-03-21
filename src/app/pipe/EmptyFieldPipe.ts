import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "emptyField"
})
export class EmptyFieldPipe implements PipeTransform {

  transform(value: any, fieldName: string): string {
    if (!value || value[fieldName] === null || value[fieldName] === '') {
      return `${fieldName} không được trống.`;
    }
    return '';

  }
}
