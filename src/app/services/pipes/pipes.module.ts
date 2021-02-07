import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image/image.pipe';
import { TimePipe } from './time/time.pipe';

@NgModule({
  declarations: [ImagePipe, TimePipe],
  exports: [ImagePipe, TimePipe],
  imports: [CommonModule],
})
export class PipesModule {}
