CREATE DATABASE finTrack;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,  
    category VARCHAR(255) NOT NULL,  
    transaction_type VARCHAR(50) NOT NULL,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,  
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE budgets (
    budget_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,  
    category VARCHAR(255) NOT NULL, 
    budget_amount DECIMAL(10, 2) NOT NULL, 
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,  
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Not inserted yet. Here in case I need it for testing
-- Transactions for Sam (user_id: 72e8f362-d138-43a0-94f4-fa95235f65c0)
INSERT INTO transactions (user_id, amount, category, transaction_type, transaction_date) VALUES
('72e8f362-d138-43a0-94f4-fa95235f65c0', 50.00, 'Groceries', 'expense', '2024-11-01'),
('72e8f362-d138-43a0-94f4-fa95235f65c0', 1500.00, 'Salary', 'income', '2024-11-02'),
('72e8f362-d138-43a0-94f4-fa95235f65c0', 75.00, 'Dining', 'expense', '2024-11-03');

-- Transactions for June (user_id: 6109d600-15e7-45dd-a5b9-464041d9a229)
INSERT INTO transactions (user_id, amount, category, transaction_type, transaction_date) VALUES
('6109d600-15e7-45dd-a5b9-464041d9a229', 200.00, 'Rent', 'expense', '2024-11-05'),
('6109d600-15e7-45dd-a5b9-464041d9a229', 100.00, 'Investments', 'income', '2024-11-06'),
('6109d600-15e7-45dd-a5b9-464041d9a229', 50.00, 'Utilities', 'expense', '2024-11-07');