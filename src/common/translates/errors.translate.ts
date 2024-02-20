export const Bad_Request_Exception = {
  status_code: 400,
  code: 1021,
  message: {
    fa: 'درخواست نامعتبر است',
    en: 'Bad request exception',
  },
};
export const expireTime = {
  status_code: 408,
  code: 1004,
  message: {
    fa: 'زمان ورود شما تمام شده است',
    en: 'Your login time has expired',
  },
};
export const Invalid_Token = {
  status_code: 402,
  code: 1014,
  message: {
    fa: 'توکن نامعتبر است',
    en: 'Invalid Token',
  },
};
export const Unauthorized = {
  status_code: 401,
  code: 1004,
  message: {
    fa: 'هویت تایید نشد',
    en: 'Unauthorized',
  },
};
export function PageNotFound(messege: string) {
  return {
    status_code: 404,
    code: 1003,
    message: {
      fa: 'صفحه پیدا نشد ',
      en: messege,
    },
  };
}
export const Something_Went_Wrong = {
  status_code: 500,
  code: 1009,
  message: {
    fa: "خطای سمت سرور",
    en: "Internal server Error",
  },
};
export const Loggin_Failed= {
  status_code: 500,
  code: 1007,
  message: {
    fa: "ورود به سیستم ناموفق بود است، لطفاً بعدا دوباره امتحان کنید.",
    en: "Logging in failed, please try again later.",
  },
};
export const Invalid_Captcha = {
  status_code: 403,
  code: 1025,
  message: {
    fa: " کپچا نامعتبر است",
    en: "Captcha is invalid",
  },
};
export function InternalServerError(messege: string) {
  return {
    status_code: 500,
    code: 1003,
    message: {
      fa: 'خطای سرور',
      en: messege,
    },
  };
};