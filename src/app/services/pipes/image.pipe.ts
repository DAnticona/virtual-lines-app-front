import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(image: string, type: string = 'user'): any {
    if (!image) {
      switch (type) {
        case 'user':
          image = 'assets/image/users/noimage2.jpg';
          break;
        case 'store':
          image = 'assets/image/stores/noimage.jpg';
          break;
      }
      // return 'assets/image/users/noimage2.jpg';
    }
    return image;
  }
}
