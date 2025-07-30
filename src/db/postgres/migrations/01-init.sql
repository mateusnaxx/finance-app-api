create table if not exists users (
  ID UUID primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  email varchar(100) not null unique,
  password varchar(100) not null
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
    CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTMENT');
  END IF;
END $$;

create table if not exists transactions (
  ID UUID primary key,
  user_id UUID references users(ID) on delete cascade not null,
  NAME varchar(100) not null,
  date date not null,
  amount numeric(10,2) not null,
  type transaction_type not null
);