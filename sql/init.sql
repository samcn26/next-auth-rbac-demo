INSERT INTO `menu`(`id`, `name`, `url`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (1, 'settings', 'settings', NULL, 3, '2022-07-05 21:45:28.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `url`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (2, 'user', 'user', 1, 4, '2022-07-05 21:45:28.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `url`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (3, 'menu', 'menu', 1, 5, '2022-07-05 21:45:28.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `url`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (4, 'dash', 'dash', NULL, 1, '2022-07-05 21:47:54.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `url`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (5, 'dev', 'dev', NULL, 2, '2022-07-05 21:50:54.000', NULL, NULL);

-- password 1234
INSERT INTO `user`(`id`, `created_at`, `update_at`, `name`, `password`) VALUES (1, '2022-07-05 21:40:58', NULL, 'admin', 'U2FsdGVkX18jnBE615HZb5CDnIlsV3V2/YboCr4Cthw=');
