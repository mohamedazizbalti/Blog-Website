import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64ToBlob',
  standalone: true
})
export class Base64ToBlobPipe implements PipeTransform {
  transform(base64: string, mimeType: string = 'image/png'): string {
    if (!base64) {
      return '';
    }

    // Decode Base64 string to binary data
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob and return an Object URL
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  }
}
