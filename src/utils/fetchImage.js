/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 * @flow
 */

function fetchImage(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');

    image.onload = resolve;
    image.onerror = reject;
    image.src = url;

    if (image.complete) {
      resolve();
    }
  });
}

export default fetchImage;
