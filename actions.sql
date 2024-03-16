CREATE TABLE user_actions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  action_type ENUM('click', 'view', 'wishlist', 'share') NOT NULL,
  action_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  -- 根据实际需求可能需要记录更详细的行为数据
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);