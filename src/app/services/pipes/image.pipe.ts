import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(image: string): any {
    if (!image) {
      return 'assets/image/users/noimage2.jpg';
    }
    return image;
  }
}
