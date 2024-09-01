import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board";

export class BoardStatusValidationPipe implements PipeTransform {

  readonly StatusOptions = [
    BoardStatus.PUBLIC,
    BoardStatus.PRIVATE
  ]

  transform(value: any, metaData: ArgumentMetadata): any {
    // console.log('value', value);
    // console.log('metaData', metaData);

    value = value.toUpperCase();

    if(!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(value: any) {
    const index = this.StatusOptions.indexOf(value);
    return index !== -1;
  }
}