drop table if exists transactions;
create table transactions (
	id serial primary key,
	code text,
	amount numeric,
	number_installments integer,
	payment_method text,
	created_at timestamp default now()
);
drop table if exists installments;
create table installments (
	id serial primary key,
	transaction_id integer,
	number integer,
	amount numeric,
	created_at timestamp default now(),
	constraint fk_transaction_id foreign key (transaction_id) references transactions (id)
);
