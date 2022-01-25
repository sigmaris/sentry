export type SettingsEventParameters = {
  'notification_settings.index_page_viewed': {};
  'notification_settings.tuning_page_viewed': {
    notification_type: string;
  };
  'notification_settings.updated_tuning_setting': {
    notification_type: string;
    tuning_field_type: string;
  };
};

export type SettingsEventKey = keyof SettingsEventParameters;

export const settingsEventMap: Record<SettingsEventKey, string | null> = {
  'notification_settings.index_page_viewed': 'Notification Settings: Index Page Viewed',
  'notification_settings.tuning_page_viewed': 'Notification Settings: Tuning Page Viewed',
  'notification_settings.updated_tuning_setting':
    'Notification Settings: Updated Tuning Setting',
};
