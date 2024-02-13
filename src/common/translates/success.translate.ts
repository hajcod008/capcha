export function Request_Was_Successful(additional_info: any) {
  return {
    status_code: 201,
    code: 5000,
    message: {
      fa: 'عملیات با موفقیت اجرا شد',
      en: 'The request was successful',
      additional_info: [additional_info],
    },
  };
}

export const Request_Was_Successful1 = {
  status_code: 200,
  code: 5000,
  message: {
    fa: 'عملیات با موفقیت اجرا شد',
    en: 'The request was successful',
  },
};