export function fakeToggleFavoriteRequest(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() < 0.8;
      if (isSuccess) {
        resolve();
      } else {
        reject(new Error("Couldn't update favorite. Please try again."));
      }
    }, 600);
  });
}
