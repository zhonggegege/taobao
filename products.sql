CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  imageUrl VARCHAR(255),
  category VARCHAR(50),
  isPromoted BOOLEAN DEFAULT false,
  promotionPriority INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- 根据需要添加其他字段
);

-- 索引可以根据实际查询来设置，比如经常根据category和promotionPriority来查询可以创建相应的索引
CREATE INDEX idx_category ON products (category);
CREATE INDEX idx_promotionPriority ON products (promotionPriority);