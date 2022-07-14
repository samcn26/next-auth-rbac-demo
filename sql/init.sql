-- menu
INSERT INTO `menu`(`id`, `name`, `key`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (1, 'settings', 'settings', NULL, 3, '2022-07-05 21:45:28.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `key`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (2, 'user', 'settings/user', 1, 4, '2022-07-05 21:45:28.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `key`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (3, 'menu', 'settings/menu', 1, 5, '2022-07-05 21:45:28.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `key`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (4, 'dash', 'dash', NULL, 1, '2022-07-05 21:47:54.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `key`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (5, 'dev', 'dev', NULL, 2, '2022-07-05 21:50:54.000', NULL, NULL);
INSERT INTO `menu`(`id`, `name`, `key`, `pid`, `order`, `created_at`, `update_at`, `note`) VALUES (6, 'role', 'settings/role', 1, 6, '2022-07-05 21:50:54.000', NULL, NULL);

-- user password 5678
INSERT INTO `user`(`id`, `created_at`, `update_at`, `name`, `password`) VALUES (1, '2022-07-05 21:40:58', NULL, 'admin', 'U2FsdGVkX1+ATsZPnLf/p6YmbNZMUo8nUYldZ/6+muA=U2FsdGVkX1+ATsZPnLf/p6YmbNZMUo8nUYldZ/6+muA=');
INSERT INTO `user`(`id`, `created_at`, `update_at`, `name`, `password`) VALUES (2, '2022-07-05 21:40:58', NULL, 'dev', 'U2FsdGVkX1+ATsZPnLf/p6YmbNZMUo8nUYldZ/6+muA=U2FsdGVkX1+ATsZPnLf/p6YmbNZMUo8nUYldZ/6+muA=');

-- role
INSERT INTO `role`(`id`, `created_at`, `update_at`, `name`) VALUES (1, '2022-07-13 08:51:07', NULL, 'admin');
INSERT INTO `role`(`id`, `created_at`, `update_at`, `name`) VALUES (2, '2022-07-13 08:51:07', NULL, 'dev');

-- role-menu
INSERT INTO `role_menu`(`id`, `role_id`, `menu_id`) VALUES (1, 1, 1);
INSERT INTO `role_menu`(`id`, `role_id`, `menu_id`) VALUES (2, 1, 2);
INSERT INTO `role_menu`(`id`, `role_id`, `menu_id`) VALUES (3, 1, 3);
INSERT INTO `role_menu`(`id`, `role_id`, `menu_id`) VALUES (4, 1, 4);
INSERT INTO `role_menu`(`id`, `role_id`, `menu_id`) VALUES (5, 1, 5);
INSERT INTO `role_menu`(`id`, `role_id`, `menu_id`) VALUES (6, 1, 6);
INSERT INTO `role_menu`(`id`, `role_id`, `menu_id`) VALUES (7, 2, 4);
INSERT INTO `role_menu`(`id`, `role_id`, `menu_id`) VALUES (8, 2, 5);

-- user-role
INSERT INTO `user_role`(`id`, `user_id`, `role_id`) VALUES (1, 1, 1);
INSERT INTO `user_role`(`id`, `user_id`, `role_id`) VALUES (2, 2, 2);