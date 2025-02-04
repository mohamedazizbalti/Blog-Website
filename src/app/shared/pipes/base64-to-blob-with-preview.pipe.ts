import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64ToBlobWithPreview',
  standalone: true
})
export class Base64ToBlobWithPreviewPipe implements PipeTransform {

  transform(base64: string, mimeType: string = 'image/png'): Blob & { preview: string } {
    if (!base64) {
      throw new Error('Base64 string is required');
    }

    // Decode Base64 string
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob
    const blob = new Blob([byteArray], { type: mimeType });

    // Create a preview URL
    return Object.assign(blob, { preview: URL.createObjectURL(blob) });
  }

}
