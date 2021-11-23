export const MAX_USERS_PER_REQUEST = 10;
export const MAX_GIFTS_PER_REQUEST = 10;
export const MAX_NOTIFICATIONS_PER_REQUEST = 10;

export enum giftStatus {
  'НЕ ДОСТАВЛЕН',
  'ДОСТАВЛЕНО',
  'ВЫДАНО',
}

export enum notificationType {
  'GIFT_STATUS_CHANGED',
  'ALERT',
  'NEWS',
  'THANK_SANTA',
}

export enum userFaculty {
  'МФ КТИУ',
  'МФ ТИНТ',
  'ФТМФ',
  'МФ НЖ',
  'МФ БТИНС',
  'ФТМИИ',
}
