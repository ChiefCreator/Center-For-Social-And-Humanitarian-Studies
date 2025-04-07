import notify from 'gulp-notify';

export function plumberNotify(title) {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false,
    }),
  };
}