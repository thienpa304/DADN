export const convertToFeedKey = (keyId, username) => {
  Object.keys(keyId).forEach((key) => {
    keyId[key] = `${username}/feeds/${keyId[key]}`;
  });
  return keyId;
};

export const parseToScheduleString = (role) => {
  const { time, repeat } = role;
  let string = ''
  string = time.split(':').reverse().join(' ');
  if(repeat == '0') string += ' */1 * *'
  else string += ` * * ${repeat}` 
  return string
}